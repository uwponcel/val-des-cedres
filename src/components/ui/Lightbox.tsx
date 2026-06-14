import { useCallback, useEffect } from 'react';
import type { Photo } from '../../data/photos';
import { useI18n } from '../../i18n/useI18n';

interface Props {
  photos: Photo[];
  index: number;
  onClose: () => void;
  onIndex: (i: number) => void;
}

export function Lightbox({ photos, index, onClose, onIndex }: Props) {
  const { t } = useI18n();

  const prev = useCallback(
    () => onIndex((index - 1 + photos.length) % photos.length),
    [index, photos.length, onIndex],
  );
  const next = useCallback(
    () => onIndex((index + 1) % photos.length),
    [index, photos.length, onIndex],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [onClose, prev, next]);

  const photo = photos[index];
  if (!photo) return null;

  const btn =
    'absolute top-1/2 -translate-y-1/2 grid h-12 w-12 place-items-center rounded-full bg-bone/10 text-2xl text-bone backdrop-blur transition-colors hover:bg-bone/20';

  return (
    <div
      role="dialog"
      aria-modal="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4"
      onClick={onClose}
    >
      <button
        type="button"
        onClick={onClose}
        aria-label={t('lightbox.close')}
        className="absolute right-5 top-5 grid h-11 w-11 place-items-center rounded-full bg-bone/10 text-xl text-bone backdrop-blur transition-colors hover:bg-bone/20"
      >
        ✕
      </button>

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          prev();
        }}
        aria-label={t('lightbox.prev')}
        className={`${btn} left-4`}
      >
        ‹
      </button>

      <img
        src={photo.file}
        alt=""
        className="max-h-[88vh] max-w-[92vw] object-contain"
        onClick={(e) => e.stopPropagation()}
      />

      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation();
          next();
        }}
        aria-label={t('lightbox.next')}
        className={`${btn} right-4`}
      >
        ›
      </button>

      <span className="absolute bottom-5 left-1/2 -translate-x-1/2 font-sans text-sm tracking-widest text-bone/70">
        {index + 1} / {photos.length}
      </span>
    </div>
  );
}
