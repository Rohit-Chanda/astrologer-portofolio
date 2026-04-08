import './HallOfFame.css';

const HallOfFame = () => {
  return (
    <div className="hof-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Hall of Fame</h1>
          <p className="page-subtitle">A glimpse into Panditji's legacy, awards, and public appearances</p>
        </div>
      </section>

      {/* Video Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Media & TV Appearances</h2>
          <div className="video-grid">
            <div className="video-wrapper">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player placeholder 1" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-wrapper">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player placeholder 2" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="video-wrapper">
              <iframe 
                width="100%" 
                height="315" 
                src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
                title="YouTube video player placeholder 3" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Photo Gallery */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Awards & Honors</h2>
          <div className="gallery-grid">
            {[1, 2, 3, 4, 5, 6].map(num => (
              <div key={`award-${num}`} className="gallery-item">
                <div className="gallery-placeholder">
                  <span>Award Ceremony {num}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Posters Section */}
      <section className="section bg-light">
        <div className="container">
          <h2 className="section-title">Featured Posters</h2>
          <div className="poster-grid">
            {[1, 2].map(num => (
              <div key={`poster-${num}`} className="poster-item">
                <div className="poster-placeholder">
                  <span>Event Poster {num}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HallOfFame;
