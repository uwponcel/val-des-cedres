import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useI18n } from '../../i18n/useI18n';
import { property } from '../../data/property';
import { useCountUp } from '../../lib/useScrollScene';
import { prefersReducedMotion } from '../../lib/scroll';

/** Act 1 - landing on the facade, with the headline figures counting up. */
export function Arrivee() {
  const { t } = useI18n();
  const section = useRef<HTMLElement>(null);
  const content = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  const priceRef = useCountUp(property.priceCad);
  const bedRef = useCountUp(property.bedrooms);
  const roomsRef = useCountUp(property.roomsTotal);
  const landRef = useCountUp(property.landSqFt);

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.from(content.current, {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: { trigger: section.current, start: 'top 65%' },
      });
    }, section);
    return () => ctx.revert();
  }, [reduced]);

  const stats = [
    { ref: priceRef, suffix: ' $', label: t('stat.price') },
    { ref: bedRef, suffix: '', label: t('stat.bedrooms') },
    { ref: roomsRef, suffix: '', label: t('stat.rooms') },
    { ref: landRef, suffix: ' pi²', label: t('stat.land') },
  ];

  return (
    <section
      id="arrivee"
      ref={section}
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <img
        src="/photos/m21723694-pri01-01.jpg"
        alt="Entrée principale à charpente de bois massif"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/80 to-ink/20" />

      <div ref={content} className="relative z-10 w-full px-8 py-24 md:px-16">
        <span className="font-display text-sm text-cognac">01</span>
        <h2 className="mt-2 max-w-2xl font-display text-4xl leading-tight text-bone md:text-6xl">
          {t('act.arrivee.title')}
        </h2>
        <p className="mt-5 max-w-xl font-sans text-lg text-bone/70">
          {t('act.arrivee.tagline')}
        </p>

        <dl className="mt-12 grid max-w-2xl grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label}>
              <dd className="font-display text-3xl text-bone md:text-4xl">
                <span ref={s.ref}>0</span>
                {s.suffix}
              </dd>
              <dt className="mt-1 font-sans text-xs uppercase tracking-widest text-bone/50">
                {s.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
