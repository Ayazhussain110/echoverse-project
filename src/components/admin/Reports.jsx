import React, { useState } from 'react';
import { FiDownload, FiCalendar, FiUsers, FiFileText, FiAward } from 'react-icons/fi';

const Reports = () => {
  const [dateRange, setDateRange] = useState('month');
  const [reportType, setReportType] = useState('users');

  const stats = {
    users: { total: 2450, active: 2100, new: 150 },
    posts: { total: 12500, today: 45, week: 320 },
    engagement: { likes: 45600, comments: 8900, shares: 3400 },
    rewards: { totalGiven: 12500, topUser: 'Ahmed Raza', topPoints: 3250 }
  };

  return (
    <div className="admin-reports">
      <div className="admin-header">
        <h2>📊 Analytics & Reports</h2>
        <button className="btn btn-primary">
          <FiDownload /> Export Report
        </button>
      </div>

      <div className="report-filters">
        <select className="filter-select" value={reportType} onChange={(e) => setReportType(e.target.value)}>
          <option value="users">User Report</option>
          <option value="posts">Content Report</option>
          <option value="engagement">Engagement Report</option>
          <option value="rewards">Rewards Report</option>
        </select>
        <select className="filter-select" value={dateRange} onChange={(e) => setDateRange(e.target.value)}>
          <option value="week">Last 7 Days</option>
          <option value="month">Last 30 Days</option>
          <option value="quarter">Last 90 Days</option>
          <option value="year">Last Year</option>
        </select>
      </div>

      <div className="reports-grid">
        <div className="report-card">
          <div className="report-icon"><FiUsers /></div>
          <div className="report-stats">
            <h4>Total Users</h4>
            <p>{stats.users.total}</p>
            <span className="trend up">+{stats.users.new} this month</span>
          </div>
        </div>
        <div className="report-card">
          <div className="report-icon"><FiFileText /></div>
          <div className="report-stats">
            <h4>Total Posts</h4>
            <p>{stats.posts.total}</p>
            <span className="trend up">+{stats.posts.week} this week</span>
          </div>
        </div>
        <div className="report-card">
          <div className="report-icon">❤️</div>
          <div className="report-stats">
            <h4>Total Engagement</h4>
            <p>{stats.engagement.likes.toLocaleString()}</p>
            <span>Likes, Comments & Shares</span>
          </div>
        </div>
        <div className="report-card">
          <div className="report-icon"><FiAward /></div>
          <div className="report-stats">
            <h4>Rewards Given</h4>
            <p>{stats.rewards.totalGiven.toLocaleString()} pts</p>
            <span>Top: {stats.rewards.topUser}</span>
          </div>
        </div>
      </div>

      <div className="chart-container">
        <h3>User Growth</h3>
        <div className="chart-bars">
          {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'].map((month, i) => (
            <div key={month} className="chart-bar">
              <div className="bar" style={{ height: `${(i + 1) * 15}%` }}></div>
              <span>{month}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Reports;