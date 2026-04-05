import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../../redux/slices/userSlice';
import { toast } from 'react-hot-toast';

const ProfileSetup = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bio: user?.bio || '',
    skills: user?.skills?.join(', ') || '',
    interests: user?.interests?.join(', ') || '',
    enrolledCourses: user?.enrolledCourses?.join(', ') || '',
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await dispatch(updateProfile({
        ...formData,
        skills: formData.skills.split(',').map(s => s.trim()),
        interests: formData.interests.split(',').map(i => i.trim()),
        enrolledCourses: formData.enrolledCourses.split(',').map(c => c.trim()),
      })).unwrap();
      toast.success('Profile updated successfully!');
    } catch (error) {
      toast.error('Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="profile-form">
      <div className="card">
        <div className="card-header">
          <h3>Profile Setup</h3>
          <p>Update your academic profile</p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="card-body">
            <div className="form-group">
              <label className="form-label">Bio</label>
              <textarea className="form-textarea" rows="4"
                placeholder="Tell us about yourself..."
                value={formData.bio} onChange={(e) => setFormData({ ...formData, bio: e.target.value })} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Skills (comma separated)</label>
              <input className="form-input" placeholder="React, Python, Machine Learning"
                value={formData.skills} onChange={(e) => setFormData({ ...formData, skills: e.target.value })} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Interests (comma separated)</label>
              <input className="form-input" placeholder="AI, Web Development, Research"
                value={formData.interests} onChange={(e) => setFormData({ ...formData, interests: e.target.value })} />
            </div>
            
            <div className="form-group">
              <label className="form-label">Enrolled Courses (comma separated)</label>
              <input className="form-input" placeholder="CS101, MATH201"
                value={formData.enrolledCourses} onChange={(e) => setFormData({ ...formData, enrolledCourses: e.target.value })} />
            </div>
          </div>
          <div className="card-footer">
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving...' : 'Save Profile'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileSetup;