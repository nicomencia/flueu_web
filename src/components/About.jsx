import './About.css';

export default function About() {
  return (
    <section id="sobre-mi" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Sobre mí</h2>
            <p>
              Joyería hecha a mano con plástico reciclado.
              Cada pieza es única, inspirada en la naturaleza y creada con consciencia.
            </p>
            <p className="artist-name">Paula Sastre Valverde</p>
          </div>
          <div className="about-image">
            <img src="/paula.jpg" alt="Paula Sastre Valverde" />
          </div>
        </div>
      </div>
    </section>
  );
}
