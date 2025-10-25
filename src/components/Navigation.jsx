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
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>

        <ul className={`nav-menu ${isOpen ? 'nav-menu--open' : ''}`}>
          <li><a href="#about" onClick={() => setIsOpen(false)}>About</a></li>
          <li><a href="#news" onClick={() => setIsOpen(false)}>News</a></li>
          <li><a href="#creations" onClick={() => setIsOpen(false)}>Creations</a></li>
          <li><a href="#shop" onClick={() => setIsOpen(false)}>Shop</a></li>
          <li><a href="#collections" onClick={() => setIsOpen(false)}>Collections</a></li>
        </ul>
      </div>
    </nav>
  );
}
