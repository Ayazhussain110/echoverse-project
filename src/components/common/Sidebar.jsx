import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  FiHome, FiUser, FiFileText, FiCalendar, FiBell, 
  FiAward, FiUsers, FiSettings, FiBookOpen, FiTrendingUp 
} from 'react-icons/fi';

const Sidebar = ({ role, isOpen }) => {
  const getMenuItems = () => {
    switch(role) {
      case 'student':
        return [
          { path: '/student/feed', icon: FiHome, label: 'Feed' },
          { path: '/student/profile', icon: FiUser, label: 'Profile' },
          { path: '/student/mentorship', icon: FiUsers, label: 'Mentorship' },
          { path: '/student/appointments', icon: FiCalendar, label: 'Appointments' },
          { path: '/student/notifications', icon: FiBell, label: 'Notifications' },
          { path: '/student/rewards', icon: FiAward, label: 'Rewards' },
          { path: '/student/leaderboard', icon: FiTrendingUp, label: 'Leaderboard' },
        ];
      case 'faculty':
        return [
          { path: '/faculty/dashboard', icon: FiHome, label: 'Dashboard' },
          { path: '/faculty/profile', icon: FiUser, label: 'Profile' },
          { path: '/faculty/appointments', icon: FiCalendar, label: 'Appointments' },
          { path: '/faculty/announcements', icon: FiFileText, label: 'Announcements' },
          { path: '/faculty/notifications', icon: FiBell, label: 'Notifications' },
        ];
      case 'admin':
        return [
          { path: '/admin/dashboard', icon: FiHome, label: 'Dashboard' },
          { path: '/admin/universities', icon: FiBookOpen, label: 'Universities' },
          { path: '/admin/users', icon: FiUsers, label: 'Users' },
          { path: '/admin/content', icon: FiFileText, label: 'Content' },
          { path: '/admin/reports', icon: FiTrendingUp, label: 'Reports' },
          { path: '/admin/rewards', icon: FiAward, label: 'Rewards' },
          { path: '/admin/settings', icon: FiSettings, label: 'Settings' },
        ];
      default:
        return [];
    }
  };

  const menuItems = getMenuItems();

  return (
    <aside className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-header">
        <h1 className={`sidebar-logo ${!isOpen ? 'logo-hidden' : ''}`}>
          EchoVerse
        </h1>
      </div>
      
      <nav className="sidebar-nav">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) => 
              `sidebar-nav-link ${isActive ? 'active' : ''}`
            }
          >
            <item.icon className="sidebar-icon" />
            <span className={`sidebar-label ${!isOpen ? 'label-hidden' : ''}`}>
              {item.label}
            </span>
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;