import { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import './HallOfFame.css';

const HallOfFame = () => {
  const [videos, setVideos] = useState([]);
  const [awards, setAwards] = useState([]);
  const [posters, setPosters] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchItems();
  }, []);

  const fetchItems = async () => {
    try {
      const snapshot = await getDocs(collection(db, "hallOfFameItems"));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      
      // Sort by creation date so newest is first
      items.sort((a, b) => {
        const dateA = a.createdAt ? a.createdAt.toMillis() : 0;
        const dateB = b.createdAt ? b.createdAt.toMillis() : 0;
        return dateB - dateA;
      });

      setVideos(items.filter(item => item.type === 'video'));
      setAwards(items.filter(item => item.type === 'award'));
      setPosters(items.filter(item => item.type === 'poster'));
    } catch (error) {
      console.error("Error fetching hall of fame items:", error);
    } finally {
      setLoading(false);
    }
  };

  const getEmbedUrl = (url) => {
    if (!url) return '';
    if (url.includes('youtube.com/watch?v=')) {
      const videoId = url.split('v=')[1].split('&')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    if (url.includes('youtu.be/')) {
      const videoId = url.split('youtu.be/')[1].split('?')[0];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url;
  };

  return (
    <div className="hof-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Hall of Fame</h1>
          <p className="page-subtitle">A glimpse into Panditji's legacy, awards, and public appearances</p>
        </div>
      </section>

      {loading ? (
        <div className="container section" style={{ textAlign: 'center', minHeight: '50vh' }}>
          <p>Loading...</p>
        </div>
      ) : (
        <>
          {/* Video Section */}
          {videos.length > 0 && (
            <section className="section bg-light">
              <div className="container">
                <h2 className="section-title">Media & TV Appearances</h2>
                <div className="video-grid">
                  {videos.map((video) => (
                    <div key={video.id} className="video-wrapper">
                      {/* Using iframe for YouTube */}
                      <iframe 
                        width="100%" 
                        height="315" 
                        src={getEmbedUrl(video.url)} 
                        title={video.title} 
                        frameBorder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowFullScreen
                      ></iframe>
                      <div style={{ padding: '16px', background: 'white' }}>
                        <p style={{ margin: 0, fontWeight: 'bold' }}>{video.title}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Photo Gallery */}
          {awards.length > 0 && (
            <section className="section">
              <div className="container">
                <h2 className="section-title">Awards & Honors</h2>
                <div className="gallery-grid">
                  {awards.map((award) => (
                    <div key={award.id} className="gallery-item" style={{display: 'flex', flexDirection: 'column'}}>
                      <div 
                        className="gallery-placeholder" 
                        style={{
                          backgroundImage: `url(${award.url})`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center',
                          border: 'none',
                          backgroundColor: '#f1f1f1'
                        }}
                      >
                        <span style={{display: 'none'}}>{award.title}</span>
                      </div>
                      <p style={{marginTop: '12px', textAlign: 'center', fontWeight: '500'}}>{award.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}

          {/* Posters Section */}
          {posters.length > 0 && (
            <section className="section bg-light">
              <div className="container">
                <h2 className="section-title">Featured Posters</h2>
                <div className="poster-grid">
                  {posters.map((poster) => (
                    <div key={poster.id} className="poster-item" style={{display: 'flex', flexDirection: 'column'}}>
                      <div 
                        className="poster-placeholder" 
                        style={{
                          backgroundImage: `url(${poster.url})`, 
                          backgroundSize: 'cover', 
                          backgroundPosition: 'center',
                          border: 'none',
                          backgroundColor: '#f1f1f1'
                        }}
                      >
                        <span style={{display: 'none'}}>{poster.title}</span>
                      </div>
                      <p style={{marginTop: '12px', textAlign: 'center', fontWeight: '500'}}>{poster.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          )}
          
          {!loading && videos.length === 0 && awards.length === 0 && posters.length === 0 && (
            <section className="section">
              <div className="container" style={{ textAlign: 'center', minHeight: '30vh' }}>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>More exciting updates coming soon!</p>
              </div>
            </section>
          )}
        </>
      )}
    </div>
  );
};

export default HallOfFame;
