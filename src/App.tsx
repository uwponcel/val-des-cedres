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
