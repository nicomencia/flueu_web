import './About.css';

export default function About() {
  return (
    <section id="sobre-mi" className="about">
      <div className="container">
        <h2>Sobre mí</h2>
        <div className="about-content">
          <div className="about-text">
            <p>Flueu nace de la curiosidad de transformar lo cotidiano en algo algo bello.</p>

            <p>De las botellas olvidadas surge una nueva materia viva para el diseño: el plástico se funde, se mueve, se retuerce en contacto con el fuego y encuentra su nueva forma en piezas únicas creadas a mano con mucho mimo.</p>

            <p>Cada pieza es un diálogo entre fuego y fluidez, entre lo sólido y lo transparente. Como la naturaleza, que crea sin prisa ni patrón, aquí no hay moldes ni repeticiones, solo la intuición del momento y la curiosidad de ver hasta dónde puede llegar.</p>

            <p>La Tierra es nuestra maestra, por lo que las piezas están inspiradas en sus procesos y texturas: en las flores que brotan, el agua que tintinea, las rocas que se transforman y las criaturas que habitan en sus profundidades.</p>

            <p>Flueu es movimiento, fuego y consciencia. Una invitación a mirar la belleza que renace donde nadie la espera.</p>
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
