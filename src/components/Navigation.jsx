import { useState } from 'react';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <a href="/" className="nav-logo">
          <img src="/flueu_logo.jpg" alt="Fleue Studio" />
        </a>

        <button
          className="nav-toggle"
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Alternar menú"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'nav-menu--open' : ''}`}>
          <li><a href="#about" onClick={() => setIsOpen(false)}>Sobre Mí</a></li>
          <li><a href="#news" onClick={() => setIsOpen(false)}>Noticias</a></li>
          <li><a href="#creations" onClick={() => setIsOpen(false)}>Creaciones</a></li>
          <li><a href="#shop" onClick={() => setIsOpen(false)}>Tienda</a></li>
          <li><a href="#collections" onClick={() => setIsOpen(false)}>Colecciones</a></li>
        </ul>
      </div>
    </nav>
  );
}
