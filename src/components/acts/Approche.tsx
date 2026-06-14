import { useI18n } from '../../i18n/useI18n';
import { property } from '../../data/property';
import { prefersReducedMotion } from '../../lib/scroll';

const POSTER = '/photos/m21723694-fac65-01.jpg';
const ALT = 'Façade de la résidence à charpente de bois massif au cœur des Laurentides';

/**
 * Act 0 - the arrival. A single edited reel (valley -> descent -> facade) loops.
 * Reduced motion shows the facade still instead. The facade photo doubles as
 * poster, so the hero reads correctly before the video buffers and even if it
 * never loads.
 */
export function Approche() {
  const { t } = useI18n();
  const reduced = prefersReducedMotion();

  return (
    <section id="approche" className="relative h-screen overflow-hidden">
      {reduced ? (
        <img
          src={POSTER}
          alt={ALT}
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      ) : (
        <video
          className="absolute inset-0 h-full w-full object-cover"
          poster={POSTER}
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-label={ALT}
        >
          <source src="/videos/hero-master.mp4" type="video/mp4" />
        </video>
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" />

      <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16">
        <div className="hero-reveal">
          <p className="font-sans text-sm uppercase tracking-[0.3em] text-bone/70">
            {t('hero.kicker')} · {property.region}
          </p>
          <h1 className="mt-4 max-w-4xl font-display text-5xl leading-[1.04] text-bone md:text-8xl">
            {t('hero.tagline')}
          </h1>
          <p className="mt-6 font-display text-2xl text-bone/90">
            {property.address} · {property.city}
          </p>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
        <span className="hero-cue font-sans text-xs uppercase tracking-[0.3em] text-bone/60">
          {t('hero.cue')}
        </span>
      </div>
    </section>
  );
}
