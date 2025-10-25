import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Creations from './components/Creations';
import Collections from './components/Collections';
import Footer from './components/Footer';

export default function App() {
  return (
    <>
      <Navigation />
      <Hero />
      <Collections />
      <Creations />
      <About />
      <Footer />
    </>
  );
}
