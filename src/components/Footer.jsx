import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/flueu_logo.jpg" alt="Fleue Studio" className="footer-logo" />
            <p>Handmade jewelry from recycled plastic, inspired by nature.</p>
          </div>

          <div className="footer-links">
            <h4>Navigate</h4>
            <ul>
              <li><a href="#about">About</a></li>
              <li><a href="#news">News</a></li>
              <li><a href="#creations">Creations</a></li>
              <li><a href="#shop">Shop</a></li>
              <li><a href="#collections">Collections</a></li>
            </ul>
          </div>

          <div className="footer-social">
            <h4>Connect</h4>
            <div className="footer-social-links">
              <a href="mailto:fleuustudio@gmail.com" target="_blank" rel="noopener noreferrer" aria-label="Email">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </a>
              <a href="https://instagram.com/fleuestudio" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/>
                </svg>
              </a>
              <a href="https://vinted.com/fleuestudio" target="_blank" rel="noopener noreferrer" aria-label="Vinted">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Fleue Studio. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
