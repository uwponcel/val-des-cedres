import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scroll';

function formatInt(n: number): string {
  return Math.round(n).toLocaleString('fr-CA');
}

/**
 * Counts a number up from 0 to `end` the first time its element enters view.
 * Respects reduced motion (renders the final value immediately).
 */
export function useCountUp(end: number, durationSec = 1.6) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (prefersReducedMotion()) {
      el.textContent = formatInt(end);
      return;
    }

    el.textContent = formatInt(0);
    const obj = { v: 0 };
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(obj, {
          v: end,
          duration: durationSec,
          ease: 'power2.out',
          onUpdate: () => {
            el.textContent = formatInt(obj.v);
          },
        });
      },
    });

    return () => st.kill();
  }, [end, durationSec]);

  return ref;
}
