import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Creations.css';

const categories = ['Todos', 'Anillos', 'Pendientes', 'Colgantes', 'Pinzas de pelo'];

export default function Creations() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todos');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeFilter === 'Todos') {
      setFilteredProducts(products);
    } else {
      const categoryMap = {
        'Anillos': 'Anillo',
        'Pendientes': 'Pendiente',
        'Colgantes': 'Colgante',
        'Pinzas de pelo': 'Pinza'
      };
      const dbCategory = categoryMap[activeFilter] || activeFilter;
      setFilteredProducts(products.filter(p => p.category === dbCategory));
    }
  }, [activeFilter, products]);

  async function fetchProducts() {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
      setFilteredProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="creations" className="creations">
        <div className="container">
          <h2>Creaciones</h2>
          <p>Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="creations" className="creations">
      <div className="container">
        <h2>Creaciones</h2>

        <div className="creations-filters">
          {categories.map((category) => (
            <button
              key={category}
              className={`filter-btn ${activeFilter === category ? 'filter-btn--active' : ''}`}
              onClick={() => setActiveFilter(category)}
            >
              {category}
            </button>
          ))}
        </div>

        {filteredProducts.length === 0 ? (
          <p className="creations-empty">No hay productos disponibles en esta categoría aún.</p>
        ) : (
          <div className="creations-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="creation-card">
                <div className="creation-image">
                  <img src={product.image_url} alt={product.name} />
                </div>
                <div className="creation-info">
                  <h3>{product.name}</h3>
                  <p className="creation-category">{product.category}</p>
                  <p className="creation-description">{product.description}</p>
                  <p className="creation-price">{product.price}€</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
