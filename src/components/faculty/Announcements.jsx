import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSend, FiUsers } from 'react-icons/fi';

const Announcements = () => {
  const [announcements, setAnnouncements] = useState([
    { id: 1, title: 'Midterm Exam Schedule', content: 'Midterm exams will start from April 15th. Please check the schedule.', date: '2024-03-28', audience: 'all', pinned: true },
    { id: 2, title: 'Research Seminar', content: 'Guest lecture on AI Ethics on April 10th at 2 PM.', date: '2024-03-27', audience: 'students', pinned: false },
    { id: 3, title: 'Faculty Meeting', content: 'Monthly faculty meeting on April 5th at 3 PM.', date: '2024-03-26', audience: 'faculty', pinned: false },
  ]);

  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', audience: 'all' });

  const handleSubmit = () => {
    if (editingId) {
      setAnnouncements(announcements.map(a => a.id === editingId ? { ...a, ...formData, date: new Date().toISOString().split('T')[0] } : a));
    } else {
      setAnnouncements([{ id: Date.now(), ...formData, date: new Date().toISOString().split('T')[0], pinned: false }, ...announcements]);
    }
    setShowForm(false);
    setEditingId(null);
    setFormData({ title: '', content: '', audience: 'all' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure?')) {
      setAnnouncements(announcements.filter(a => a.id !== id));
    }
  };

  const handlePin = (id) => {
    setAnnouncements(announcements.map(a => a.id === id ? { ...a, pinned: !a.pinned } : a));
  };

  return (
    <div className="faculty-announcements">
      <div className="faculty-header">
        <h2>📢 Announcements</h2>
        <button className="btn btn-primary" onClick={() => setShowForm(true)}>
          <FiPlus /> Post Announcement
        </button>
      </div>

      {showForm && (
        <div className="faculty-modal">
          <div className="modal-content">
            <h3>{editingId ? 'Edit Announcement' : 'New Announcement'}</h3>
            <div className="form-group">
              <label className="form-label">Title</label>
              <input type="text" className="form-input" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Content</label>
              <textarea className="form-textarea" rows="4" value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Audience</label>
              <select className="form-select" value={formData.audience} onChange={(e) => setFormData({ ...formData, audience: e.target.value })}>
                <option value="all">All Users</option>
                <option value="students">Students Only</option>
                <option value="faculty">Faculty Only</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => { setShowForm(false); setEditingId(null); }}>Cancel</button>
              <button className="btn btn-primary" onClick={handleSubmit}>{editingId ? 'Update' : 'Post'}</button>
            </div>
          </div>
        </div>
      )}

      <div className="announcements-list">
        {announcements.map((announcement) => (
          <div key={announcement.id} className={`announcement-card ${announcement.pinned ? 'pinned' : ''}`}>
            <div className="announcement-header">
              <h3>{announcement.pinned && '📌 '}{announcement.title}</h3>
              <div className="announcement-meta">
                <span><FiUsers /> {announcement.audience}</span>
                <span>{new Date(announcement.date).toLocaleDateString()}</span>
              </div>
            </div>
            <p className="announcement-content">{announcement.content}</p>
            <div className="announcement-actions">
              <button className="action-btn pin" onClick={() => handlePin(announcement.id)}>
                {announcement.pinned ? 'Unpin' : 'Pin'}
              </button>
              <button className="action-btn edit" onClick={() => { setEditingId(announcement.id); setFormData(announcement); setShowForm(true); }}>
                <FiEdit2 />
              </button>
              <button className="action-btn delete" onClick={() => handleDelete(announcement.id)}>
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Announcements;