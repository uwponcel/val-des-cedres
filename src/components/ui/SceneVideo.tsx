import { forwardRef, type CSSProperties, type Ref } from 'react';
import { prefersReducedMotion } from '../../lib/scroll';

interface Props {
  src: string;
  poster: string;
  alt: string;
  className?: string;
  style?: CSSProperties;
  eager?: boolean;
}

/**
 * Autoplaying, muted, looping clip with the start photo as poster + fallback.
 * Reduced motion renders the still poster instead of the video.
 */
export const SceneVideo = forwardRef<HTMLElement, Props>(function SceneVideo(
  { src, poster, alt, className, style, eager = false },
  ref,
) {
  if (prefersReducedMotion()) {
    return (
      <img
        ref={ref as Ref<HTMLImageElement>}
        src={poster}
        alt={alt}
        className={className}
        style={style}
        loading={eager ? 'eager' : 'lazy'}
      />
    );
  }

  return (
    <video
      ref={ref as Ref<HTMLVideoElement>}
      poster={poster}
      className={className}
      style={style}
      autoPlay
      muted
      loop
      playsInline
      preload={eager ? 'auto' : 'metadata'}
      aria-label={alt}
    >
      <source src={src} type="video/mp4" />
    </video>
  );
});
