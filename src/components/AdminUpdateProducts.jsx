import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './AdminUpdateProducts.css';

export default function AdminUpdateProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('name');

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      setMessage(`Error loading products: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const getStorageUrl = (filename) => {
    if (!filename) return '';
    if (filename.startsWith('http')) return filename;

    const { data } = supabase.storage
      .from('product-images')
      .getPublicUrl(filename);

    return data.publicUrl;
  };

  const updateAllProducts = async () => {
    if (!confirm('This will update ALL products to use Supabase Storage URLs. Continue?')) {
      return;
    }

    try {
      setUpdating(true);
      setMessage('');

      const updatePromises = products.map(async (product) => {
        const updates = {};

        if (product.image_url && !product.image_url.startsWith('http')) {
          updates.image_url = getStorageUrl(product.image_url);
          const thumbnailFilename = product.image_url.replace(/(\.[^.]+)$/, '_thumbnail$1');
          updates.thumbnail_url = getStorageUrl(thumbnailFilename);
        }

        if (product.secondary_image_url && !product.secondary_image_url.startsWith('http')) {
          updates.secondary_image_url = getStorageUrl(product.secondary_image_url);
        }

        if (Object.keys(updates).length > 0) {
          const { error } = await supabase
            .from('products')
            .update(updates)
            .eq('id', product.id);

          if (error) throw error;
        }
      });

      await Promise.all(updatePromises);

      setMessage(`Successfully updated ${products.length} products!`);
      loadProducts();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setUpdating(false);
    }
  };

  const updateSingleProduct = async (productId, field, newValue) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ [field]: newValue })
        .eq('id', productId);

      if (error) throw error;

      setMessage('Product updated successfully!');
      loadProducts();
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="admin-update-loading">Loading products...</div>;
  }

  return (
    <div className="admin-update">
      <div className="admin-update-card">
        <h2>Update Products with Storage URLs</h2>

        <div className="admin-update-actions">
          <button
            onClick={updateAllProducts}
            disabled={updating}
            className="admin-update-button primary"
          >
            {updating ? 'Updating...' : 'Update All Products'}
          </button>
        </div>

        {message && (
          <div className={`admin-update-message ${message.includes('Success') ? 'success' : 'error'}`}>
            {message}
          </div>
        )}

        <div className="admin-update-info">
          <h3>What this does:</h3>
          <p>
            This will convert all product image filenames (like "ELJARDIN0A04.jpg")
            into full Supabase Storage URLs. Make sure you've uploaded all images first!
          </p>
        </div>

        <div className="admin-update-products">
          <h3>Products ({products.length})</h3>
          {products.map((product) => (
            <div key={product.id} className="admin-update-product">
              <div className="product-info">
                <strong>{product.name}</strong>
                <div className="product-urls">
                  <div>
                    <span className="label">Image:</span>
                    <span className="url">{product.image_url}</span>
                  </div>
                  {product.secondary_image_url && (
                    <div>
                      <span className="label">Secondary:</span>
                      <span className="url">{product.secondary_image_url}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
