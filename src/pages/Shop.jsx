import './Shop.css';

const Shop = () => {
  const products = [
    { id: 1, name: "Natural Ruby (Manik)", price: "₹25,000+", desc: "Boosts confidence, vitality, and leadership qualities. Associated with the Sun.", color: "#E0245E" },
    { id: 2, name: "Columbian Emerald (Panna)", price: "₹35,000+", desc: "Improves communication, intellect, and business success. Associated with Mercury.", color: "#10B981" },
    { id: 3, name: "Blue Sapphire (Neelam)", price: "₹40,000+", desc: "Brings rapid success, wealth, and clears life obstacles. Associated with Saturn.", color: "#1D4ED8" },
    { id: 4, name: "Yellow Sapphire (Pukhraj)", price: "₹30,000+", desc: "Attracts prosperity, knowledge, and marital bliss. Associated with Jupiter.", color: "#FBBF24" },
    { id: 5, name: "South Sea Pearl (Moti)", price: "₹15,000+", desc: "Calms the mind, controls anger, and brings emotional balance. Associated with the Moon.", color: "#F3F4F6" },
    { id: 6, name: "Red Coral (Moonga)", price: "₹10,000+", desc: "Provides courage, energy, and real estate success. Associated with Mars.", color: "#DC2626" },
    { id: 7, name: "Hessonite (Gomed)", price: "₹8,000+", desc: "Protects against hidden enemies and helps in litigation. Associated with Rahu.", color: "#B45309" },
    { id: 8, name: "Cat's Eye (Lehsuniya)", price: "₹9,000+", desc: "Enhances intuition and protects from sudden misfortunes. Associated with Ketu.", color: "#4B5563" }
  ];

  return (
    <div className="shop-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Sacred Gemstones</h1>
          <p className="page-subtitle">100% Authentic, Lab-Certified astrological gemstones energized through Vedic rituals</p>
        </div>
      </section>

      {/* Trust Banner */}
      <section className="trust-banner">
        <div className="container trust-container">
          <div className="trust-item">
            <span className="trust-icon">🔬</span>
            <span className="trust-text">Govt. Lab Certified</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">🕉️</span>
            <span className="trust-text">Vedic Prana Pratishtha Done</span>
          </div>
          <div className="trust-item">
            <span className="trust-icon">💍</span>
            <span className="trust-text">Custom Ring Making</span>
          </div>
        </div>
      </section>

      {/* Product Grid */}
      <section className="section bg-light">
        <div className="container">
          <div className="product-grid">
            {products.map(product => (
              <div key={product.id} className="product-card">
                <div 
                  className="product-image-placeholder"
                  style={{ background: `linear-gradient(135deg, ${product.color}88, ${product.color})` }}
                >
                  <span className="stone-shape"></span>
                </div>
                <div className="product-content">
                  <h3 className="product-title">{product.name}</h3>
                  <div className="product-price">Starting from {product.price}</div>
                  <p className="product-desc">{product.desc}</p>
                  <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-full">
                    Contact to Buy
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
