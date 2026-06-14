import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useI18n } from '../../i18n/useI18n';
import { prefersReducedMotion } from '../../lib/scroll';

const SCENES = [
  {
    src: '/photos/m21723694-tse53-01.jpg',
    alt: 'Terrasse de pierre surplombant le boisé qui descend vers la rivière',
    capKey: 'vers-riviere.cap.1',
  },
  {
    src: '/photos/m21723694-ext59-01.jpg',
    alt: 'Sentier de pierre descendant vers la rivière à travers le boisé',
    capKey: 'vers-riviere.cap.2',
  },
];

/**
 * Transitional beat (unnumbered) bridging the sanctuary and the river:
 * the stone terrace, then the path down through the woods to the water.
 */
export function VersRiviere() {
  const { t } = useI18n();
  const outer = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLImageElement | null)[]>([]);
  const caps = useRef<(HTMLParagraphElement | null)[]>([]);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 0.4 },
        scrollTrigger: {
          trigger: outer.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
      tl.to([imgs.current[0], caps.current[0]], { opacity: 0 }, 0.9)
        .to([imgs.current[1], caps.current[1]], { opacity: 1 }, 0.9);
    }, outer);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="vers-riviere" ref={outer} className={reduced ? 'relative' : 'relative h-[220vh]'}>
      <div className="sticky top-0 flex h-screen items-end overflow-hidden">
        {SCENES.map((s, i) => (
          <img
            key={s.src}
            ref={(el) => {
              imgs.current[i] = el;
            }}
            src={s.src}
            alt={s.alt}
            className="absolute inset-0 h-full w-full object-cover"
            style={{ opacity: i === 0 ? 1 : 0 }}
            loading="lazy"
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-transparent" />

        <div className="relative z-10 w-full p-8 md:p-16">
          <h2 className="font-display text-4xl text-bone md:text-6xl">
            {t('act.vers-riviere.title')}
          </h2>
          <div className="relative mt-4 h-14">
            {SCENES.map((s, i) => (
              <p
                key={s.capKey}
                ref={(el) => {
                  caps.current[i] = el;
                }}
                className="absolute max-w-xl font-sans text-lg text-bone/70"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {t(s.capKey)}
              </p>
            ))}
          </div>
        </div>
      </div>

      {reduced && (
        <div className="grid gap-1 md:grid-cols-2">
          {SCENES.slice(1).map((s) => (
            <img key={s.src} src={s.src} alt={s.alt} className="h-80 w-full object-cover" loading="lazy" />
          ))}
        </div>
      )}
    </section>
  );
}
