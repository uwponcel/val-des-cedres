import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n/useI18n';

const ACTS = [
  'approche',
  'arrivee',
  'interieur',
  'sanctuaire',
  'riviere',
  'domaine',
  'pieces',
  'invitation',
] as const;

// Sections rendered on the cream "paper" background, where text must be dark.
const LIGHT_SECTIONS = new Set<string>(['pieces']);

/** Fixed left-edge progress rail. Shows the current act and adapts to light sections. */
export function ProgressDescent() {
  const { t } = useI18n();
  const fill = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string>('approche');

  useEffect(() => {
    const triggers: ScrollTrigger[] = [];

    triggers.push(
      ScrollTrigger.create({
        start: 0,
        end: 'max',
        onUpdate: (self) => {
          const p = self.progress * 100;
          if (fill.current) fill.current.style.height = `${p}%`;
          if (dot.current) dot.current.style.top = `calc(${p}% - 3px)`;
        },
      }),
    );

    ACTS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      triggers.push(
        ScrollTrigger.create({
          trigger: el,
          start: 'top center',
          end: 'bottom center',
          onToggle: (self) => {
            if (self.isActive) setActive(id);
          },
        }),
      );
    });

    return () => triggers.forEach((tr) => tr.kill());
  }, []);

  const light = LIGHT_SECTIONS.has(active);
  const labelCls = light
    ? 'text-ink/60'
    : 'text-bone/80 [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]';

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-5 top-0 z-40 hidden h-screen flex-col items-center justify-center gap-5 md:flex"
    >
      <div className="relative h-[44vh] w-px bg-cognac/25">
        <div ref={fill} className="absolute left-0 top-0 w-px bg-cognac" style={{ height: '0%' }} />
        <div
          ref={dot}
          className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(192,103,51,0.9)]"
          style={{ top: '-3px' }}
        />
      </div>
      <span
        className={`font-sans text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl] transition-colors duration-500 ${labelCls}`}
      >
        {t(`act.${active}.title`)}
      </span>
    </div>
  );
}
