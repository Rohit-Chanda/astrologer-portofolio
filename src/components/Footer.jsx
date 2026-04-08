import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer-container">
      <div className="container footer-content">
        <div className="footer-column">
          <h3 className="footer-logo">Pandit Arjun Shastri</h3>
          <p className="footer-desc">
            Guiding you through life's journey with ancient Vedic wisdom. Discover your true path and purpose through authentic astrological consultations.
          </p>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Quick Links</h4>
          <ul className="footer-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/blog">Blog</Link></li>
            <li><Link to="/shop">Shop</Link></li>
            <li><Link to="/hall-of-fame">Hall of Fame</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Services</h4>
          <ul className="footer-links">
            <li><Link to="/#services">Kundli Matching</Link></li>
            <li><Link to="/#services">Vastu Consultation</Link></li>
            <li><Link to="/#services">Career Guidance</Link></li>
            <li><Link to="/shop">Gemstone Recommendation</Link></li>
          </ul>
        </div>

        <div className="footer-column">
          <h4 className="footer-title">Contact</h4>
          <ul className="footer-contact">
            <li>
              <span>📍</span> 123 Celestial Avenue, New Delhi
            </li>
            <li>
              <span>📞</span> +91 98765 43210
            </li>
            <li>
              <span>✉️</span> contact@astrologerarjun.com
            </li>
          </ul>
        </div>
      </div>
      
      <div className="footer-bottom">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Pandit Arjun Shastri. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
