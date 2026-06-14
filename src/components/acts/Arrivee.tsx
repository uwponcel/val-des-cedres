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

  const statCls = 'font-display text-3xl text-bone md:text-4xl';
  const labelCls = 'mt-1 font-sans text-xs uppercase tracking-widest text-bone/50';

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
      <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/90 to-ink/25" />

      <div ref={content} className="relative z-10 w-full max-w-2xl px-8 py-24 md:px-16">
        <span className="font-display text-sm text-cognac">01</span>
        <h2 className="mt-2 font-display text-4xl leading-tight text-bone md:text-6xl">
          {t('act.arrivee.title')}
        </h2>
        <p className="mt-5 max-w-md font-sans text-lg text-bone/70">
          {t('act.arrivee.tagline')}
        </p>

        <div className="mt-12">
          <p className="font-display text-5xl text-bone md:text-6xl">
            <span ref={priceRef}>0</span> $
          </p>
          <p className="mt-1 font-sans text-xs uppercase tracking-[0.25em] text-bone/50">
            {t('stat.price')}
          </p>
        </div>

        <dl className="mt-8 flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <dd className={statCls}>
              <span ref={bedRef}>0</span>
            </dd>
            <dt className={labelCls}>{t('stat.bedrooms')}</dt>
          </div>
          <div>
            <dd className={statCls}>
              <span ref={roomsRef}>0</span>
            </dd>
            <dt className={labelCls}>{t('stat.rooms')}</dt>
          </div>
          <div>
            <dd className={statCls}>
              <span ref={landRef}>0</span> pi²
            </dd>
            <dt className={labelCls}>{t('stat.land')}</dt>
          </div>
        </dl>
      </div>
    </section>
  );
}
