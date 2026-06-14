import { lazy, Suspense } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { prefersReducedMotion } from '../../lib/scroll';
import { WebGLBoundary } from '../webgl/WebGLBoundary';

const RiverWater = lazy(() => import('../webgl/RiverWater'));

/**
 * Act 4 - the river. A held, full-screen moment over the terrace-above-the-ravine
 * view, with a WebGL liquid/reflection shader evoking the Chevreuil. The static
 * photo sits underneath as the fallback (reduced motion, no WebGL, or while loading).
 */
export function Riviere() {
  const { t } = useI18n();
  const reduced = prefersReducedMotion();

  return (
    <section id="riviere" className="relative flex min-h-screen items-end overflow-hidden">
      <img
        src="/photos/m21723694-tse53-01.jpg"
        alt="Terrasse couverte surplombant le boisé et la rivière Chevreuil"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      {!reduced && (
        <div className="absolute inset-0">
          <WebGLBoundary>
            <Suspense fallback={null}>
              <RiverWater />
            </Suspense>
          </WebGLBoundary>
        </div>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

      <div className="relative z-10 p-8 md:p-16">
        <span className="font-display text-sm text-cognac">04</span>
        <h2 className="mt-2 max-w-3xl font-display text-5xl text-bone md:text-7xl">
          {t('act.riviere.title')}
        </h2>
        <p className="mt-5 max-w-xl font-sans text-lg text-bone/75">
          {t('act.riviere.tagline')}
        </p>
        <p className="mt-2 font-display text-xl italic text-bone/60">{t('riviere.line')}</p>
      </div>
    </section>
  );
}
