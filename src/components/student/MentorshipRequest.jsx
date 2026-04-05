import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { toast } from 'react-hot-toast';
import { FiSearch, FiUser, FiSend, FiClock, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const MentorshipRequest = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState(null);
  const [requestMessage, setRequestMessage] = useState('');
  const [myRequests, setMyRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [facultyList] = useState([
    { 
      id: 1, 
      name: 'Dr. Ahmed Khan', 
      department: 'Computer Science', 
      specialization: 'AI & Machine Learning', 
      available: true,
      rating: 4.8,
      students: 45,
      image: null
    },
    { 
      id: 2, 
      name: 'Prof. Sarah Ali', 
      department: 'Electrical Engineering', 
      specialization: 'Robotics', 
      available: true,
      rating: 4.9,
      students: 38,
      image: null
    },
    { 
      id: 3, 
      name: 'Dr. Muhammad Hassan', 
      department: 'Mathematics', 
      specialization: 'Data Science', 
      available: false,
      rating: 4.7,
      students: 52,
      image: null
    },
    { 
      id: 4, 
      name: 'Prof. Fatima Zafar', 
      department: 'Physics', 
      specialization: 'Quantum Mechanics', 
      available: true,
      rating: 4.9,
      students: 41,
      image: null
    },
    { 
      id: 5, 
      name: 'Dr. Usman Riaz', 
      department: 'Computer Science', 
      specialization: 'Cybersecurity', 
      available: true,
      rating: 4.8,
      students: 35,
      image: null
    },
    { 
      id: 6, 
      name: 'Prof. Ayesha Siddiqui', 
      department: 'Biology', 
      specialization: 'Genetics', 
      available: false,
      rating: 4.6,
      students: 28,
      image: null
    }
  ]);

  // Load existing mentorship requests on component mount
  useEffect(() => {
    loadMyRequests();
  }, []);

  const loadMyRequests = () => {
    // Simulate loading existing requests from API
    const savedRequests = localStorage.getItem('mentorshipRequests');
    if (savedRequests) {
      setMyRequests(JSON.parse(savedRequests));
    }
  };

  const saveRequests = (requests) => {
    localStorage.setItem('mentorshipRequests', JSON.stringify(requests));
    setMyRequests(requests);
  };

  const filteredFaculty = facultyList.filter(faculty =>
    faculty.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    faculty.specialization.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendRequest = () => {
    if (!selectedFaculty) {
      toast.error('Please select a faculty member');
      return;
    }
    if (!requestMessage.trim()) {
      toast.error('Please enter a message');
      return;
    }

    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const newRequest = {
        id: Date.now(),
        facultyId: selectedFaculty.id,
        facultyName: selectedFaculty.name,
        department: selectedFaculty.department,
        specialization: selectedFaculty.specialization,
        message: requestMessage,
        status: 'pending',
        date: new Date().toISOString(),
        studentName: user?.name || 'Student',
        studentEmail: user?.email || ''
      };

      const updatedRequests = [newRequest, ...myRequests];
      saveRequests(updatedRequests);
      
      toast.success(`Mentorship request sent to ${selectedFaculty.name}`);
      setSelectedFaculty(null);
      setRequestMessage('');
      setLoading(false);
    }, 1000);
  };

  const getStatusBadge = (status) => {
    switch(status) {
      case 'pending':
        return <span className="request-status pending"><FiClock /> Pending</span>;
      case 'approved':
        return <span className="request-status approved"><FiCheckCircle /> Approved</span>;
      case 'rejected':
        return <span className="request-status rejected"><FiXCircle /> Rejected</span>;
      default:
        return <span className="request-status">{status}</span>;
    }
  };

  return (
    <div className="mentorship-container">
      {/* Header */}
      <div className="mentorship-header">
        <div>
          <h2>🎓 Find a Mentor</h2>
          <p>Connect with faculty members who can guide your academic journey</p>
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="mentorship-layout">
        {/* Left Column - Faculty List */}
        <div className="faculty-section">
          <div className="search-section">
            <div className="search-box">
              <FiSearch className="search-icon" />
              <input
                type="text"
                placeholder="Search by name, department or specialization..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div className="faculty-grid">
            {filteredFaculty.length === 0 ? (
              <div className="no-results">
                <p>No faculty members found matching your search.</p>
              </div>
            ) : (
              filteredFaculty.map((faculty) => (
                <div 
                  key={faculty.id} 
                  className={`faculty-card ${selectedFaculty?.id === faculty.id ? 'selected' : ''} ${!faculty.available ? 'unavailable' : ''}`}
                  onClick={() => faculty.available && setSelectedFaculty(faculty)}
                >
                  <div className="faculty-avatar">
                    {faculty.image ? (
                      <img src={faculty.image} alt={faculty.name} />
                    ) : (
                      <div className="avatar-placeholder">
                        {faculty.name.split(' ').map(n => n[0]).join('')}
                      </div>
                    )}
                  </div>
                  <div className="faculty-info">
                    <h3>{faculty.name}</h3>
                    <p className="department">{faculty.department}</p>
                    <p className="specialization">{faculty.specialization}</p>
                    <div className="faculty-stats">
                      <span className="rating">⭐ {faculty.rating}</span>
                      <span className="students">👥 {faculty.students} students</span>
                    </div>
                    <span className={`availability ${faculty.available ? 'available' : 'unavailable'}`}>
                      {faculty.available ? '✓ Available for mentorship' : '✗ Currently unavailable'}
                    </span>
                  </div>
                  {!faculty.available && (
                    <div className="unavailable-overlay">
                      <span>Not Available</span>
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Right Column - Request Form & My Requests */}
        <div className="requests-section">
          {/* Request Form */}
          {selectedFaculty && (
            <div className="request-form">
              <h3>Send Request to {selectedFaculty.name}</h3>
              <div className="selected-faculty-info">
                <p><strong>Department:</strong> {selectedFaculty.department}</p>
                <p><strong>Specialization:</strong> {selectedFaculty.specialization}</p>
              </div>
              <textarea
                placeholder="Write a message explaining why you'd like mentorship from this faculty member..."
                value={requestMessage}
                onChange={(e) => setRequestMessage(e.target.value)}
                rows="5"
              />
              <div className="form-actions">
                <button 
                  className="btn btn-secondary" 
                  onClick={() => setSelectedFaculty(null)}
                >
                  Cancel
                </button>
                <button 
                  onClick={handleSendRequest} 
                  className="btn btn-primary"
                  disabled={loading}
                >
                  <FiSend /> {loading ? 'Sending...' : 'Send Request'}
                </button>
              </div>
            </div>
          )}

          {/* My Requests Section */}
          <div className="my-requests">
            <h3>📋 My Mentorship Requests</h3>
            {myRequests.length === 0 ? (
              <div className="no-requests">
                <p>You haven't sent any mentorship requests yet.</p>
                <p>Select a faculty member above to get started!</p>
              </div>
            ) : (
              <div className="requests-list">
                {myRequests.map((request) => (
                  <div key={request.id} className="request-card">
                    <div className="request-header">
                      <h4>{request.facultyName}</h4>
                      {getStatusBadge(request.status)}
                    </div>
                    <p className="request-details">
                      {request.department} • {request.specialization}
                    </p>
                    <p className="request-message">{request.message}</p>
                    <p className="request-date">
                      Sent on {new Date(request.date).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tips Section */}
      <div className="mentorship-tips">
        <h3>💡 Tips for a Successful Mentorship Request</h3>
        <ul>
          <li>Introduce yourself and your academic background</li>
          <li>Clearly state what you hope to learn or achieve</li>
          <li>Be specific about the areas where you need guidance</li>
          <li>Show enthusiasm and respect for the faculty member's expertise</li>
          <li>Propose a tentative schedule or preferred mode of communication</li>
        </ul>
      </div>
    </div>
  );
};

export default MentorshipRequest;