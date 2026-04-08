import { useRef } from 'react';
import './Home.css';
import { Link } from 'react-router-dom';

const Home = () => {
  const sliderRef = useRef(null);

  const scrollLeft = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: -332, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      sliderRef.current.scrollBy({ left: 332, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container hero-content">
          <div className="hero-text">
            <h1 className="hero-title">Discover Your True Path Through Stars</h1>
            <p className="hero-subtitle">Premium astrological consultations with Pandit Arjun Shastri. Unlocking the mysteries of your life, career, and relationships with ancient Vedic wisdom.</p>
            <div className="hero-buttons">
              <a href="#services" className="btn btn-primary">Our Services</a>
              <Link to="/about" className="btn btn-secondary">Know the Astrologer</Link>
            </div>
          </div>
          <div className="hero-image-wrapper">
            <div className="hero-image-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="section bg-light">
        <div className="container">
          <div className="services-header">
            <div className="services-header-text">
              <h2 className="section-title slider-section-title">Celestial Services</h2>
              <p className="section-subtitle slider-section-subtitle">Comprehensive astrological solutions tailored to guide you in every phase of life.</p>
            </div>
            <div className="slider-controls">
              <button className="slider-btn" onClick={scrollLeft} aria-label="Previous">&larr;</button>
              <button className="slider-btn" onClick={scrollRight} aria-label="Next">&rarr;</button>
            </div>
          </div>
          
          <div className="services-slider" ref={sliderRef}>
            {/* Service 1 */}
            <div className="service-card">
              <div className="service-icon">✨</div>
              <h3 className="service-title">Kundli Matching</h3>
              <p className="service-desc">Deep compatibility analysis for couples seeking a blissful married life according to Vedic principles.</p>
            </div>
            {/* Service 2 */}
            <div className="service-card">
              <div className="service-icon">🏠</div>
              <h3 className="service-title">Vastu Consultation</h3>
              <p className="service-desc">Harmonize your living and working spaces to invite prosperity, peace, and positive energy.</p>
            </div>
            {/* Service 3 */}
            <div className="service-card">
              <div className="service-icon">💎</div>
              <h3 className="service-title">Gemstone Advice</h3>
              <p className="service-desc">Authentic gemstone recommendations to strengthen benefic planets and mitigate malefic influences.</p>
            </div>
            {/* Service 4 */}
            <div className="service-card">
              <div className="service-icon">💼</div>
              <h3 className="service-title">Career Guidance</h3>
              <p className="service-desc">Strategic advice on career choices, business ventures, and auspicious timings for maximum success.</p>
            </div>
            {/* Service 5 */}
            <div className="service-card">
              <div className="service-icon">💍</div>
              <h3 className="service-title">Marriage Timing</h3>
              <p className="service-desc">Find the most auspicious muhurat for your wedding to ensure long-lasting happiness.</p>
            </div>
            {/* Service 6 */}
            <div className="service-card">
              <div className="service-icon">👁️</div>
              <h3 className="service-title">Face Reading</h3>
              <p className="service-desc">Ancient physiognomy techniques to reveal hidden personality traits and life path.</p>
            </div>
            {/* Service 7 */}
            <div className="service-card">
              <div className="service-icon">🔢</div>
              <h3 className="service-title">Numerology</h3>
              <p className="service-desc">Understand the impact of numbers on your destiny and align your name for success.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section">
        <div className="container">
          <div className="why-choose-content">
            <div className="why-choose-text">
              <h2 className="section-title" style={{textAlign: 'left'}}>Why Consult Pandit Arjun?</h2>
              <ul className="benefits-list">
                <li>
                  <strong>25+ Years of Experience</strong>
                  <p>Guiding thousands globally with pinpoint accuracy.</p>
                </li>
                <li>
                  <strong>Authentic Vedic Approach</strong>
                  <p>Strictly adhering to classical Parashari principles.</p>
                </li>
                <li>
                  <strong>Complete Confidentiality</strong>
                  <p>Your charts and consultations remain strictly private.</p>
                </li>
              </ul>
            </div>
            <div className="why-choose-img-placeholder"></div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Client Transformations</h2>
          <div className="testimonials-grid">
            <div className="testimonial-card">
              <p className="testimonial-text">"Panditji's reading was incredibly profound. His career advice changed the trajectory of my business entirely."</p>
              <div className="testimonial-author">- Rahul S., Entrepreneur</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"The Kundli matching gave us so much clarity. We took his remedies and our wedding went beautifully."</p>
              <div className="testimonial-author">- Priya & Aman</div>
            </div>
            <div className="testimonial-card">
              <p className="testimonial-text">"I was skeptical at first, but the Vastu changes he recommended brought immediate peace to our home."</p>
              <div className="testimonial-author">- Anita K., Homemaker</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="cta-section">
        <div className="container cta-container">
          <h2>Ready to Unveil Your Destiny?</h2>
          <p>Book a personalized consultation today and take the first step towards a harmonious life.</p>
          <a href="tel:+1234567890" className="btn btn-primary" style={{backgroundColor: 'white', color: 'var(--primary)'}}>Book Your Session</a>
        </div>
      </section>
    </div>
  );
};

export default Home;
