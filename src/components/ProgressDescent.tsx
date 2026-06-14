import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n/useI18n';

const label =
  'font-sans text-[10px] uppercase tracking-[0.3em] text-bone/80 [writing-mode:vertical-rl] [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]';

/** Fixed left-edge indicator that tracks the descent from sky to river. */
export function ProgressDescent() {
  const { t } = useI18n();
  const fill = useRef<HTMLDivElement>(null);
  const dot = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const st = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => {
        const p = self.progress * 100;
        if (fill.current) fill.current.style.height = `${p}%`;
        if (dot.current) dot.current.style.top = `calc(${p}% - 3px)`;
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed left-5 top-0 z-40 hidden h-screen flex-col items-center justify-center gap-4 md:flex"
    >
      <span className={label}>{t('progress.sky')}</span>
      <div className="relative h-[42vh] w-px bg-bone/35">
        <div ref={fill} className="absolute left-0 top-0 w-px bg-cognac" style={{ height: '0%' }} />
        <div
          ref={dot}
          className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-ember shadow-[0_0_8px_rgba(192,103,51,0.9)]"
          style={{ top: '-3px' }}
        />
      </div>
      <span className={label}>{t('progress.river')}</span>
    </div>
  );
}
