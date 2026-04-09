import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './AdminStyles.css';

const HofEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    type: 'video',
    title: '',
    url: '',
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadItem(id);
    }
  }, [id]);

  const loadItem = async (itemId) => {
    setLoading(true);
    try {
      const itemSnap = await getDoc(doc(db, "hallOfFameItems", itemId));
      if (itemSnap.exists()) {
        const data = itemSnap.data();
        setFormData({
          type: data.type || 'video',
          title: data.title || '',
          url: data.url || ''
        });
      }
    } catch (error) {
      console.error("Error loading item:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // compress it so it fits perfectly in Firestore
        let scaleSize = 1;
        
        if (img.width > MAX_WIDTH) {
          scaleSize = MAX_WIDTH / img.width;
        }
        
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
        // compress to jpeg 0.7 quality to keep size under 1MB Firestore limit
        const base64String = canvas.toDataURL('image/jpeg', 0.7);
        setFormData(prev => ({ ...prev, url: base64String }));
      };
    };
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const itemData = {
        ...formData,
        updatedAt: serverTimestamp()
      };

      if (id) {
        await setDoc(doc(db, "hallOfFameItems", id), itemData, { merge: true });
      } else {
        itemData.createdAt = serverTimestamp();
        await addDoc(collection(db, "hallOfFameItems"), itemData);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error saving item:", error);
      alert("Failed to connect to Firebase. Check your configuration or rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="admin-header">
        <h2>{id ? 'Edit Hall of Fame Item' : 'Add Hall of Fame Item'}</h2>
        <Link to="/admin/dashboard" className="btn btn-secondary">Cancel</Link>
      </div>

      <form onSubmit={handleSave} className="post-editor-form">
        <div style={{display: 'flex', gap: '24px', marginBottom: '24px'}}>
          <div className="form-group" style={{flex: 1}}>
            <label>Item Type</label>
            <select 
              name="type" 
              value={formData.type} 
              onChange={handleInputChange} 
              required
              style={{ width: '100%', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '1rem' }}
            >
              <option value="video">YouTube Video</option>
              <option value="award">Award Image</option>
              <option value="poster">Event Poster</option>
            </select>
          </div>
          <div className="form-group" style={{flex: 2}}>
            <label>Title / Description</label>
            <input 
              type="text" 
              name="title" 
              value={formData.title} 
              onChange={handleInputChange} 
              placeholder={formData.type === 'video' ? 'e.g. Recent TV Appearance on ABP News' : 'e.g. Best Astrologer 2023 Award'}
              required 
            />
          </div>
        </div>

        <div className="form-group" style={{marginBottom: '24px'}}>
          <label>
            {formData.type === 'video' ? 'YouTube Video URL' : 'Upload Image from Computer'}
          </label>
          
          {formData.type === 'video' ? (
            <>
              <input 
                type="url" 
                name="url" 
                value={formData.url} 
                onChange={handleInputChange} 
                placeholder="https://www.youtube.com/watch?v=XXXXXX" 
                required 
              />
              <small style={{display: 'block', marginTop: '8px', color: '#666'}}>
                Hint: Just paste the standard YouTube link from your browser's address bar or the "Share" button.
              </small>
            </>
          ) : (
            <div style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px', background: '#f9f9f9'}}>
              <input 
                type="file" 
                accept="image/*"
                onChange={handleImageUpload} 
                required={!formData.url || !formData.url.startsWith('data:image')}
              />
              {formData.url && formData.url.startsWith('data:image') && (
                <div style={{marginTop: '16px'}}>
                  <p style={{marginBottom: '8px', fontSize: '14px', color: '#666'}}>Image Preview:</p>
                  <img src={formData.url} alt="Preview" style={{maxHeight: '150px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}/>
                </div>
              )}
            </div>
          )}
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Update Item' : 'Save Item')}
        </button>
      </form>
    </div>
  );
};

export default HofEditor;
