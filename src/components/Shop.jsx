import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Shop.css';

const categories = ['Todos', 'Anillos', 'Pendientes', 'Colgantes', 'Pinzas de pelo'];

export default function Shop() {
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
      setFilteredProducts(products.filter(p => p.category === activeFilter));
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
      <section id="shop" className="shop">
        <div className="container">
          <h2>Tienda</h2>
          <p>Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="shop" className="shop">
      <div className="container">
        <h2>Shop</h2>

        <div className="shop-filters">
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
          <p className="shop-empty">No hay productos disponibles en esta categoría aún.</p>
        ) : (
          <div className="shop-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="shop-card">
                <div className="shop-image">
                  <img src={product.image_url} alt={product.name} />
                </div>
                <div className="shop-info">
                  <h3>{product.name}</h3>
                  <p className="shop-category">{product.category}</p>
                  <p className="shop-description">{product.description}</p>
                  <p className="shop-price">{product.price}€</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
