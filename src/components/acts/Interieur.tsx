import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useI18n } from '../../i18n/useI18n';
import { prefersReducedMotion } from '../../lib/scroll';

const SCENES = [
  {
    src: '/photos/m21723694-sal11-01.jpg',
    alt: 'Salon avec mur de pierre et foyer au bois deux faces',
    capKey: 'interieur.cap.salon',
  },
  {
    src: '/photos/m21723694-sam16-01.jpg',
    alt: 'Salle à manger ouverte sur la véranda',
    capKey: 'interieur.cap.dining',
  },
  {
    src: '/photos/m21723694-cui24-01.jpg',
    alt: 'Cuisine en noyer avec îlot en granit brut',
    capKey: 'interieur.cap.kitchen',
  },
  {
    src: '/photos/m21723694-ccp30-01.jpg',
    alt: 'Chambre des maîtres avec vue sur la forêt',
    capKey: 'interieur.cap.bedroom',
  },
];

/** Act 2 - scroll-scrubbed glide through salon, dining and kitchen. */
export function Interieur() {
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
        .to([imgs.current[2], caps.current[2]], { opacity: 1 }, 1.85)
        .to([imgs.current[2], caps.current[2]], { opacity: 0 }, 2.85)
        .to([imgs.current[3], caps.current[3]], { opacity: 1 }, 2.85);
    }, outer);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section
      id="interieur"
      ref={outer}
      className={reduced ? 'relative' : 'relative h-[400vh]'}
    >
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
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-transparent" />

        <div className="relative z-10 w-full p-8 md:p-16">
          <span className="font-display text-sm text-cognac">02</span>
          <h2 className="mt-2 font-display text-4xl text-bone md:text-6xl">
            {t('act.interieur.title')}
          </h2>
          <div className="relative mt-4 h-12">
            {SCENES.map((s, i) => (
              <p
                key={s.capKey}
                ref={(el) => {
                  caps.current[i] = el;
                }}
                className="absolute font-sans text-bone/70"
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
            <img
              key={s.src}
              src={s.src}
              alt={s.alt}
              className="h-80 w-full object-cover"
              loading="lazy"
            />
          ))}
        </div>
      )}
    </section>
  );
}
