import { useI18n } from '../i18n/useI18n';
import { property } from '../data/property';
import { scrollToTop } from '../lib/scroll';

const cad = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

const shadow = '[text-shadow:0_1px_12px_rgba(0,0,0,0.55)]';

export function Nav() {
  const { t, lang, setLang } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 md:px-10">
      <button
        type="button"
        onClick={scrollToTop}
        className={`font-display text-lg tracking-wide text-bone transition-opacity hover:opacity-80 ${shadow}`}
      >
        Val-des-Cèdres
      </button>
      <div className="flex items-center gap-4 md:gap-6">
        <span className={`hidden font-sans text-sm tracking-wide text-bone/90 md:block ${shadow}`}>
          {cad.format(property.priceCad)}
        </span>
        <a
          href="#invitation"
          className={`hidden rounded-sm border border-bone/50 px-3 py-1.5 font-sans text-xs uppercase tracking-widest text-bone backdrop-blur-sm transition-colors hover:border-bone hover:bg-bone/10 sm:inline-flex ${shadow}`}
        >
          {t('nav.visit')}
        </a>
        <button
          type="button"
          aria-label={lang === 'fr' ? 'Switch to English' : 'Passer en français'}
          onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
          className={`font-sans text-sm uppercase tracking-widest text-bone transition-opacity hover:opacity-70 ${shadow}`}
        >
          {lang === 'fr' ? 'EN' : 'FR'}
        </button>
      </div>
    </header>
  );
}
