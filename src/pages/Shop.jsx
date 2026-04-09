import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './Shop.css';

const Shop = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const snapshot = await getDocs(collection(db, "products"));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by creation date
      items.sort((a, b) => {
        const dateA = a.createdAt ? a.createdAt.toMillis() : 0;
        const dateB = b.createdAt ? b.createdAt.toMillis() : 0;
        return dateB - dateA;
      });

      setProducts(items);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setLoading(false);
    }
  };

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
      <section className="section bg-light" style={{ minHeight: '50vh' }}>
        <div className="container">
          {loading ? (
            <p style={{ textAlign: 'center' }}>Loading authentic gemstones...</p>
          ) : products.length === 0 ? (
            <p style={{ textAlign: 'center' }}>More premium gemstones coming soon!</p>
          ) : (
            <div className="product-grid">
              {products.map(product => (
                <div key={product.id} className="product-card">
                  {product.image ? (
                    <div 
                      className="product-image-container"
                      style={{ 
                        height: '250px', 
                        width: '100%',
                        backgroundImage: `url(${product.image})`,
                        backgroundSize: 'contain',
                        backgroundRepeat: 'no-repeat',
                        backgroundPosition: 'center',
                        backgroundColor: '#f8f9fa',
                        borderBottom: '1px solid #eee'
                      }}
                    />
                  ) : (
                    <div 
                      className="product-image-placeholder"
                      style={{ background: `linear-gradient(135deg, #10B98188, #10B981)` }} // fallback
                    >
                      <span className="stone-shape"></span>
                    </div>
                  )}
                  
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
          )}
        </div>
      </section>
    </div>
  );
};

export default Shop;
