import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useI18n } from '../../i18n/useI18n';
import { prefersReducedMotion } from '../../lib/scroll';

/**
 * Transitional beat (unnumbered) bridging the sanctuary and the river:
 * the stone terrace where the wooded grounds fall away toward the water.
 */
export function VersRiviere() {
  const { t } = useI18n();
  const section = useRef<HTMLElement>(null);
  const img = useRef<HTMLImageElement>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        img.current,
        { scale: 1.05, yPercent: -4 },
        {
          scale: 1.16,
          yPercent: 4,
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: true,
          },
        },
      );
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="vers-riviere"
      ref={section}
      className="relative flex min-h-screen items-end overflow-hidden"
    >
      <img
        ref={img}
        src="/photos/m21723694-tse53-01.jpg"
        alt="Terrasse de pierre surplombant le boisé qui descend vers la rivière"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

      <div className="relative z-10 p-8 md:p-16">
        <h2 className="max-w-3xl font-display text-4xl text-bone md:text-6xl">
          {t('act.vers-riviere.title')}
        </h2>
        <p className="mt-4 max-w-xl font-sans text-lg text-bone/70">
          {t('act.vers-riviere.tagline')}
        </p>
      </div>
    </section>
  );
}
