import './Custom.css';

const availableFlowers = [
  { id: 1, image: '/eljardin.jpg', alt: 'Flor El Jardín' },
  { id: 2, image: '/laplaya.jpg', alt: 'Flor La Playa' },
  { id: 3, image: '/paula.jpg', alt: 'Flor Paula' },
  { id: 4, image: '/ELJARDIN0001.jpg', alt: 'Flor El Jardín 01' },
  { id: 5, image: '/ELJARDIN0101.jpg', alt: 'Flor El Jardín 02' },
  { id: 6, image: '/ELJARDIN0102.jpg', alt: 'Flor El Jardín 03' },
];

const accessoryTypes = [
  { id: 1, name: 'Pendiente de aro', image: '/eljardin.jpg' },
  { id: 2, name: 'Pendiente que cuelga', image: '/laplaya.jpg' },
  { id: 3, name: 'Pendiente de botón', image: '/paula.jpg' },
  { id: 4, name: 'Anillo', image: '/ELJARDIN0001.jpg' },
  { id: 5, name: 'Pinza de pelo', image: '/ELJARDIN0101.jpg' },
  { id: 6, name: 'Collar', image: '/ELJARDIN0102.jpg' },
];

const plasticColors = [
  { id: 1, name: 'Solán de Cabras (azul)', image: '/eljardin.jpg' },
  { id: 2, name: 'Solán de Cabras (rosa)', image: '/laplaya.jpg' },
  { id: 3, name: 'Aqua', image: '/paula.jpg' },
  { id: 4, name: 'Cortés', image: '/ELJARDIN0001.jpg' },
  { id: 5, name: 'Yemavin', image: '/ELJARDIN0101.jpg' },
  { id: 6, name: 'Carbonell', image: '/ELJARDIN0102.jpg' },
  { id: 7, name: 'Bezoya', image: '/ELJARDIN0201.jpg' },
  { id: 8, name: 'Ursu', image: '/fondo.jpg' },
];

export default function Custom() {
  return (
    <section className="custom" id="custom">
      <div className="container">
        <div className="custom-intro">
          <h2>Custom</h2>
          <p>
            ¿Tienes una idea especial en mente? Creo piezas únicas y personalizadas
            adaptadas a tus gustos y necesidades.
          </p>
          <p>
            Cada pieza personalizada es una colaboración entre tu visión y mi artesanía.
            Desde el diseño hasta los detalles finales, trabajaremos juntos para crear
            algo verdaderamente único.
          </p>
        </div>

        <div className="custom-section">
          <h3>Flores disponibles</h3>
          <div className="custom-flowers-grid">
            {availableFlowers.map(flower => (
              <div key={flower.id} className="custom-flower-item">
                <img src={flower.image} alt={flower.alt} />
              </div>
            ))}
          </div>
        </div>

        <div className="custom-section">
          <h3>Tipo de accesorio</h3>
          <div className="custom-accessory-grid">
            {accessoryTypes.map(accessory => (
              <div key={accessory.id} className="custom-accessory-item">
                <img src={accessory.image} alt={accessory.name} />
                <p>{accessory.name}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="custom-section">
          <h3>Color del plástico</h3>
          <div className="custom-color-grid">
            {plasticColors.map(color => (
              <div key={color.id} className="custom-color-item">
                <img src={color.image} alt={color.name} />
                <p>{color.name}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
