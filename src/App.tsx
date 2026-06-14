import { useSmoothScroll } from './lib/scroll';
import { Nav } from './components/Nav';
import { ProgressDescent } from './components/ProgressDescent';
import { Approche } from './components/acts/Approche';
import { Arrivee } from './components/acts/Arrivee';
import { Interieur } from './components/acts/Interieur';
import { Sanctuaire } from './components/acts/Sanctuaire';
import { Riviere } from './components/acts/Riviere';
import { Domaine } from './components/acts/Domaine';
import { Pieces } from './components/acts/Pieces';
import { useI18n } from './i18n/useI18n';

export default function App() {
  useSmoothScroll();
  const { t } = useI18n();

  return (
    <>
      <Nav />
      <ProgressDescent />
      <main>
        <Approche />
        <Arrivee />
        <Interieur />
        <Sanctuaire />
        <Riviere />
        <Domaine />
        <Pieces />

        <section
          id="invitation"
          className="flex min-h-[80vh] items-center border-t border-bone/10 px-8 py-24 md:px-16"
        >
          <div>
            <span className="font-display text-sm text-cognac">07</span>
            <h2 className="mt-2 max-w-3xl font-display text-4xl text-bone md:text-6xl">
              {t('act.invitation.title')}
            </h2>
            <p className="mt-5 max-w-xl font-sans text-lg text-bone/60">
              {t('act.invitation.tagline')}
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
