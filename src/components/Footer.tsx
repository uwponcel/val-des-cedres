import { useI18n } from '../i18n/useI18n';
import { property } from '../data/property';
import { scrollToTop } from '../lib/scroll';

export function Footer() {
  const { t } = useI18n();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-bone/10 bg-ink px-8 py-12 md:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="font-display text-lg text-bone">{property.address}</p>
          <p className="font-sans text-sm text-bone/50">
            {property.city} · ULS {property.uls}
          </p>
        </div>
        <div className="font-sans text-sm text-bone/50">
          <p>
            {property.brand} · {property.brokerage}
          </p>
          <p className="text-bone/30">{property.programs.join(' · ')}</p>
        </div>
        <button
          type="button"
          onClick={scrollToTop}
          className="font-sans text-sm uppercase tracking-widest text-bone/70 transition-colors hover:text-bone"
        >
          {t('footer.back')} ↑
        </button>
      </div>
      <p className="mx-auto mt-8 max-w-7xl font-sans text-xs text-bone/30">
        © {year} · {property.address}, {property.city}
      </p>
    </footer>
  );
}
