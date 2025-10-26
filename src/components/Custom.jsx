import './Custom.css';

export default function Custom() {
  return (
    <section className="custom" id="custom">
      <div className="container">
        <div className="custom-content">
          <div className="custom-text">
            <h2>Pedidos Personalizados</h2>
            <p>
              ¿Tienes una idea especial en mente? Creo piezas únicas y personalizadas
              adaptadas a tus gustos y necesidades.
            </p>
            <p>
              Cada pieza personalizada es una colaboración entre tu visión y mi artesanía.
              Desde el diseño hasta los detalles finales, trabajaremos juntos para crear
              algo verdaderamente único.
            </p>
            <div className="custom-features">
              <div className="custom-feature">
                <h3>Diseño Único</h3>
                <p>Creado exclusivamente para ti</p>
              </div>
              <div className="custom-feature">
                <h3>Elección de Colores</h3>
                <p>Selecciona tus colores favoritos</p>
              </div>
              <div className="custom-feature">
                <h3>Materiales Sostenibles</h3>
                <p>Plástico reciclado de calidad</p>
              </div>
            </div>
            <button className="custom-cta">Solicitar Pedido Personalizado</button>
          </div>
          <div className="custom-image">
            <img src="/paula.jpg" alt="Proceso de creación personalizada" />
          </div>
        </div>
      </div>
    </section>
  );
}
