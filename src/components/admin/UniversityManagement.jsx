import React, { useState } from 'react';
import { FiEdit2, FiTrash2, FiPlus, FiCheck, FiX } from 'react-icons/fi';

const UniversityManagement = () => {
  const [universities, setUniversities] = useState([
    { id: 1, name: 'Harvard University', domain: 'harvard.edu', theme: '#a51c30', students: 15000, faculty: 1200, status: 'active' },
    { id: 2, name: 'Stanford University', domain: 'stanford.edu', theme: '#8c1515', students: 12000, faculty: 980, status: 'active' },
    { id: 3, name: 'MIT', domain: 'mit.edu', theme: '#a31f34', students: 11000, faculty: 850, status: 'active' },
    { id: 4, name: 'Oxford University', domain: 'ox.ac.uk', theme: '#002147', students: 18000, faculty: 1500, status: 'pending' },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    domain: '',
    theme: '#4f46e5',
    status: 'pending'
  });

  const handleAdd = () => {
    const newUniversity = {
      id: Date.now(),
      ...formData,
      students: 0,
      faculty: 0
    };
    setUniversities([...universities, newUniversity]);
    setShowAddForm(false);
    setFormData({ name: '', domain: '', theme: '#4f46e5', status: 'pending' });
  };

  const handleEdit = (id) => {
    const university = universities.find(u => u.id === id);
    setFormData(university);
    setEditingId(id);
    setShowAddForm(true);
  };

  const handleUpdate = () => {
    setUniversities(universities.map(u => 
      u.id === editingId ? { ...u, ...formData } : u
    ));
    setShowAddForm(false);
    setEditingId(null);
    setFormData({ name: '', domain: '', theme: '#4f46e5', status: 'pending' });
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this university?')) {
      setUniversities(universities.filter(u => u.id !== id));
    }
  };

  const toggleStatus = (id) => {
    setUniversities(universities.map(u =>
      u.id === id ? { ...u, status: u.status === 'active' ? 'inactive' : 'active' } : u
    ));
  };

  return (
    <div className="admin-university">
      <div className="admin-header">
        <h2>🏛️ University Management</h2>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          <FiPlus /> Add University
        </button>
      </div>

      {showAddForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>{editingId ? 'Edit University' : 'Add New University'}</h3>
            <div className="form-group">
              <label className="form-label">University Name</label>
              <input
                type="text"
                className="form-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Email Domain</label>
              <input
                type="text"
                className="form-input"
                value={formData.domain}
                onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Theme Color</label>
              <input
                type="color"
                className="form-input"
                value={formData.theme}
                onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label className="form-label">Status</label>
              <select
                className="form-select"
                value={formData.status}
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <option value="active">Active</option>
                <option value="pending">Pending</option>
                <option value="inactive">Inactive</option>
              </select>
            </div>
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => {
                setShowAddForm(false);
                setEditingId(null);
                setFormData({ name: '', domain: '', theme: '#4f46e5', status: 'pending' });
              }}>Cancel</button>
              <button className="btn btn-primary" onClick={editingId ? handleUpdate : handleAdd}>
                {editingId ? 'Update' : 'Add'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>University</th>
              <th>Domain</th>
              <th>Theme</th>
              <th>Students</th>
              <th>Faculty</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {universities.map((uni) => (
              <tr key={uni.id}>
                <td><strong>{uni.name}</strong></td>
                <td>{uni.domain}</td>
                <td>
                  <div className="theme-preview" style={{ backgroundColor: uni.theme }}></div>
                </td>
                <td>{uni.students.toLocaleString()}</td>
                <td>{uni.faculty.toLocaleString()}</td>
                <td>
                  <button 
                    className={`status-badge status-${uni.status}`}
                    onClick={() => toggleStatus(uni.id)}
                  >
                    {uni.status === 'active' ? <FiCheck /> : <FiX />}
                    {uni.status}
                  </button>
                </td>
                <td>
                  <button className="action-btn edit" onClick={() => handleEdit(uni.id)}>
                    <FiEdit2 />
                  </button>
                  <button className="action-btn delete" onClick={() => handleDelete(uni.id)}>
                    <FiTrash2 />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UniversityManagement;