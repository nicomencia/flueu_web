import './Tallas.css';

export default function Tallas() {
  return (
    <section id="tallas" className="tallas">
      <div className="container">
        <div className="tallas-content">
          <h2>Tallas</h2>
          <div className="size-info">
            <p>
              Información sobre las tallas de nuestras joyas.
            </p>
          </div>
          <div className="tallas-media">
            <div className="tallas-media-item">
              <video controls>
                <source src="/talla.mp4" type="video/mp4" />
                Tu navegador no soporta el elemento de video.
              </video>
            </div>
            <div className="tallas-media-item">
              <img src="/tallas.png" alt="Guía de tallas" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
