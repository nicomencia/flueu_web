import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Collections.css';

export default function Collections({ setCurrentView, setSelectedCollection }) {
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCollections();
  }, []);

  async function fetchCollections() {
    try {
      const { data: collectionsData, error: collectionsError } = await supabase
        .from('collections')
        .select('*')
        .order('created_at', { ascending: false });

      if (collectionsError) throw collectionsError;
      setCollections(collectionsData || []);
    } catch (error) {
      console.error('Error fetching collections:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="colecciones" className="collections">
        <div className="container">
          <h2>Colecciones</h2>
          <p>Cargando...</p>
        </div>
      </section>
    );
  }

  if (collections.length === 0) {
    return (
      <section id="colecciones" className="collections">
        <div className="container">
          <h2>Colecciones</h2>
          <p className="collections-empty">Nuevas colecciones próximamente.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="colecciones" className="collections">
      <div className="container">
        <h2>Colecciones</h2>
        <div className="collections-list">
          {collections.map((collection) => (
            <div
              key={collection.id}
              className="collection-section"
              onClick={() => {
                setSelectedCollection(collection.id);
                setCurrentView('collection-detail');
              }}
            >
              <div className="collection-header">
                {collection.image_url && (
                  <img src={collection.image_url} alt={collection.name} className="collection-hero" />
                )}
                <div className="collection-info">
                  <h3>{collection.name}</h3>
                  <p className="collection-date">{new Date(collection.created_at).toLocaleDateString('es-ES', { year: 'numeric', month: 'long' })}</p>
                  {collection.description && (
                    <p className="collection-description">{collection.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
