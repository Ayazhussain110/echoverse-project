import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiGift } from 'react-icons/fi';

const RewardManagement = () => {
  const [rewards, setRewards] = useState([
    { id: 1, name: 'Summer Internship', points: 5000, type: 'internship', available: 5, claimed: 2 },
    { id: 2, name: 'Research Grant', points: 3000, type: 'grant', available: 3, claimed: 1 },
    { id: 3, name: 'Certificate of Excellence', points: 1000, type: 'certificate', available: 50, claimed: 12 },
    { id: 4, name: 'Conference Ticket', points: 2000, type: 'ticket', available: 10, claimed: 4 },
  ]);

  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({ name: '', points: '', type: '', available: '' });

  const handleAdd = () => {
    const newReward = { id: Date.now(), ...formData, claimed: 0 };
    setRewards([...rewards, newReward]);
    setShowAddForm(false);
    setFormData({ name: '', points: '', type: '', available: '' });
  };

  return (
    <div className="admin-rewards">
      <div className="admin-header">
        <h2>🎁 Reward Management</h2>
        <button className="btn btn-primary" onClick={() => setShowAddForm(true)}>
          <FiPlus /> Add Reward
        </button>
      </div>

      {showAddForm && (
        <div className="admin-modal">
          <div className="admin-modal-content">
            <h3>Add New Reward</h3>
            <div className="form-group">
              <label className="form-label">Reward Name</label>
              <input type="text" className="form-input" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Points Required</label>
              <input type="number" className="form-input" value={formData.points} onChange={(e) => setFormData({ ...formData, points: e.target.value })} />
            </div>
            <div className="form-group">
              <label className="form-label">Type</label>
              <select className="form-select" value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}>
                <option value="">Select Type</option>
                <option value="internship">Internship</option>
                <option value="grant">Grant</option>
                <option value="certificate">Certificate</option>
                <option value="ticket">Ticket</option>
              </select>
            </div>
            <div className="form-group">
              <label className="form-label">Available Spots</label>
              <input type="number" className="form-input" value={formData.available} onChange={(e) => setFormData({ ...formData, available: e.target.value })} />
            </div>
            <div className="form-actions">
              <button className="btn btn-secondary" onClick={() => setShowAddForm(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={handleAdd}>Add Reward</button>
            </div>
          </div>
        </div>
      )}

      <div className="rewards-grid">
        {rewards.map((reward) => (
          <div key={reward.id} className="reward-card">
            <div className="reward-icon"><FiGift /></div>
            <div className="reward-info">
              <h3>{reward.name}</h3>
              <p className="reward-points">{reward.points.toLocaleString()} points</p>
              <p className="reward-availability">{reward.claimed}/{reward.available} claimed</p>
              <span className="reward-type">{reward.type}</span>
            </div>
            <div className="reward-actions">
              <button className="action-btn edit"><FiEdit2 /></button>
              <button className="action-btn delete"><FiTrash2 /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RewardManagement;