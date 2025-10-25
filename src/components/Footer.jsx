import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/Flueu (2).png" alt="Fleue Studio" className="footer-logo" />
            <p>Joyería hecha a mano de plástico reciclado, inspirada en la naturaleza.</p>
          </div>

          <div className="footer-links">
            <h4>Navegar</h4>
            <ul>
              <li><a href="#nosotros">Nosotros</a></li>
              <li><a href="#noticias">Noticias</a></li>
              <li><a href="#creaciones">Creaciones</a></li>
              <li><a href="#tienda">Tienda</a></li>
              <li><a href="#colecciones">Colecciones</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Conectar</h4>
            <div className="footer-social-links">
              <a href="mailto:fleuustudio@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="https://instagram.com/fleuestudio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://www.tiktok.com/@fleuestudio" target="_blank" rel="noopener noreferrer" aria-label="TikTok">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                </svg>
              </a>
              <a href="https://vinted.com/fleuestudio" target="_blank" rel="noopener noreferrer" aria-label="Vinted">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5zm0 2.18l8 4V17c0 4.52-3.16 8.77-8 9.92-4.84-1.15-8-5.4-8-9.92V8.18l8-4zM11 9v2h2V9h-2zm0 4v6h2v-6h-2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Fleue Studio. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
