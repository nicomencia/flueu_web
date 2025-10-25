import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Collections.css';

export default function Collections() {
  const [collections, setCollections] = useState([]);
  const [collectionProducts, setCollectionProducts] = useState({});
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

      if (collectionsData && collectionsData.length > 0) {
        const productsMap = {};
        for (const collection of collectionsData) {
          const { data: productsData, error: productsError } = await supabase
            .from('products')
            .select('*')
            .eq('collection_id', collection.id);

          if (productsError) throw productsError;
          productsMap[collection.id] = productsData || [];
        }
        setCollectionProducts(productsMap);
      }
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
            <div key={collection.id} className="collection-section">
              <div className="collection-header">
                {collection.image_url && (
                  <img src={collection.image_url} alt={collection.name} className="collection-hero" />
                )}
                <div className="collection-info">
                  <h3>{collection.name}</h3>
                  <p>{new Date(collection.created_at).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                </div>
              </div>

              {collectionProducts[collection.id] && collectionProducts[collection.id].length > 0 && (
                <div className="collection-products">
                  {collectionProducts[collection.id].map((product) => (
                    <div key={product.id} className="collection-product-card">
                      <div className="collection-product-image">
                        <img src={product.image_url} alt={product.name} />
                      </div>
                      <div className="collection-product-info">
                        <h4>{product.name}</h4>
                        <p className="collection-product-price">{product.price}€</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
