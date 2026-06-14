import { useSmoothScroll } from './lib/scroll';
import { Nav } from './components/Nav';
import { useI18n } from './i18n/useI18n';
import { property } from './data/property';

const ACTS = [
  'arrivee',
  'interieur',
  'sanctuaire',
  'riviere',
  'domaine',
  'pieces',
  'invitation',
] as const;

export default function App() {
  useSmoothScroll();
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <main>
        <section
          id="approche"
          className="relative flex min-h-screen items-end overflow-hidden"
        >
          <img
            src="/photos/m21723694-aer67-01.jpg"
            alt={`Vue aérienne de ${property.address}, ${property.city}`}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />
          <div className="relative z-10 p-8 md:p-16">
            <p className="font-sans text-sm uppercase tracking-[0.3em] text-bone/70">
              {t('hero.kicker')} · {property.region}
            </p>
            <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.05] text-bone md:text-7xl">
              {t('hero.tagline')}
            </h1>
            <p className="mt-6 font-display text-2xl text-bone/90">
              {property.address} · {property.city}
            </p>
          </div>
        </section>

        {ACTS.map((id, i) => (
          <section
            key={id}
            id={id}
            className="flex min-h-[80vh] items-center border-t border-bone/10 px-8 py-24 md:px-16"
          >
            <div>
              <span className="font-display text-sm text-cognac">
                {String(i + 1).padStart(2, '0')}
              </span>
              <h2 className="mt-2 max-w-3xl font-display text-4xl text-bone md:text-6xl">
                {t(`act.${id}.title`)}
              </h2>
              <p className="mt-5 max-w-xl font-sans text-lg text-bone/60">
                {t(`act.${id}.tagline`)}
              </p>
            </div>
          </section>
        ))}
      </main>
    </>
  );
}
