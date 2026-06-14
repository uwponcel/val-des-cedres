import { lazy, Suspense } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { property } from '../../data/property';
import { WebGLBoundary } from '../webgl/WebGLBoundary';

const GroundsMap = lazy(() => import('../GroundsMap'));

const nf = new Intl.NumberFormat('fr-CA');

/** Act 5 - the grounds. Location, privacy and proximity, on a dark tilted map. */
export function Domaine() {
  const { t } = useI18n();

  return (
    <section
      id="domaine"
      className="relative border-t border-bone/10 bg-ink px-8 py-24 md:px-16"
    >
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <span className="font-display text-sm text-cognac">05</span>
          <h2 className="mt-2 font-display text-4xl text-bone md:text-6xl">
            {t('act.domaine.title')}
          </h2>
          <p className="mt-5 max-w-md font-sans text-lg text-bone/70">
            {t('act.domaine.tagline')}
          </p>

          <div className="mt-10 flex items-baseline gap-3">
            <span className="font-display text-5xl text-bone">{nf.format(property.landSqFt)}</span>
            <span className="font-sans text-sm uppercase tracking-widest text-bone/50">
              pi² · {nf.format(property.landSqM)} m²
            </span>
          </div>
          <p className="mt-3 font-sans text-sm text-bone/60">{t('domaine.privacy')}</p>

          <h3 className="mt-10 font-sans text-xs uppercase tracking-[0.3em] text-cognac">
            {t('domaine.proximities')}
          </h3>
          <ul className="mt-4 grid grid-cols-2 gap-x-8 gap-y-3">
            {property.proximities.map((p) => (
              <li key={p.key} className="flex items-baseline justify-between gap-3 border-b border-bone/10 pb-2">
                <span className="font-sans text-sm text-bone/80">{p.label}</span>
                {p.distance && (
                  <span className="font-display text-sm text-ember">{p.distance}</span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div className="relative h-[55vh] overflow-hidden rounded-sm border border-bone/10 lg:h-[70vh]">
          <img
            src="/photos/m21723694-aer71-01.jpg"
            alt="Vue aérienne du domaine et de son environnement boisé"
            className="absolute inset-0 h-full w-full object-cover opacity-60"
            loading="lazy"
          />
          <WebGLBoundary>
            <Suspense fallback={null}>
              <GroundsMap />
            </Suspense>
          </WebGLBoundary>
        </div>
      </div>
    </section>
  );
}
