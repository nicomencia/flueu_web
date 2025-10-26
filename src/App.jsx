import { useState } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Creations from './components/Creations';
import Collections from './components/Collections';
import Custom from './components/Custom';
import Footer from './components/Footer';

export default function App() {
  const [currentView, setCurrentView] = useState('home');

  const renderContent = () => {
    switch (currentView) {
      case 'colecciones':
        return <Collections />;
      case 'creations':
        return <Creations />;
      case 'custom':
        return <Custom />;
      case 'sobre-mi':
        return <About />;
      default:
        return <Hero />;
    }
  };

  return (
    <>
      <Navigation currentView={currentView} setCurrentView={setCurrentView} />
      {renderContent()}
      <Footer setCurrentView={setCurrentView} />
    </>
  );
}
