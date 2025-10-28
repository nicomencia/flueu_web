import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './Custom.css';

export default function Custom({ setCurrentView }) {
  const [flowers, setFlowers] = useState([]);
  const [accessoryTypes, setAccessoryTypes] = useState([]);
  const [plasticColors, setPlasticColors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCustomData();
  }, []);

  async function fetchCustomData() {
    try {
      const [flowersResult, accessoryTypesResult, plasticColorsResult] = await Promise.all([
        supabase.from('flowers').select('*').order('display_order', { ascending: true }),
        supabase.from('accessory_types').select('*').order('display_order', { ascending: true }),
        supabase.from('plastic_colors').select('*').order('display_order', { ascending: true })
      ]);

      if (flowersResult.error) throw flowersResult.error;
      if (accessoryTypesResult.error) throw accessoryTypesResult.error;
      if (plasticColorsResult.error) throw plasticColorsResult.error;

      setFlowers(flowersResult.data || []);
      setAccessoryTypes(accessoryTypesResult.data || []);
      setPlasticColors(plasticColorsResult.data || []);
    } catch (error) {
      console.error('Error fetching custom data:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section className="custom" id="custom">
        <div className="container">
          <h2>Custom</h2>
          <p>Cargando...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="custom" id="custom">
      <div className="container">
        <div className="custom-intro">
          <h2>Custom</h2>
          <p>
            En Flueu, cada creación es una conversación.
          </p>
          <p>
            En este apartado encontrarás tanto flores que tengo disponibles como los materiales con los que puedo darle forma a tus ideas.
          </p>
          <p>
            Juntas las transformaremos en un accesorio que encaje con lo que estás buscando: anillo, colgante, pendientes o pinza.
          </p>
          <p>
            Deberás elegir:
          </p>
          <ul>
            <li>Flor o elementos en que quieras que me inspire;</li>
            <li>Tipo de accesorio;<br />
            En caso de ser un anillo aquí te enseño cómo seleccionar tu  <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' }) || setCurrentView?.('tallas')} className="inline-link">Talla</button></li>
            <li>Color del plástico, según las botellas recicladas de las que disponga en cada momento.</li>
          </ul>
          <p>
            El resto déjalo fluir: el fuego y la creatividad harán el trabajo.
          </p>
        </div>

        {flowers.length > 0 && (
          <div className="custom-section">
            <h3>Flores disponibles</h3>
            <p className="custom-section-description"></p>
            <div className="custom-flowers-grid">
              {flowers.map(flower => (
                <div key={flower.id} className="custom-flower-item">
                  <img src={flower.image_url} alt={flower.alt_text} />
                </div>
              ))}
            </div>
          </div>
        )}

        {accessoryTypes.length > 0 && (
          <div className="custom-section">
            <h3>Tipo de accesorio</h3>
            <p className="custom-section-description">
              Para los anillos aquí están las <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' }) || setCurrentView?.('tallas')} className="inline-link">Tallas</button>
            </p>
            <div className="custom-accessory-grid">
              {accessoryTypes.map(accessory => (
                <div key={accessory.id} className="custom-accessory-item">
                  <img src={accessory.image_url} alt={accessory.name} />
                  <p>{accessory.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {plasticColors.length > 0 && (
          <div className="custom-section">
            <h3>Color del plástico</h3>
            <p className="custom-section-description"></p>
            <div className="custom-color-grid">
              {plasticColors.map(color => (
                <div key={color.id} className="custom-color-item">
                  <img src={color.image_url} alt={color.name} />
                  <p>{color.name}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
