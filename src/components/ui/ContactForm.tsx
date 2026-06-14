import { useState, type ChangeEvent } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { sendContact } from '../../lib/api';

type Status = 'idle' | 'sending' | 'success' | 'error';
type Form = { name: string; email: string; phone: string; message: string; company: string };

const inputCls =
  'w-full rounded-sm border border-bone/20 bg-transparent px-3 py-2 font-sans text-bone outline-none transition-colors placeholder:text-bone/30 focus:border-cognac';

export function ContactForm() {
  const { t } = useI18n();
  const [status, setStatus] = useState<Status>('idle');
  const [form, setForm] = useState<Form>({ name: '', email: '', phone: '', message: '', company: '' });

  const set =
    (k: keyof Form) =>
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((f) => ({ ...f, [k]: e.target.value }));

  if (status === 'success') {
    return (
      <div className="flex min-h-[20rem] items-center justify-center rounded-sm border border-bone/15 bg-bone/[0.03] p-8 text-center">
        <p className="max-w-sm font-display text-2xl text-bone">{t('form.success')}</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        setStatus('sending');
        try {
          await sendContact(form);
          setStatus('success');
        } catch {
          setStatus('error');
        }
      }}
      className="rounded-sm border border-bone/15 bg-bone/[0.03] p-6 md:p-8"
    >
      <h3 className="font-display text-2xl text-bone">{t('form.title')}</h3>

      {/* honeypot - hidden from users */}
      <div aria-hidden className="absolute left-[-9999px]" tabIndex={-1}>
        <input
          type="text"
          name="company"
          autoComplete="off"
          tabIndex={-1}
          value={form.company}
          onChange={set('company')}
        />
      </div>

      <div className="mt-6 space-y-4">
        <input className={inputCls} placeholder={t('form.name')} required value={form.name} onChange={set('name')} />
        <input className={inputCls} type="email" placeholder={t('form.email')} required value={form.email} onChange={set('email')} />
        <input className={inputCls} type="tel" placeholder={t('form.phone')} value={form.phone} onChange={set('phone')} />
        <textarea className={`${inputCls} min-h-32 resize-y`} placeholder={t('form.message')} required value={form.message} onChange={set('message')} />
      </div>

      <button
        type="submit"
        disabled={status === 'sending'}
        className="mt-6 w-full rounded-sm bg-cognac px-6 py-3 font-sans text-sm uppercase tracking-widest text-ink transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {status === 'sending' ? t('form.sending') : t('form.send')}
      </button>

      {status === 'error' && (
        <p className="mt-3 font-sans text-sm text-ember">{t('form.error')}</p>
      )}
    </form>
  );
}
