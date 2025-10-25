import './About.css';

export default function About() {
  return (
    <section id="about" className="about">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2>Sobre Mí</h2>
            <p>
              Joyería hecha a mano con plástico reciclado.
              Cada pieza es única, inspirada en la naturaleza y creada con consciencia.
            </p>
            <p className="artist-name">Paula Sastre Valverde</p>
          </div>
          <div className="about-image">
            <img src="/AI_project-11.jpg" alt="Paula Sastre Valverde" />
          </div>
        </div>
      </div>
    </section>
  );
}
