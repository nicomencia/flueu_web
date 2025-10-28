import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Creations.css';

const categories = ['Todas', 'Anillos', 'Pendientes', 'Colgantes', 'Pinzas'];

export default function Creations({ setCurrentView }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [activeFilter, setActiveFilter] = useState('Todas');
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxProduct, setLightboxProduct] = useState(null);
  const [lightboxImageIndex, setLightboxImageIndex] = useState(0);

  useEffect(() => {
    fetchProducts();
  }, []);

  useEffect(() => {
    if (activeFilter === 'Todas') {
      setFilteredProducts(products);
    } else {
      const categoryMap = {
        'Anillos': 'Anillo',
        'Pendientes': 'Pendiente',
        'Colgantes': 'Colgante',
        'Pinzas': 'Pinza'
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

  function openLightbox(product) {
    setLightboxProduct(product);
    setLightboxImageIndex(0);
    setLightboxOpen(true);
  }

  function closeLightbox() {
    setLightboxOpen(false);
    setLightboxProduct(null);
    setLightboxImageIndex(0);
  }

  function nextImage() {
    if (lightboxProduct && lightboxProduct.secondary_image_url) {
      setLightboxImageIndex((prev) => (prev === 0 ? 1 : 0));
    }
  }

  function prevImage() {
    if (lightboxProduct && lightboxProduct.secondary_image_url) {
      setLightboxImageIndex((prev) => (prev === 0 ? 1 : 0));
    }
  }

  useEffect(() => {
    function handleKeyDown(e) {
      if (!lightboxOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowRight') nextImage();
      if (e.key === 'ArrowLeft') prevImage();
    }
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, lightboxProduct]);

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

        {activeFilter === 'Anillos' && (
          <div className="tallas-link-wrapper">
            <button onClick={() => setCurrentView('tallas')} className="tallas-link">Tallas</button>
          </div>
        )}

        {filteredProducts.length === 0 ? (
          <p className="creations-empty">No hay productos disponibles en esta categoría aún.</p>
        ) : (
          <div className="creations-grid">
            {filteredProducts.map((product) => (
              <div key={product.id} className="creation-card" onClick={() => openLightbox(product)}>
                <div className="creation-image">
                  <img src={product.image_url} alt={product.name} className="creation-image-primary" />
                  {product.secondary_image_url && (
                    <img src={product.secondary_image_url} alt={product.name} className="creation-image-secondary" />
                  )}
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

        {lightboxOpen && lightboxProduct && (
          <div className="lightbox" onClick={closeLightbox}>
            <button className="lightbox-close" onClick={closeLightbox}>&times;</button>

            <div className="lightbox-content" onClick={(e) => e.stopPropagation()}>
              <img
                src={lightboxImageIndex === 0 ? lightboxProduct.image_url : lightboxProduct.secondary_image_url}
                alt={lightboxProduct.name}
                className="lightbox-image"
              />

              {lightboxProduct.secondary_image_url && (
                <>
                  <button className="lightbox-arrow lightbox-arrow-left" onClick={prevImage}>
                    &#8249;
                  </button>
                  <button className="lightbox-arrow lightbox-arrow-right" onClick={nextImage}>
                    &#8250;
                  </button>
                  <div className="lightbox-indicators">
                    <span className={lightboxImageIndex === 0 ? 'active' : ''} onClick={() => setLightboxImageIndex(0)}></span>
                    <span className={lightboxImageIndex === 1 ? 'active' : ''} onClick={() => setLightboxImageIndex(1)}></span>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
