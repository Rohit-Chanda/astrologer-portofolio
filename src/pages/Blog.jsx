import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { collection, getDocs, orderBy, query } from 'firebase/firestore';
import { db } from '../firebase';
import './Blog.css';

const Blog = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
        const querySnapshot = await getDocs(q);
        const postsArray = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setPosts(postsArray);
      } catch (error) {
        console.error("Error fetching blog posts (Is Firebase configured?):", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);

  return (
    <div className="blog-page">
      <section className="page-header">
        <div className="container">
          <h1 className="page-title">Celestial Insights</h1>
          <p className="page-subtitle">Wisdom, tips, and astrological updates from Pandit Arjun Shastri</p>
        </div>
      </section>

      <section className="section bg-light">
        <div className="container">
          {loading ? (
            <div style={{textAlign: 'center', padding: '100px 0'}}>
              <h3>Consulting the stars... (Loading)</h3>
            </div>
          ) : posts.length === 0 ? (
            <div style={{textAlign: 'center', padding: '100px 0'}}>
              <h3>No insights published yet.</h3>
              <p>Posts created in the Admin Dashboard will appear here.</p>
            </div>
          ) : (
            <div className="blog-grid">
              {posts.map(post => (
                <article key={post.id} className="blog-card">
                  <Link to={`/blog/${post.id}`} className="blog-image-placeholder" style={{textDecoration: 'none', padding: 0, overflow: 'hidden'}}>
                    {post.imageUrl ? (
                      <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <span style={{fontSize: '3rem'}}>✨</span>
                    )}
                  </Link>
                  <div className="blog-content">
                    <div className="blog-meta">
                      <span className="blog-category">{post.category}</span>
                      <span className="blog-date">{post.date}</span>
                    </div>
                    <Link to={`/blog/${post.id}`} style={{textDecoration: 'none'}}>
                      <h3 className="blog-title">{post.title}</h3>
                    </Link>
                    <p className="blog-excerpt">{post.excerpt}</p>
                    <Link to={`/blog/${post.id}`} className="btn-read-more" style={{textDecoration: 'none'}}>
                      Read More &rarr;
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Blog;
