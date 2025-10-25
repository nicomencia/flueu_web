import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Creations.css';

export default function Creations() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  async function fetchFeaturedProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('featured', true)
        .limit(6);

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="creations" className="creations">
        <div className="container">
          <h2>Featured Creations</h2>
          <p>Loading...</p>
        </div>
      </section>
    );
  }

  if (products.length === 0) {
    return (
      <section id="creations" className="creations">
        <div className="container">
          <h2>Featured Creations</h2>
          <p className="creations-empty">New pieces coming soon.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="creations" className="creations">
      <div className="container">
        <h2>Featured Creations</h2>
        <div className="creations-grid">
          {products.map((product) => (
            <div key={product.id} className="creation-card">
              <div className="creation-image">
                <img src={product.image_url} alt={product.name} />
              </div>
              <div className="creation-info">
                <h3>{product.name}</h3>
                <p className="creation-category">{product.category}</p>
                <p className="creation-price">{product.price}€</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
