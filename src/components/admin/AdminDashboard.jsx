import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../common/Sidebar';
import UniversityManagement from './UniversityManagement';
import UserManagement from './UserManagement';
import ContentModeration from './ContentModeration';
import Reports from './Reports';
import RewardManagement from './RewardManagement';
import Footer from '../common/Footer';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="admin-dashboard">
      <Sidebar role="admin" isOpen={sidebarOpen} />
      
      <main className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="dashboard-header">
          <button 
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
          <h1 className="dashboard-welcome">Admin Dashboard</h1>
          <div className="admin-badge">🔧 Administrator</div>
        </div>
        
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<UniversityManagement />} />
            <Route path="/universities" element={<UniversityManagement />} />
            <Route path="/users" element={<UserManagement />} />
            <Route path="/content" element={<ContentModeration />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/rewards" element={<RewardManagement />} />
          </Routes>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default AdminDashboard;