import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useI18n } from '../i18n/useI18n';

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
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/50 [writing-mode:vertical-rl]">
        {t('progress.sky')}
      </span>
      <div className="relative h-[42vh] w-px bg-bone/20">
        <div ref={fill} className="absolute left-0 top-0 w-px bg-cognac" style={{ height: '0%' }} />
        <div
          ref={dot}
          className="absolute -left-[3px] h-1.5 w-1.5 rounded-full bg-ember"
          style={{ top: '-3px' }}
        />
      </div>
      <span className="font-sans text-[10px] uppercase tracking-[0.3em] text-bone/50 [writing-mode:vertical-rl]">
        {t('progress.river')}
      </span>
    </div>
  );
}
