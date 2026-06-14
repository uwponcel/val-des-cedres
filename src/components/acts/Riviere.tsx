import { useI18n } from '../../i18n/useI18n';
import { SceneVideo } from '../ui/SceneVideo';

/** Act 4 - the river. Real flowing-water clip of the Chevreuil, poster + fallback. */
export function Riviere() {
  const { t } = useI18n();

  return (
    <section id="riviere" className="relative flex min-h-screen items-end overflow-hidden">
      <SceneVideo
        src="/videos/river-flow.mp4"
        poster="/photos/m21723694-vea05-01.jpg"
        alt="Rivière Chevreuil en cascades avec bassin naturel bordant la propriété"
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/30 to-transparent" />

      <div className="relative z-10 p-8 md:p-16">
        <span className="font-display text-sm text-cognac">04</span>
        <h2 className="mt-2 max-w-3xl font-display text-5xl text-bone md:text-7xl">
          {t('act.riviere.title')}
        </h2>
        <p className="mt-5 max-w-xl font-sans text-lg text-bone/75">{t('act.riviere.tagline')}</p>
        <p className="mt-2 font-display text-xl italic text-bone/60">{t('riviere.line')}</p>
      </div>
    </section>
  );
}
