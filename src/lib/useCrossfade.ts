import { useEffect, type RefObject } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from './scroll';

gsap.registerPlugin(ScrollTrigger);

/** Scroll "units" a scene holds on screen before crossfading to the next. */
const HOLD = 0.85;

/**
 * Scroll-scrubbed crossfade through N scenes pinned in a tall section.
 *
 * Each scene is a synced group of layers (its image and its caption) that fade
 * together. The timeline is generated from `count`, so scenes can be added or
 * removed without rewriting the animation. No-op under reduced motion.
 *
 * @param trigger Ref to the tall outer section (height = count * 100vh).
 * @param layers  One ref per layer track; each holds an array indexed by scene.
 * @param count   Number of scenes.
 */
export function useCrossfade<T extends HTMLElement>(
  trigger: RefObject<T | null>,
  layers: RefObject<(HTMLElement | null)[]>[],
  count: number,
): void {
  useEffect(() => {
    if (prefersReducedMotion() || count < 2) return;

    const ctx = gsap.context(() => {
      const groupAt = (i: number) =>
        layers
          .map((l) => l.current[i])
          .filter((el): el is HTMLElement => el != null);

      const tl = gsap.timeline({
        defaults: { ease: 'none', duration: 0.4 },
        scrollTrigger: {
          trigger: trigger.current,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 0.5,
        },
      });

      for (let i = 0; i < count - 1; i++) {
        const at = i + HOLD;
        tl.to(groupAt(i), { opacity: 0 }, at).to(groupAt(i + 1), { opacity: 1 }, at);
      }
    }, trigger);

    return () => ctx.revert();
    // `layers` is a fresh array literal each render but holds identity-stable
    // refs, so it is intentionally excluded from the dependency list.
  }, [trigger, count]);
}
