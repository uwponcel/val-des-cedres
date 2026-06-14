import { useSmoothScroll } from './lib/scroll';
import { Nav } from './components/Nav';
import { Footer } from './components/Footer';
import { ProgressDescent } from './components/ProgressDescent';
import { Approche } from './components/acts/Approche';
import { Arrivee } from './components/acts/Arrivee';
import { Interieur } from './components/acts/Interieur';
import { Sanctuaire } from './components/acts/Sanctuaire';
import { Riviere } from './components/acts/Riviere';
import { Domaine } from './components/acts/Domaine';
import { Pieces } from './components/acts/Pieces';
import { Invitation } from './components/acts/Invitation';

export default function App() {
  useSmoothScroll();

  return (
    <>
      <Nav />
      <div
        aria-hidden
        className="pointer-events-none fixed inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-ink/55 to-transparent"
      />
      <ProgressDescent />
      <main>
        <Approche />
        <Arrivee />
        <Interieur />
        <Sanctuaire />
        <Riviere />
        <Domaine />
        <Pieces />
        <Invitation />
      </main>
      <Footer />
    </>
  );
}
