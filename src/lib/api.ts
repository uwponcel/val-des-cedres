export interface ContactPayload {
  name: string;
  email: string;
  phone: string;
  message: string;
  /** Honeypot field, must remain empty. */
  company: string;
}

export async function sendContact(payload: ContactPayload): Promise<{ ok: boolean }> {
  const res = await fetch('/api/contact', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) throw new Error(`contact failed: ${res.status}`);
  return res.json() as Promise<{ ok: boolean }>;
}
