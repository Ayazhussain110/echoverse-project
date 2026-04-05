import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, clearError } from '../../redux/slices/authSlice';
import { toast } from 'react-hot-toast';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated, role } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (isAuthenticated && role) {
      toast.success('Login successful!');
      navigate(`/${role}`);
    }
  }, [isAuthenticated, role, navigate]);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      toast.error('Please fill in all fields');
      return;
    }
    dispatch(login(formData));
  };
  
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>Welcome to EchoVerse</h2>
          <p>Sign in to your academic network</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">University Email</label>
            <input
              type="email"
              name="email"
              className="form-input"
              placeholder="student@university.edu"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              type="password"
              name="password"
              className="form-input"
              placeholder="••••••••"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          
          <button type="submit" className="btn btn-primary" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Signing in...' : 'Sign in'}
          </button>
        </form>
        
        <div className="login-footer">
          <p>
            Don't have an account? <Link to="/register">Register here</Link>
          </p>
          <p className="email-note">Use your official university email to register</p>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          background: linear-gradient(to bottom right, #eef2ff, #e0e7ff);
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem 1rem;
        }
        
        .login-card {
          max-width: 28rem;
          width: 100%;
          background: white;
          padding: 2.5rem;
          border-radius: 1rem;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
        }
        
        .login-header {
          text-align: center;
          margin-bottom: 2rem;
        }
        
        .login-header h2 {
          font-size: 1.875rem;
          font-weight: 800;
          color: #111827;
          margin-bottom: 0.5rem;
        }
        
        .login-header p {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .login-footer {
          margin-top: 1.5rem;
          text-align: center;
        }
        
        .login-footer p {
          font-size: 0.875rem;
          color: #6b7280;
        }
        
        .login-footer a {
          color: #4f46e5;
          font-weight: 500;
        }
        
        .login-footer a:hover {
          color: #4338ca;
        }
        
        .email-note {
          margin-top: 1rem;
          font-size: 0.75rem;
          color: #9ca3af;
        }
      `}</style>
    </div>
  );
};

export default Login;