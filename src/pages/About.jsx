import './About.css';

const About = () => {
  return (
    <div className="about-page">
      {/* Hero Banner */}
      <section className="about-hero">
        <div className="container">
          <h1 className="about-hero-title">About Pandit Arjun Shastri</h1>
          <p className="about-hero-subtitle">A legacy of cosmic wisdom and guidance</p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="section bg-light">
        <div className="container">
          <div className="bio-container">
            <div className="bio-image-wrapper">
              <div className="bio-image-placeholder">
                <span className="placeholder-text">Panditji's Portrait</span>
              </div>
            </div>
            <div className="bio-content">
              <h2 className="bio-heading">Guiding Light Since 1998</h2>
              <p className="bio-text">
                Pandit Arjun Shastri was born into a lineage of revered Vedic scholars in Varanasi. Initiated into the profound sciences of Jyotish at the tender age of 12 by his grandfather, he has dedicated his life to unravelling the cosmic code governing human existence.
              </p>
              <p className="bio-text">
                With a master's degree in Sanskrit and advanced studies in Parashari and Nadi Astrology, Panditji seamlessly blends orthodox Vedic principles with a modern understanding of today's challenges. He is known for his compassionate approach, offering remedies that are both practical and spiritually elevating.
              </p>
              <div className="stats-container">
                <div className="stat-box">
                  <span className="stat-number">25+</span>
                  <span className="stat-label">Years Exp.</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">10k+</span>
                  <span className="stat-label">Consultations</span>
                </div>
                <div className="stat-box">
                  <span className="stat-number">100%</span>
                  <span className="stat-label">Privacy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Journey Timeline */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">The Journey</h2>
          <div className="timeline">
            <div className="timeline-item">
              <div className="timeline-year">1998</div>
              <div className="timeline-content">
                <h3>Began Independent Practice</h3>
                <p>Started his astrological center in New Delhi, providing localized consultations.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2005</div>
              <div className="timeline-content">
                <h3>Gold Medalist</h3>
                <p>Awarded the prestigious Jyotish Ratna for accuracy in mundane astrology predictions.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2012</div>
              <div className="timeline-content">
                <h3>Global Expansion</h3>
                <p>Began offering online consultations, reaching clients across 40+ countries.</p>
              </div>
            </div>
            <div className="timeline-item">
              <div className="timeline-year">2020</div>
              <div className="timeline-content">
                <h3>Founded Vedic Vision Institute</h3>
                <p>Launched an initiative to teach authentic Vedic astrology to modern seekers.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
