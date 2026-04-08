import { useParams, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';
import './BlogPost.css';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSinglePost = async () => {
      try {
        const docRef = doc(db, "posts", id);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
          setPost(docSnap.data());
        } else {
          console.log("No such document!");
        }
      } catch (error) {
        console.error("Error fetching the post:", error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchSinglePost();
  }, [id]);

  if (loading) {
    return (
      <div className="blog-post-page" style={{textAlign: 'center', padding: '100px 0'}}>
        <div className="container"><h3>Reading the stars...</h3></div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="blog-post-page" style={{textAlign: 'center', padding: '100px 0'}}>
        <div className="container">
          <h3>Post Not Found</h3>
          <Link to="/blog">&larr; Return to Insights</Link>
        </div>
      </div>
    );
  }

  const shareUrl = encodeURIComponent(window.location.href);
  const shareTitle = encodeURIComponent(post.title);

  const shareToFacebook = () => window.open(`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`, '_blank');
  const shareToTwitter = () => window.open(`https://twitter.com/intent/tweet?url=${shareUrl}&text=${shareTitle}`, '_blank');
  const shareToWhatsApp = () => window.open(`https://api.whatsapp.com/send?text=${shareTitle} ${shareUrl}`, '_blank');

  return (
    <div className="blog-post-page">
      <div className="post-header-bg">
        <div className="container">
          <Link to="/blog" className="back-link">&larr; Back to all posts</Link>
          <div className="post-meta-top">
            <span className="post-category">{post.category}</span>
            <span className="post-date">{post.date}</span>
          </div>
          <h1 className="post-title-main">{post.title}</h1>
          <div className="post-author">By {post.author}</div>
        </div>
      </div>

      <div className="container post-container">
        <div className="post-hero-image" style={{ padding: post.imageUrl ? 0 : '', overflow: 'hidden' }}>
          {post.imageUrl ? (
             <img src={post.imageUrl} alt={post.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          ) : (
             <span style={{fontSize: '4rem'}}>🔮</span>
          )}
        </div>
        
        <div className="post-content-body" dangerouslySetInnerHTML={{ __html: post.content }} />

        <div className="post-footer">
          <div className="post-share">
            <p>Share this insight:</p>
            <div className="share-buttons">
              <button onClick={shareToFacebook} className="btn btn-secondary btn-sm">Facebook</button>
              <button onClick={shareToTwitter} className="btn btn-secondary btn-sm">Twitter</button>
              <button onClick={shareToWhatsApp} className="btn btn-secondary btn-sm">WhatsApp</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
