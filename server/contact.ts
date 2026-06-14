import type { Request, Response } from 'express';
import { z } from 'zod';
import { Resend } from 'resend';

const ContactSchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(160),
  phone: z.string().max(40).optional().default(''),
  message: z.string().min(1).max(4000),
  // Honeypot: real users never fill this. Must stay empty.
  company: z.string().max(0).optional().default(''),
});

const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; reset: number }>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.reset) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

export async function handleContact(req: Request, res: Response): Promise<void> {
  const forwarded = req.headers['x-forwarded-for'];
  const ip =
    (typeof forwarded === 'string' ? forwarded.split(',')[0]?.trim() : undefined) ??
    req.ip ??
    'unknown';

  if (rateLimited(ip)) {
    res.status(429).json({ ok: false, error: 'rate_limited' });
    return;
  }

  const parsed = ContactSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ ok: false, error: 'invalid' });
    return;
  }

  const { company, name, email, phone, message } = parsed.data;
  if (company) {
    // Honeypot tripped: pretend success, send nothing.
    res.json({ ok: true });
    return;
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL ?? 'onboarding@resend.dev';

  if (!apiKey || !to) {
    console.log('[contact] stub mode (Resend not configured):', {
      name,
      email,
      phone,
      message,
    });
    res.json({ ok: true, stubbed: true });
    return;
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject: `Val-des-Cèdres · demande de ${name}`,
      text: `Nom: ${name}\nCourriel: ${email}\nTéléphone: ${phone}\n\n${message}`,
    });
    res.json({ ok: true });
  } catch (err) {
    console.error('[contact] resend error', err);
    res.status(502).json({ ok: false, error: 'send_failed' });
  }
}
