import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { useI18n } from '../../i18n/useI18n';
import { property } from '../../data/property';
import { prefersReducedMotion } from '../../lib/scroll';

/**
 * Act 0 - the descent. Scroll-scrubbed crossfade from a wide valley aerial,
 * down to a top-down view of the property, landing on the facade.
 */
export function Approche() {
  const { t } = useI18n();
  const outer = useRef<HTMLDivElement>(null);
  const img0 = useRef<HTMLImageElement>(null);
  const img1 = useRef<HTMLImageElement>(null);
  const img2 = useRef<HTMLImageElement>(null);
  const text = useRef<HTMLDivElement>(null);
  const cue = useRef<HTMLDivElement>(null);
  const reduced = prefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    const ctx = gsap.context(() => {
      gsap.set([img1.current, img2.current], { opacity: 0 });
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: {
          trigger: outer.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });
      tl.to(cue.current, { opacity: 0, duration: 0.2 }, 0)
        .to(text.current, { opacity: 0, y: -40, duration: 0.4 }, 0.1)
        .fromTo(img0.current, { scale: 1.05 }, { scale: 1.22, duration: 1.6 }, 0)
        .to(img0.current, { opacity: 0, duration: 0.5 }, 1.05)
        .to(img1.current, { opacity: 1, duration: 0.5 }, 1.05)
        .fromTo(img1.current, { scale: 1.18 }, { scale: 1.0, duration: 1.5 }, 1.05)
        .to(img1.current, { opacity: 0, duration: 0.5 }, 2.25)
        .to(img2.current, { opacity: 1, duration: 0.5 }, 2.25)
        .fromTo(img2.current, { scale: 1.12 }, { scale: 1.0, duration: 1.4 }, 2.25);
    }, outer);
    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="approche" ref={outer} className={reduced ? 'relative h-screen' : 'relative h-[320vh]'}>
      <div className="sticky top-0 flex h-screen items-end overflow-hidden">
        <img
          ref={img0}
          src="/photos/m21723694-fac02-01.jpg"
          alt="Façade de la résidence à charpente de bois massif"
          className="absolute inset-0 h-full w-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
        <img
          ref={img1}
          src="/photos/m21723694-aer67-01.jpg"
          alt="Vue aérienne de la vallée boisée des Laurentides en automne"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />
        <img
          ref={img2}
          src="/photos/m21723694-aer68-01.jpg"
          alt="Vue aérienne rapprochée de la propriété et de son allée"
          className="absolute inset-0 h-full w-full object-cover"
          style={{ opacity: 0 }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/25 to-ink/10" />

        <div ref={text} className="relative z-10 p-8 md:p-16">
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

        <div ref={cue} className="absolute inset-x-0 bottom-6 z-10 flex justify-center">
          <span className="font-sans text-xs uppercase tracking-[0.3em] text-bone/60">
            {t('hero.cue')}
          </span>
        </div>
      </div>
    </section>
  );
}
