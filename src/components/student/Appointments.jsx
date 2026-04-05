import React, { useState } from 'react';
import { FiCalendar, FiClock, FiCheck, FiX } from 'react-icons/fi';

const Appointments = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      facultyName: 'Dr. Ahmed Khan',
      department: 'Computer Science',
      date: '2024-04-01',
      time: '10:00 AM',
      status: 'approved',
      topic: 'Research Guidance'
    },
    {
      id: 2,
      facultyName: 'Prof. Sarah Ali',
      department: 'Electrical Engineering',
      date: '2024-04-03',
      time: '2:00 PM',
      status: 'pending',
      topic: 'Project Discussion'
    },
    {
      id: 3,
      facultyName: 'Dr. Muhammad Hassan',
      department: 'Mathematics',
      date: '2024-03-28',
      time: '11:30 AM',
      status: 'completed',
      topic: 'Thesis Review'
    }
  ]);

  const [showRequestForm, setShowRequestForm] = useState(false);
  const [requestData, setRequestData] = useState({
    faculty: '',
    date: '',
    time: '',
    topic: '',
    message: ''
  });

  const getStatusBadge = (status) => {
    switch(status) {
      case 'approved':
        return <span className="status-badge approved"><FiCheck /> Approved</span>;
      case 'pending':
        return <span className="status-badge pending"><FiClock /> Pending</span>;
      case 'completed':
        return <span className="status-badge completed">✓ Completed</span>;
      case 'declined':
        return <span className="status-badge declined"><FiX /> Declined</span>;
      default:
        return <span className="status-badge">{status}</span>;
    }
  };

  const handleRequestSubmit = (e) => {
    e.preventDefault();
    setAppointments([
      ...appointments,
      {
        id: appointments.length + 1,
        facultyName: requestData.faculty,
        department: 'Computer Science',
        date: requestData.date,
        time: requestData.time,
        status: 'pending',
        topic: requestData.topic
      }
    ]);
    setShowRequestForm(false);
    setRequestData({ faculty: '', date: '', time: '', topic: '', message: '' });
    alert('Appointment request sent successfully!');
  };

  return (
    <div className="appointments-container">
      <div className="appointments-header">
        <h2>My Appointments</h2>
        <button className="btn btn-primary" onClick={() => setShowRequestForm(!showRequestForm)}>
          + Request Appointment
        </button>
      </div>

      {showRequestForm && (
        <div className="request-appointment-form">
          <h3>Request New Appointment</h3>
          <form onSubmit={handleRequestSubmit}>
            <div className="form-group">
              <label className="form-label">Faculty Name</label>
              <input
                type="text"
                className="form-input"
                value={requestData.faculty}
                onChange={(e) => setRequestData({ ...requestData, faculty: e.target.value })}
                required
              />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Date</label>
                <input
                  type="date"
                  className="form-input"
                  value={requestData.date}
                  onChange={(e) => setRequestData({ ...requestData, date: e.target.value })}
                  required
                />
              </div>
              <div className="form-group">
                <label className="form-label">Time</label>
                <input
                  type="time"
                  className="form-input"
                  value={requestData.time}
                  onChange={(e) => setRequestData({ ...requestData, time: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="form-group">
              <label className="form-label">Topic/Subject</label>
              <input
                type="text"
                className="form-input"
                value={requestData.topic}
                onChange={(e) => setRequestData({ ...requestData, topic: e.target.value })}
                required
              />
            </div>
            <div className="form-group">
              <label className="form-label">Message (Optional)</label>
              <textarea
                className="form-textarea"
                rows="3"
                value={requestData.message}
                onChange={(e) => setRequestData({ ...requestData, message: e.target.value })}
              />
            </div>
            <div className="form-actions">
              <button type="button" className="btn btn-secondary" onClick={() => setShowRequestForm(false)}>
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Send Request
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="appointments-list">
        {appointments.map((appointment) => (
          <div key={appointment.id} className="appointment-card">
            <div className="appointment-icon">
              <FiCalendar size={24} />
            </div>
            <div className="appointment-details">
              <h3>{appointment.topic}</h3>
              <p className="faculty">{appointment.facultyName} • {appointment.department}</p>
              <p className="datetime">
                <FiCalendar /> {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
              </p>
            </div>
            <div className="appointment-status">
              {getStatusBadge(appointment.status)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointments;