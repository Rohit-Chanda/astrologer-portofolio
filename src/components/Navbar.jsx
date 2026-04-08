import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Blog', path: '/blog' },
    { name: 'Shop', path: '/shop' },
    { name: 'Hall of Fame', path: '/hall-of-fame' }
  ];

  return (
    <header className="navbar-container">
      <nav className="navbar container">
        <Link to="/" className="navbar-logo" onClick={() => setIsOpen(false)}>
          <span className="logo-text">Pandit Arjun Shastri</span>
        </Link>

        {/* Mobile menu button */}
        <button 
          className={`hamburger ${isOpen ? 'active' : ''}`} 
          onClick={toggleMenu}
          aria-label="Toggle Navigation"
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </button>

        {/* Desktop and Mobile Menu */}
        <ul className={`nav-menu ${isOpen ? 'active' : ''}`}>
          {navLinks.map((link) => (
            <li key={link.path} className="nav-item">
              <Link
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            </li>
          ))}
          <li className="nav-item nav-cta-item">
            <a href="tel:+1234567890" className="btn btn-primary nav-cta">Book Now</a>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
