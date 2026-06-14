import { useI18n } from '../i18n/useI18n';
import { property } from '../data/property';

const cad = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

export function Nav() {
  const { t, lang, setLang } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference md:px-10">
      <a href="#approche" className="font-display text-lg tracking-wide text-bone">
        Val-des-Cèdres
      </a>
      <div className="flex items-center gap-4 md:gap-6">
        <span className="hidden font-sans text-sm tracking-wide text-bone/90 md:block">
          {cad.format(property.priceCad)}
        </span>
        <a
          href="#invitation"
          className="hidden rounded-sm border border-bone/40 px-3 py-1.5 font-sans text-xs uppercase tracking-widest text-bone transition-colors hover:border-bone sm:inline-flex"
        >
          {t('nav.visit')}
        </a>
        <button
          type="button"
          aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          className="font-sans text-sm uppercase tracking-widest text-bone transition-opacity hover:opacity-70"
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>
    </header>
  );
}
