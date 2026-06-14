import { useI18n } from '../i18n/useI18n';
import { property } from '../data/property';

const cad = new Intl.NumberFormat('fr-CA', {
  style: 'currency',
  currency: 'CAD',
  maximumFractionDigits: 0,
});

export function Nav() {
  const { lang, setLang } = useI18n();

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex items-center justify-between px-6 py-4 mix-blend-difference md:px-10">
      <a href="#approche" className="font-display text-lg tracking-wide text-bone">
        Val-des-Cèdres
      </a>
      <div className="flex items-center gap-6">
        <span className="hidden font-sans text-sm tracking-wide text-bone/90 sm:block">
          {cad.format(property.priceCad)}
        </span>
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
