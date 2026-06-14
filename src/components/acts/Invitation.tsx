import { useI18n } from '../../i18n/useI18n';
import { property } from '../../data/property';
import { MortgageCalc } from '../ui/MortgageCalc';
import { ContactForm } from '../ui/ContactForm';
import { AgentCard } from '../ui/AgentCard';

const cad = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

/** Act 7 - the invitation. Price anchor, mortgage calculator, lead form, brokers. */
export function Invitation() {
  const { t } = useI18n();

  return (
    <section id="invitation" className="relative overflow-hidden border-t border-bone/10 bg-ink">
      <img
        src="/photos/m21723694-aer73-01.jpg"
        alt=""
        aria-hidden
        className="absolute inset-0 h-full w-full object-cover opacity-20"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-ink via-ink/85 to-ink" />

      <div className="relative z-10 mx-auto max-w-7xl px-8 py-24 md:px-16">
        <span className="font-display text-sm text-cognac">07</span>
        <h2 className="mt-2 font-display text-4xl text-bone md:text-6xl">
          {t('act.invitation.title')}
        </h2>
        <p className="mt-4 max-w-xl font-sans text-lg text-bone/70">
          {t('act.invitation.tagline')}
        </p>
        <p className="mt-8 font-display text-5xl text-bone md:text-6xl">
          {cad.format(property.priceCad)}
        </p>

        <div className="mt-12 grid gap-8 lg:grid-cols-2">
          <MortgageCalc />
          <ContactForm />
        </div>

        <h3 className="mt-16 font-sans text-xs uppercase tracking-[0.3em] text-cognac">
          {t('agents.title')}
        </h3>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {property.agents.map((a) => (
            <AgentCard key={a.phone} agent={a} />
          ))}
        </div>
      </div>
    </section>
  );
}
