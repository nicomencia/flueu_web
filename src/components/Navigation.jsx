import { useState } from 'react';
import './Navigation.css';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="navigation">
      <div className="nav-container">
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
          <li><a href="#creations" onClick={() => setIsOpen(false)}>Creaciones</a></li>
          <li><a href="#colecciones" onClick={() => setIsOpen(false)}>Colecciones</a></li>
          <li><a href="#sobre-mi" onClick={() => setIsOpen(false)}>Sobre Mí</a></li>
        </ul>
      </div>
    </nav>
  );
}
