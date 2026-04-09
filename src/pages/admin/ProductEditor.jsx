import { useState, useEffect } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import { doc, getDoc, setDoc, addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../../firebase';
import './AdminStyles.css';

const ProductEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    price: '',
    desc: '',
    url: '' // Will store the base64 image
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id]);

  const loadProduct = async (productId) => {
    setLoading(true);
    try {
      const snap = await getDoc(doc(db, "products", productId));
      if (snap.exists()) {
        const data = snap.data();
        setFormData({
          name: data.name || '',
          price: data.price || '',
          desc: data.desc || '',
          url: data.image || '' // mapping Firestore 'image' field to state 'url' for reuse logic
        });
      }
    } catch (error) {
      console.error("Error loading product:", error);
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
        const MAX_WIDTH = 800;
        let scaleSize = 1;
        
        if (img.width > MAX_WIDTH) {
          scaleSize = MAX_WIDTH / img.width;
        }
        
        canvas.width = img.width * scaleSize;
        canvas.height = img.height * scaleSize;

        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        
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
        name: formData.name,
        price: formData.price,
        desc: formData.desc,
        image: formData.url, // Save back as 'image'
        updatedAt: serverTimestamp()
      };

      if (id) {
        await setDoc(doc(db, "products", id), itemData, { merge: true });
      } else {
        itemData.createdAt = serverTimestamp();
        await addDoc(collection(db, "products"), itemData);
      }
      navigate('/admin/dashboard');
    } catch (error) {
      console.error("Error saving product:", error);
      alert("Failed to connect to Firebase. Check your configuration or rules.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container section">
      <div className="admin-header">
        <h2>{id ? 'Edit Gemstone' : 'Add New Gemstone'}</h2>
        <Link to="/admin/dashboard" className="btn btn-secondary">Cancel</Link>
      </div>

      <form onSubmit={handleSave} className="post-editor-form">
        <div style={{display: 'flex', gap: '24px', marginBottom: '24px'}}>
          <div className="form-group" style={{flex: 2}}>
            <label>Product Name</label>
            <input 
              type="text" 
              name="name" 
              value={formData.name} 
              onChange={handleInputChange} 
              placeholder="e.g. Natural Ruby (Manik)"
              required 
            />
          </div>
          <div className="form-group" style={{flex: 1}}>
            <label>Price</label>
            <input 
              type="text" 
              name="price" 
              value={formData.price} 
              onChange={handleInputChange} 
              placeholder="e.g. ₹25,000+"
              required 
            />
          </div>
        </div>

        <div className="form-group" style={{marginBottom: '24px'}}>
          <label>Short Description / Details</label>
          <input 
            type="text" 
            name="desc" 
            value={formData.desc} 
            onChange={handleInputChange} 
            placeholder="e.g. Boosts confidence, vitality, and leadership qualities. Associated with the Sun."
            required 
          />
        </div>

        <div className="form-group" style={{marginBottom: '24px'}}>
          <label>Gemstone Image</label>
          <div style={{ padding: '20px', border: '2px dashed #ccc', borderRadius: '8px', background: '#f9f9f9'}}>
            <input 
              type="file" 
              accept="image/*"
              onChange={handleImageUpload} 
              required={!formData.url}
            />
            {formData.url && formData.url.startsWith('data:image') && (
              <div style={{marginTop: '16px'}}>
                <p style={{marginBottom: '8px', fontSize: '14px', color: '#666'}}>Image Preview:</p>
                <img src={formData.url} alt="Preview" style={{maxHeight: '150px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)'}}/>
              </div>
            )}
          </div>
        </div>

        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Saving...' : (id ? 'Update Gemstone' : 'Save Gemstone')}
        </button>
      </form>
    </div>
  );
};

export default ProductEditor;
