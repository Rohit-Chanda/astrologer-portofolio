import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './AdminStyles.css';

const PostEditor = () => {
  const { id } = useParams(); // If id exists, we are editing. Otherwise creating.
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    excerpt: '',
    imageUrl: '',
    date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
    author: 'Pandit Arjun Shastri'
  });
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadPost(id);
    }
  }, [id]);

  const loadPost = async (postId) => {
    setLoading(true);
    try {
      const postSnap = await getDoc(doc(db, "posts", postId));
      if (postSnap.exists()) {
        const data = postSnap.data();
        setFormData({
          title: data.title || '',
          category: data.category || '',
          excerpt: data.excerpt || '',
          imageUrl: data.imageUrl || '',
          date: data.date || '',
          author: data.author || ''
        });
        setContent(data.content || '');
      }
    } catch (error) {
      console.error("Error loading post:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const postData = {
        ...formData,
        content: content,
        updatedAt: serverTimestamp()
      };

      if (id) {
        // Update existing
        await setDoc(doc(db, "posts", id), postData, { merge: true });
      } else {
        // Create new
        postData.createdAt = serverTimestamp();
        await addDoc(collection(db, "posts"), postData);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error saving post:", error);
      alert("Failed to connect to Firebase. Check your configuration or rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="admin-header">
        <h2>{id ? 'Edit Post' : 'Create New Post'}</h2>
        <Link to="/admin/dashboard" className="btn btn-secondary">Cancel</Link>
      </div>

      <form onSubmit={handleSave} className="post-editor-form">
        <div style={{display: 'flex', gap: '24px', marginBottom: '24px'}}>
          <div className="form-group" style={{flex: 2}}>
            <label>Post Title</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              placeholder="e.g. Understanding Saturn Return"
              required 
            />
          </div>
          <div className="form-group" style={{flex: 1}}>
            <label>Category (Tag)</label>
            <input 
              type="text" 
              name="category" 
              value={formData.category} 
              onChange={handleInputChange} 
              placeholder="e.g. Astrology Basics"
              required 
            />
          </div>
        </div>

        <div className="form-group" style={{marginBottom: '24px'}}>
          <label>Short Excerpt (shows on blog grid)</label>
          <input 
            type="text" 
            name="excerpt" 
            value={formData.excerpt} 
            onChange={handleInputChange} 
            placeholder="A brief 1-2 sentence description..."
            required 
          />
        </div>

        <div className="form-group" style={{marginBottom: '24px'}}>
          <label>Featured Image URL (Optional)</label>
          <input 
            type="url" 
            name="imageUrl" 
            value={formData.imageUrl} 
            onChange={handleInputChange} 
            placeholder="https://example.com/image.jpg"
          />
        </div>

        <div className="form-group">
          <label className="quill-label">Full Post Content (HTML supported)</label>
          <textarea 
            value={content} 
            onChange={(e) => setContent(e.target.value)} 
            className="editor-quill"
            style={{ width: '100%', padding: '16px', border: '1px solid #ccc', borderRadius: '4px', fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical' }}
            placeholder="<p>Write your amazing astrological insights here...</p>"
          />
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Processing...' : (id ? 'Update Post' : 'Publish Post')}
        </button>
      </form>
    </div>
  );
};

export default PostEditor;
