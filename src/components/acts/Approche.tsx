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

      <div className="relative z-10 flex h-full flex-col justify-end p-8 md:p-16 pb-32">
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

      <div className="absolute inset-x-0 bottom-7 z-10 flex flex-col items-center gap-2 text-bone/75">
        <span aria-hidden className="relative block h-10 w-7">
          <svg
            className="swipe-chevron absolute left-1/2 top-0"
            width="16"
            height="9"
            viewBox="0 0 16 9"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M1 8l7-7 7 7" />
          </svg>
          <svg
            className="swipe-hand absolute bottom-0 left-1/2"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M9 11.24V7.5C9 6.12 10.12 5 11.5 5S14 6.12 14 7.5v3.74c1.21-.81 2-2.18 2-3.74C16 5.01 13.99 3 11.5 3S7 5.01 7 7.5c0 1.56.79 2.93 2 3.74zm9.84 4.63l-4.54-2.26c-.17-.07-.35-.11-.54-.11H13v-6c0-.83-.67-1.5-1.5-1.5S10 6.67 10 7.5v10.74l-3.43-.72c-.08-.01-.15-.03-.24-.03-.31 0-.59.13-.79.33l-.79.8 4.94 4.94c.27.27.65.44 1.06.44h6.79c.75 0 1.33-.55 1.44-1.28l.75-5.27c.01-.07.02-.14.02-.21 0-.62-.38-1.16-.92-1.4z" />
          </svg>
        </span>
        <span className="font-sans text-xs uppercase tracking-[0.3em] text-bone/60">
          {t('hero.cue')}
        </span>
      </div>
    </section>
  );
}
