import React, { useState } from 'react';
import { FiSearch, FiEdit2, FiTrash2, FiUserX, FiUserCheck, FiFilter } from 'react-icons/fi';

const UserManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [users] = useState([
    { id: 1, name: 'Ahmed Raza', email: 'ahmed@university.edu', role: 'student', status: 'active', department: 'Computer Science', joinDate: '2024-01-15', points: 1250 },
    { id: 2, name: 'Dr. Sarah Khan', email: 'sarah@university.edu', role: 'faculty', status: 'active', department: 'Engineering', joinDate: '2023-08-20', points: 0 },
    { id: 3, name: 'Ali Hassan', email: 'ali@university.edu', role: 'student', status: 'suspended', department: 'Mathematics', joinDate: '2024-02-10', points: 450 },
    { id: 4, name: 'Prof. Ahmed Malik', email: 'ahmed.malik@university.edu', role: 'faculty', status: 'active', department: 'Physics', joinDate: '2023-06-05', points: 0 },
    { id: 5, name: 'Fatima Zafar', email: 'fatima@university.edu', role: 'student', status: 'active', department: 'Computer Science', joinDate: '2024-01-20', points: 890 },
  ]);

  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus = filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleBadgeClass = (role) => {
    return role === 'student' ? 'role-student' : 'role-faculty';
  };

  const getStatusBadgeClass = (status) => {
    return status === 'active' ? 'status-active' : 'status-suspended';
  };

  return (
    <div className="admin-users">
      <div className="admin-header">
        <h2>👥 User Management</h2>
      </div>

      <div className="admin-filters">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search users..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <select className="filter-select" value={filterRole} onChange={(e) => setFilterRole(e.target.value)}>
          <option value="all">All Roles</option>
          <option value="student">Students</option>
          <option value="faculty">Faculty</option>
        </select>
        
        <select className="filter-select" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="suspended">Suspended</option>
        </select>
      </div>

      <div className="admin-stats-cards">
        <div className="stat-card">
          <h4>Total Users</h4>
          <p>{users.length}</p>
        </div>
        <div className="stat-card">
          <h4>Students</h4>
          <p>{users.filter(u => u.role === 'student').length}</p>
        </div>
        <div className="stat-card">
          <h4>Faculty</h4>
          <p>{users.filter(u => u.role === 'faculty').length}</p>
        </div>
        <div className="stat-card">
          <h4>Active</h4>
          <p>{users.filter(u => u.status === 'active').length}</p>
        </div>
      </div>

      <div className="admin-table-container">
        <table className="admin-table">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Role</th>
              <th>Department</th>
              <th>Join Date</th>
              <th>Points</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user.id}>
                <td>
                  <div className="user-cell">
                    <div className="user-avatar">{user.name.charAt(0)}</div>
                    <strong>{user.name}</strong>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <span className={`role-badge ${getRoleBadgeClass(user.role)}`}>
                    {user.role}
                  </span>
                </td>
                <td>{user.department}</td>
                <td>{new Date(user.joinDate).toLocaleDateString()}</td>
                <td>{user.role === 'student' ? user.points : '-'}</td>
                <td>
                  <span className={`status-badge ${getStatusBadgeClass(user.status)}`}>
                    {user.status === 'active' ? <FiUserCheck /> : <FiUserX />}
                    {user.status}
                  </span>
                </td>
                <td>
                  <button className="action-btn edit">
                    <FiEdit2 />
                  </button>
                  <button className="action-btn delete">
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

export default UserManagement;