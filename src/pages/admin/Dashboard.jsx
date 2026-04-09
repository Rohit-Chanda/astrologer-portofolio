import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import './AdminStyles.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [hofItems, setHofItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('blogs'); // 'blogs', 'hof', or 'shop'
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Posts
      const postSnapshot = await getDocs(collection(db, "posts"));
      const postsArray = postSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      postsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(postsArray);

      // Fetch Hall of Fame Items
      const hofSnapshot = await getDocs(collection(db, "hallOfFameItems"));
      const hofArray = hofSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      hofArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setHofItems(hofArray);

      // Fetch Shop Products
      const productSnapshot = await getDocs(collection(db, "products"));
      const productArray = productSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      productArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setProducts(productArray);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
      }
    }
  };

  const handleDeleteHof = async (id) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      try {
        await deleteDoc(doc(db, "hallOfFameItems", id));
        setHofItems(hofItems.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting item:", error);
      }
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm("Are you sure you want to delete this gemstone?")) {
      try {
        await deleteDoc(doc(db, "products", id));
        setProducts(products.filter(item => item.id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  const handleLogout = () => {
    signOut(auth).then(() => {
      navigate('/admin');
    });
  };

  return (
    <div className="container section">
      <div className="admin-header">
        <h2>Admin Dashboard</h2>
        <div>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', borderBottom: '1px solid #ddd', paddingBottom: '16px', overflowX: 'auto' }}>
        <button 
          onClick={() => setActiveTab('blogs')} 
          className={`btn ${activeTab === 'blogs' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Manage Blogs
        </button>
        <button 
          onClick={() => setActiveTab('hof')} 
          className={`btn ${activeTab === 'hof' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Manage Hall of Fame
        </button>
        <button 
          onClick={() => setActiveTab('shop')} 
          className={`btn ${activeTab === 'shop' ? 'btn-primary' : 'btn-secondary'}`}
        >
          Manage Shop Gemstones
        </button>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : activeTab === 'blogs' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Blog Posts</h3>
            <Link to="/admin/create-post" className="btn btn-primary">Create New Post</Link>
          </div>
          <table className="admin-posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Category</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '24px'}}>No posts found. Create one now!</td>
                </tr>
              ) : (
                posts.map(post => (
                  <tr key={post.id}>
                    <td><strong>{post.title}</strong></td>
                    <td>{post.category}</td>
                    <td>{post.date}</td>
                    <td>
                      <Link to={`/admin/edit-post/${post.id}`} className="admin-action-btn btn-edit">Edit</Link>
                      <button onClick={() => handleDeletePost(post.id)} className="admin-action-btn btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      ) : activeTab === 'hof' ? (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Hall of Fame Items</h3>
            <Link to="/admin/create-hof" className="btn btn-primary">Add New Item</Link>
          </div>
          <table className="admin-posts-table">
            <thead>
              <tr>
                <th>Title</th>
                <th>Type</th>
                <th>URL</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {hofItems.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '24px'}}>No items found. Add one now!</td>
                </tr>
              ) : (
                hofItems.map(item => (
                  <tr key={item.id}>
                    <td><strong>{item.title}</strong></td>
                    <td style={{ textTransform: 'capitalize' }}>{item.type}</td>
                    <td style={{ maxWidth: '200px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      <a href={item.url} target="_blank" rel="noopener noreferrer">{item.url}</a>
                    </td>
                    <td>
                      <Link to={`/admin/edit-hof/${item.id}`} className="admin-action-btn btn-edit">Edit</Link>
                      <button onClick={() => handleDeleteHof(item.id)} className="admin-action-btn btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      ) : (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3>Shop Gemstones</h3>
            <Link to="/admin/create-product" className="btn btn-primary">Add New Gemstone</Link>
          </div>
          <table className="admin-posts-table">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{textAlign: 'center', padding: '24px'}}>No gemstones found. Add one now!</td>
                </tr>
              ) : (
                products.map(item => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    </td>
                    <td><strong>{item.name}</strong></td>
                    <td>{item.price}</td>
                    <td>
                      <Link to={`/admin/edit-product/${item.id}`} className="admin-action-btn btn-edit">Edit</Link>
                      <button onClick={() => handleDeleteProduct(item.id)} className="admin-action-btn btn-delete">Delete</button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Dashboard;
