import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import './News.css';

export default function News() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNews();
  }, []);

  async function fetchNews() {
    try {
      const { data, error } = await supabase
        .from('news')
        .select('*')
        .order('published_date', { ascending: false })
        .limit(3);

      if (error) throw error;
      setNews(data || []);
    } catch (error) {
      console.error('Error fetching news:', error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <section id="news" className="news">
        <div className="container">
          <h2>Noticias</h2>
          <p>Cargando...</p>
        </div>
      </section>
    );
  }

  if (news.length === 0) {
    return (
      <section id="news" className="news">
        <div className="container">
          <h2>Noticias</h2>
          <p className="news-empty">Mantente atento a las actualizaciones y anuncios.</p>
        </div>
      </section>
    );
  }

  return (
    <section id="news" className="news">
      <div className="container">
        <h2>Noticias</h2>
        <div className="news-grid">
          {news.map((item) => (
            <article key={item.id} className="news-card">
              {item.image_url && (
                <img src={item.image_url} alt={item.title} className="news-image" />
              )}
              <div className="news-content">
                <h3>{item.title}</h3>
                <time>{new Date(item.published_date).toLocaleDateString('es-ES')}</time>
                <p>{item.content}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
