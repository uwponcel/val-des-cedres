import { useRef } from 'react';
import { useI18n } from '../../i18n/useI18n';
import { prefersReducedMotion } from '../../lib/scroll';
import { useCrossfade } from '../../lib/useCrossfade';

const SCENES = [
  {
    src: '/photos/m21723694-far54-01.jpg',
    alt: 'Spa extérieur sur la terrasse de pierre',
    capKey: 'sanctuaire.cap.1',
  },
  {
    src: '/photos/m21723694-div43-01.jpg',
    alt: 'Sauna sec en cèdre avec fenêtre sur la forêt',
    capKey: 'sanctuaire.cap.2',
  },
  {
    src: '/photos/m21723694-sdb48-01.jpg',
    alt: 'Bain vapeur et douche à jets en verre',
    capKey: 'sanctuaire.cap.3',
  },
  {
    src: '/photos/m21723694-sbp34-01.jpg',
    alt: 'Salle de bain principale avec bain encastré et vue sur le boisé',
    capKey: 'sanctuaire.cap.4',
  },
  {
    src: '/photos/m21723694-sbp35-01.jpg',
    alt: 'Douche en verre attenante à la chambre des maîtres',
    capKey: 'sanctuaire.cap.5',
  },
  {
    src: '/photos/m21723694-sdb49-01.jpg',
    alt: 'Salle de bain complète à double vasque, bain et douche',
    capKey: 'sanctuaire.cap.6',
  },
  {
    src: '/photos/m21723694-s-e28-01.jpg',
    alt: "Salle d'eau avec vasque de cuivre sur pierre brute",
    capKey: 'sanctuaire.cap.7',
  },
];

/** Act 3 - the thermal sanctuary: spa, sauna and every bath. Moody, with steam. */
export function Sanctuaire() {
  const { t } = useI18n();
  const outer = useRef<HTMLDivElement>(null);
  const imgs = useRef<(HTMLElement | null)[]>([]);
  const caps = useRef<(HTMLElement | null)[]>([]);
  const reduced = prefersReducedMotion();

  useCrossfade(outer, [imgs, caps], SCENES.length);

  return (
    <section
      id="sanctuaire"
      ref={outer}
      className="relative"
      style={reduced ? undefined : { height: `${SCENES.length * 100}vh` }}
    >
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
          <div className="relative mt-4 h-14">
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
