import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Public Page Imports
import Home from './pages/Home';
import About from './pages/About';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Shop from './pages/Shop';
import HallOfFame from './pages/HallOfFame';

// Admin Imports
import Login from './pages/admin/Login';
import Dashboard from './pages/admin/Dashboard';
import PostEditor from './pages/admin/PostEditor';
import HofEditor from './pages/admin/HofEditor';
import ProductEditor from './pages/admin/ProductEditor';
import ProtectedRoute from './components/ProtectedRoute';

import './App.css';

function App() {
  return (
    <Router>
      <div className="app-container">
        <Navbar />
        <main className="main-content">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:id" element={<BlogPost />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/hall-of-fame" element={<HallOfFame />} />
            
            {/* Admin Routes */}
            <Route path="/admin" element={<Login />} />
            <Route path="/admin/dashboard" element={
              <ProtectedRoute><Dashboard /></ProtectedRoute>
             } />
            <Route path="/admin/create-post" element={
              <ProtectedRoute><PostEditor /></ProtectedRoute>
            } />
            <Route path="/admin/edit-post/:id" element={
               <ProtectedRoute><PostEditor /></ProtectedRoute>
            } />
            <Route path="/admin/create-hof" element={
              <ProtectedRoute><HofEditor /></ProtectedRoute>
            } />
            <Route path="/admin/edit-hof/:id" element={
               <ProtectedRoute><HofEditor /></ProtectedRoute>
            } />
            <Route path="/admin/create-product" element={
              <ProtectedRoute><ProductEditor /></ProtectedRoute>
            } />
            <Route path="/admin/edit-product/:id" element={
               <ProtectedRoute><ProductEditor /></ProtectedRoute>
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
