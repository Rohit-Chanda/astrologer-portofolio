import { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import './AdminStyles.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Login successful, route to dashboard
      navigate('/admin/dashboard');
    } catch (err) {
      setError("Failed to sign in. Please check your credentials or Firebase configuration.");
      console.error(err);
    }
  };

  return (
    <div className="admin-login-wrapper">
      <div className="admin-login-card">
        <h2 className="admin-login-title">Secure Admin Portal</h2>
        <p className="admin-login-subtitle">Pandit Arjun Shastri Dashboard</p>
        
        {error && <div className="admin-login-error">{error}</div>}

        <form onSubmit={handleLogin} className="admin-login-form">
          <div className="form-group">
            <label>Provider Email</label>
            <input 
              type="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="admin@astrologerarjun.com"
              required 
            />
          </div>
          <div className="form-group">
            <label>Master Password</label>
            <input 
              type="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required 
            />
          </div>
          <button type="submit" className="btn btn-primary login-btn">Authenticate Session</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
