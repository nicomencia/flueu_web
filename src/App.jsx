import { useState, useEffect } from 'react';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import About from './components/About';
import Creations from './components/Creations';
import Collections from './components/Collections';
import CollectionDetail from './components/CollectionDetail';
import Custom from './components/Custom';
import Tallas from './components/Tallas';
import Footer from './components/Footer';
import AdminUpload from './components/AdminUpload';
import AdminUpdateProducts from './components/AdminUpdateProducts';

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const [selectedCollection, setSelectedCollection] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  const renderContent = () => {
    switch (currentView) {
      case 'colecciones':
        return <Collections setCurrentView={setCurrentView} setSelectedCollection={setSelectedCollection} />;
      case 'collection-detail':
        return <CollectionDetail collectionId={selectedCollection} setCurrentView={setCurrentView} />;
      case 'creations':
        return <Creations setCurrentView={setCurrentView} />;
      case 'custom':
        return <Custom setCurrentView={setCurrentView} />;
      case 'tallas':
        return <Tallas />;
      case 'sobre-mi':
        return <About />;
      case 'admin-upload':
        return <AdminUpload />;
      case 'admin-update':
        return <AdminUpdateProducts />;
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
