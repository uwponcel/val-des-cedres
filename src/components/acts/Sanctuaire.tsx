import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useI18n } from '../../i18n/useI18n';
import { prefersReducedMotion } from '../../lib/scroll';

const SCENES = [
  {
    src: '/photos/m21723694-sbp34-01.jpg',
    alt: 'Salle de bain de la suite des maîtres avec baignoire à débordement',
    capKey: 'sanctuaire.cap.1',
  },
  {
    src: '/photos/m21723694-sdb48-01.jpg',
    alt: 'Salle de bain avec bain vapeur et douche en verre',
    capKey: 'sanctuaire.cap.2',
  },
  {
    src: '/photos/m21723694-far54-01.jpg',
    alt: 'Spa extérieur sur la terrasse de pierre',
    capKey: 'sanctuaire.cap.3',
  },
];

/** Act 3 - the thermal sanctuary. Moody, dark, with drifting steam. */
export function Sanctuaire() {
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
      tl.to([imgs.current[0], caps.current[0]], { opacity: 0 }, 0.85)
        .to([imgs.current[1], caps.current[1]], { opacity: 1 }, 0.85)
        .to([imgs.current[1], caps.current[1]], { opacity: 0 }, 1.85)
        .to([imgs.current[2], caps.current[2]], { opacity: 1 }, 1.85);
    }, outer);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="sanctuaire" ref={outer} className={reduced ? 'relative' : 'relative h-[300vh]'}>
      <div className="sticky top-0 flex h-screen items-end overflow-hidden bg-ink">
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

        {/* moody grade + warm vignette */}
        <div className="absolute inset-0 bg-ink/45" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/30" />
        <div
          className="absolute inset-0 mix-blend-soft-light"
          style={{ background: 'radial-gradient(60% 50% at 50% 70%, #c0673355, transparent 70%)' }}
        />

        {/* drifting steam */}
        <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
          <span className="steam-blob" style={{ left: '18%', bottom: '-12%', animationDelay: '0s' }} />
          <span className="steam-blob" style={{ left: '52%', bottom: '-18%', animationDelay: '-6s' }} />
          <span className="steam-blob" style={{ left: '78%', bottom: '-10%', animationDelay: '-11s' }} />
        </div>

        <div className="relative z-10 w-full p-8 md:p-16">
          <span className="font-display text-sm text-ember">03</span>
          <h2 className="mt-2 font-display text-4xl text-bone md:text-6xl">
            {t('act.sanctuaire.title')}
          </h2>
          <p className="mt-4 max-w-xl font-sans text-lg text-bone/70">
            {t('act.sanctuaire.tagline')}
          </p>
          <div className="relative mt-4 h-12">
            {SCENES.map((s, i) => (
              <p
                key={s.capKey}
                ref={(el) => {
                  caps.current[i] = el;
                }}
                className="absolute font-sans text-sm uppercase tracking-widest text-bone/50"
                style={{ opacity: i === 0 ? 1 : 0 }}
              >
                {t(s.capKey)}
              </p>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
