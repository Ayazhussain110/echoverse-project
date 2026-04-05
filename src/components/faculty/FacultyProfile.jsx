import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { FiUser, FiMail, FiBriefcase, FiBookOpen, FiEdit2, FiSave } from 'react-icons/fi';

const FacultyProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Dr. Sarah Khan',
    email: user?.email || 'sarah.khan@university.edu',
    department: 'Computer Science',
    specialization: 'Artificial Intelligence & Machine Learning',
    position: 'Associate Professor',
    office: 'Room 304, Science Block',
    phone: '+1 (555) 123-4567',
    bio: 'PhD in Computer Science from Stanford University. Research interests include AI, Machine Learning, and Educational Technology. Published over 30 research papers in international journals.',
    researchInterests: ['Machine Learning', 'Deep Learning', 'Computer Vision', 'Educational Technology'],
    courses: ['CS401 - Artificial Intelligence', 'CS402 - Machine Learning', 'CS403 - Deep Learning'],
    officeHours: 'Monday & Wednesday: 2:00 PM - 4:00 PM'
  });

  const handleSave = () => {
    setIsEditing(false);
    alert('Profile updated successfully!');
  };

  return (
    <div className="faculty-profile">
      <div className="faculty-header">
        <h2>👨‍🏫 Faculty Profile</h2>
        <button className="btn btn-primary" onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? <FiSave /> : <FiEdit2 />} {isEditing ? 'Save Changes' : 'Edit Profile'}
        </button>
      </div>

      <div className="profile-container">
        <div className="profile-sidebar">
          <div className="profile-avatar-large">
            {profile.name.charAt(0)}
          </div>
          <h3>{profile.name}</h3>
          <p className="profile-position">{profile.position}</p>
          <p className="profile-department">{profile.department}</p>
          <div className="profile-contact">
            <p><FiMail /> {profile.email}</p>
            <p><FiBriefcase /> Office: {profile.office}</p>
            <p>📞 {profile.phone}</p>
          </div>
        </div>

        <div className="profile-main">
          <div className="profile-section">
            <h3>About Me</h3>
            {isEditing ? (
              <textarea className="form-textarea" rows="4" value={profile.bio} onChange={(e) => setProfile({ ...profile, bio: e.target.value })} />
            ) : (
              <p>{profile.bio}</p>
            )}
          </div>

          <div className="profile-section">
            <h3><FiBookOpen /> Research Interests</h3>
            {isEditing ? (
              <input className="form-input" value={profile.researchInterests.join(', ')} onChange={(e) => setProfile({ ...profile, researchInterests: e.target.value.split(',').map(s => s.trim()) })} />
            ) : (
              <div className="tags">
                {profile.researchInterests.map((interest, i) => <span key={i} className="tag">{interest}</span>)}
              </div>
            )}
          </div>

          <div className="profile-section">
            <h3>📚 Courses Teaching</h3>
            {isEditing ? (
              <input className="form-input" value={profile.courses.join(', ')} onChange={(e) => setProfile({ ...profile, courses: e.target.value.split(',').map(s => s.trim()) })} />
            ) : (
              <ul className="courses-list">
                {profile.courses.map((course, i) => <li key={i}>{course}</li>)}
              </ul>
            )}
          </div>

          <div className="profile-section">
            <h3>🕐 Office Hours</h3>
            {isEditing ? (
              <input className="form-input" value={profile.officeHours} onChange={(e) => setProfile({ ...profile, officeHours: e.target.value })} />
            ) : (
              <p>{profile.officeHours}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FacultyProfile;