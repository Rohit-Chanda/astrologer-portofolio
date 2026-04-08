import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { auth, db } from '../../firebase';
import { signOut } from 'firebase/auth';
import './AdminStyles.css';

const Dashboard = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "posts"));
      const postsArray = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      // Sort by date manually for now
      postsArray.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
      setPosts(postsArray);
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await deleteDoc(doc(db, "posts", id));
        setPosts(posts.filter(post => post.id !== id));
      } catch (error) {
        console.error("Error deleting post:", error);
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
          <Link to="/admin/create-post" className="btn btn-primary" style={{marginRight: '12px'}}>Create New Post</Link>
          <button onClick={handleLogout} className="btn btn-secondary">Logout</button>
        </div>
      </div>

      {loading ? (
        <p>Loading posts...</p>
      ) : (
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
                    <button onClick={() => handleDelete(post.id)} className="admin-action-btn btn-delete">Delete</button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
