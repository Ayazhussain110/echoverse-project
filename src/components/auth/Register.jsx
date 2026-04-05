import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, clearError } from '../../redux/slices/authSlice';
import { toast } from 'react-hot-toast';


const Register = () => {
  const [formData, setFormData] = useState({
    name: '', email: '', password: '', confirmPassword: '',
    role: 'student', university: '', department: ''
  });
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);
  
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [error, dispatch]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (!formData.email.endsWith('.edu')) {
      toast.error('Please use your official university email');
      return;
    }
    
    dispatch(register(formData)).then((result) => {
      if (!result.error) {
        toast.success('Registration successful! Please login.');
        navigate('/login');
      }
    });
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>Join EchoVerse</h2>
          <p>Create your academic profile</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-input" name="name" value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">University Email</label>
            <input type="email" className="form-input" name="email" placeholder="name@university.edu.pk"
              value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Role</label>
            <select className="form-select" value={formData.role}
              onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
              <option value="student">Student</option>
              <option value="faculty">Faculty Member</option>
            </select>
          </div>
          
          <div className="form-group">
            <label className="form-label">University</label>
            <input type="text" className="form-input" value={formData.university}
              onChange={(e) => setFormData({ ...formData, university: e.target.value })} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Department</label>
            <input type="text" className="form-input" value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Password</label>
            <input type="password" className="form-input" value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
          </div>
          
          <div className="form-group">
            <label className="form-label">Confirm Password</label>
            <input type="password" className="form-input" value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })} required />
          </div>
          
          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? 'Creating account...' : 'Register'}
          </button>
        </form>
        
        <div className="auth-footer">
          <p>Already have an account? <Link to="/login">Sign in</Link></p>
        </div>
      </div>
    </div>
  );
};

export default Register;  