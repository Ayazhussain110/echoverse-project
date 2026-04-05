import React, { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import Sidebar from '../common/Sidebar';
import AppointmentManagement from './AppointmentManagement';
import CalendarView from './CalendarView';
import Announcements from './Announcements';
import FacultyProfile from './FacultyProfile';
import Footer from '../common/Footer';

const FacultyDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { user } = useSelector((state) => state.auth);
  
  return (
    <div className="faculty-dashboard">
      <Sidebar role="faculty" isOpen={sidebarOpen} />
      
      <main className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
        <div className="dashboard-header">
          <button 
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '←' : '→'}
          </button>
          <h1 className="dashboard-welcome">Welcome, Prof. {user?.name}</h1>
          <div className="faculty-badge">👨‍🏫 Faculty Dashboard</div>
        </div>
        
        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<AppointmentManagement />} />
            <Route path="/dashboard" element={<AppointmentManagement />} />
            <Route path="/appointments" element={<AppointmentManagement />} />
            <Route path="/calendar" element={<CalendarView />} />
            <Route path="/announcements" element={<Announcements />} />
            <Route path="/profile" element={<FacultyProfile />} />
          </Routes>
        </div>
        
        <Footer />
      </main>
    </div>
  );
};

export default FacultyDashboard;