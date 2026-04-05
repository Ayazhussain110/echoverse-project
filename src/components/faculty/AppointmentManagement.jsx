import React, { useState } from 'react';
import { FiCheck, FiX, FiClock, FiCalendar, FiUser, FiMessageSquare } from 'react-icons/fi';

const AppointmentManagement = () => {
  const [appointments, setAppointments] = useState([
    { id: 1, studentName: 'Ahmed Raza', studentEmail: 'ahmed@university.edu', date: '2024-04-05', time: '10:00 AM', topic: 'Research Guidance', status: 'pending', message: 'Need help with my thesis research' },
    { id: 2, studentName: 'Fatima Khan', studentEmail: 'fatima@university.edu', date: '2024-04-05', time: '2:00 PM', topic: 'Project Discussion', status: 'pending', message: 'Want to discuss my final year project' },
    { id: 3, studentName: 'Ali Hassan', studentEmail: 'ali@university.edu', date: '2024-04-04', time: '11:00 AM', topic: 'Career Guidance', status: 'approved', message: 'Seeking career advice in AI field' },
    { id: 4, studentName: 'Sara Ahmed', studentEmail: 'sara@university.edu', date: '2024-04-03', time: '3:00 PM', topic: 'Paper Review', status: 'completed', message: 'Need review of my research paper' },
  ]);

  const [availability, setAvailability] = useState([
    { day: 'Monday', slots: ['10:00 AM', '2:00 PM'] },
    { day: 'Tuesday', slots: ['11:00 AM', '3:00 PM'] },
    { day: 'Wednesday', slots: ['9:00 AM', '1:00 PM'] },
    { day: 'Thursday', slots: ['10:00 AM', '2:00 PM'] },
    { day: 'Friday', slots: ['9:00 AM', '11:00 AM'] },
  ]);

  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [selectedDay, setSelectedDay] = useState('');
  const [newSlot, setNewSlot] = useState('');

  const handleApprove = (id) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'approved' } : apt
    ));
    alert('Appointment approved!');
  };

  const handleReject = (id) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'rejected' } : apt
    ));
    alert('Appointment rejected!');
  };

  const handleComplete = (id) => {
    setAppointments(appointments.map(apt =>
      apt.id === id ? { ...apt, status: 'completed' } : apt
    ));
    alert('Appointment marked as completed!');
  };

  const addTimeSlot = () => {
    if (selectedDay && newSlot) {
      setAvailability(availability.map(day =>
        day.day === selectedDay 
          ? { ...day, slots: [...day.slots, newSlot].sort() }
          : day
      ));
      setNewSlot('');
      setShowAvailabilityModal(false);
      alert('Time slot added successfully!');
    }
  };

  const pendingCount = appointments.filter(a => a.status === 'pending').length;
  const todayCount = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length;

  return (
    <div className="faculty-appointments">
      <div className="faculty-header">
        <h2>📅 Appointment Management</h2>
        <button className="btn btn-primary" onClick={() => setShowAvailabilityModal(true)}>
          <FiClock /> Set Availability
        </button>
      </div>

      <div className="faculty-stats">
        <div className="stat-card">
          <h4>Pending Requests</h4>
          <p>{pendingCount}</p>
        </div>
        <div className="stat-card">
          <h4>Today's Appointments</h4>
          <p>{todayCount}</p>
        </div>
        <div className="stat-card">
          <h4>Total This Week</h4>
          <p>{appointments.length}</p>
        </div>
        <div className="stat-card">
          <h4>Completed</h4>
          <p>{appointments.filter(a => a.status === 'completed').length}</p>
        </div>
      </div>

      <div className="appointments-tabs">
        <button className="tab-btn active">All Requests</button>
        <button className="tab-btn">Pending ({pendingCount})</button>
        <button className="tab-btn">Approved</button>
        <button className="tab-btn">Completed</button>
      </div>

      <div className="appointments-list">
        {appointments.map((apt) => (
          <div key={apt.id} className={`appointment-item status-${apt.status}`}>
            <div className="appointment-info">
              <div className="student-info">
                <FiUser className="info-icon" />
                <div>
                  <h4>{apt.studentName}</h4>
                  <p>{apt.studentEmail}</p>
                </div>
              </div>
              <div className="appointment-details">
                <span><FiCalendar /> {new Date(apt.date).toLocaleDateString()}</span>
                <span><FiClock /> {apt.time}</span>
                <span><FiMessageSquare /> {apt.topic}</span>
              </div>
              <p className="student-message">"{apt.message}"</p>
            </div>
            <div className="appointment-actions">
              {apt.status === 'pending' && (
                <>
                  <button className="btn-approve" onClick={() => handleApprove(apt.id)}>
                    <FiCheck /> Approve
                  </button>
                  <button className="btn-reject" onClick={() => handleReject(apt.id)}>
                    <FiX /> Reject
                  </button>
                </>
              )}
              {apt.status === 'approved' && (
                <button className="btn-complete" onClick={() => handleComplete(apt.id)}>
                  ✓ Mark Complete
                </button>
              )}
              <span className={`status-badge status-${apt.status}`}>
                {apt.status}
              </span>
            </div>
          </div>
        ))}
      </div>

      {showAvailabilityModal && (
        <div className="faculty-modal">
          <div className="modal-content">
            <h3>Set Your Availability</h3>
            <div className="availability-list">
              {availability.map((day) => (
                <div key={day.day} className="availability-day">
                  <h4>{day.day}</h4>
                  <div className="time-slots">
                    {day.slots.map((slot, idx) => (
                      <span key={idx} className="time-slot">{slot}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
            <div className="add-slot">
              <select value={selectedDay} onChange={(e) => setSelectedDay(e.target.value)}>
                <option value="">Select Day</option>
                {availability.map(day => <option key={day.day} value={day.day}>{day.day}</option>)}
              </select>
              <input type="time" value={newSlot} onChange={(e) => setNewSlot(e.target.value)} />
              <button className="btn btn-primary" onClick={addTimeSlot}>Add Slot</button>
            </div>
            <button className="btn btn-secondary" onClick={() => setShowAvailabilityModal(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AppointmentManagement;