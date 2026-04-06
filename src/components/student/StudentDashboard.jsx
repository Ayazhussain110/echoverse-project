import React, { useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../redux/slices/authSlice';

import Sidebar from '../common/Sidebar';
import Feed from './Feed';
import ProfileSetup from './ProfileSetup';
import MentorshipRequest from './MentorshipRequest';
import Appointments from './Appointments';
import Notifications from './Notifications';
import Rewards from './Rewards';
import Leaderboard from './Leaderboard';

const StudentDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <div className="student-dashboard">

      <Sidebar role="student" isOpen={sidebarOpen} />

      <main className={`dashboard-main ${sidebarOpen ? 'sidebar-open' : 'sidebar-closed'}`}>

        <div className="dashboard-header">
          <button
            className="sidebar-toggle-btn"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            {sidebarOpen ? '←' : '→'}
          </button>

          <h1 className="dashboard-welcome">
            Welcome back, {user?.name}!
          </h1>

          <div className="points-badge">
            🏆 Points: {user?.points || 0}
          </div>
        </div>

        <div className="dashboard-content">
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/feed" element={<Feed />} />
            <Route path="/profile" element={<ProfileSetup />} />
            <Route path="/mentorship" element={<MentorshipRequest />} />
            <Route path="/appointments" element={<Appointments />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/rewards" element={<Rewards />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
          </Routes>
        </div>

      </main>
    </div>
  );
};

export default StudentDashboard;