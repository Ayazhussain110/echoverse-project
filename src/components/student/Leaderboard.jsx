import React, { useState } from 'react';
// import { FiTrophy, FiUsers, FiTrendingUp, FiSearch } from 'react-icons/fi';

const Leaderboard = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const leaderboardData = [
    { rank: 1, name: 'Ahmed Raza', points: 3250, department: 'Computer Science', avatar: 'AR', badge: '🥇' },
    { rank: 2, name: 'Fatima Khan', points: 2980, department: 'Mathematics', avatar: 'FK', badge: '🥈' },
    { rank: 3, name: 'Usman Ali', points: 2750, department: 'Physics', avatar: 'UA', badge: '🥉' },
    { rank: 4, name: 'Sara Ahmed', points: 2450, department: 'Computer Science', avatar: 'SA', badge: '' },
    { rank: 5, name: 'Hassan Rizvi', points: 2200, department: 'Electrical Engineering', avatar: 'HR', badge: '' },
    { rank: 6, name: 'Zainab Malik', points: 1950, department: 'Biology', avatar: 'ZM', badge: '' },
    { rank: 7, name: 'Omar Farooq', points: 1850, department: 'Computer Science', avatar: 'OF', badge: '' },
    { rank: 8, name: 'Ayesha Naeem', points: 1700, department: 'Mathematics', avatar: 'AN', badge: '' },
    { rank: 9, name: 'Bilal Ahmed', points: 1600, department: 'Physics', avatar: 'BA', badge: '' },
    { rank: 10, name: 'Hira Saleem', points: 1500, department: 'Chemistry', avatar: 'HS', badge: '' },
  ];

  const filteredData = leaderboardData.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.department.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-header">
        <h2>🏆 Leaderboard</h2>
        <p>Top performers in the EchoVerse community</p>
      </div>

      <div className="leaderboard-stats">
        <div className="stat-card">
          <FiTrophy className="stat-icon" />
          <div>
            <h4>Total Participants</h4>
            <p>{leaderboardData.length}+</p>
          </div>
        </div>
        <div className="stat-card">
          <FiTrendingUp className="stat-icon" />
          <div>
            <h4>Top Score</h4>
            <p>{leaderboardData[0]?.points} pts</p>
          </div>
        </div>
        <div className="stat-card">
          <FiUsers className="stat-icon" />
          <div>
            <h4>Departments</h4>
            <p>7+</p>
          </div>
        </div>
      </div>

      <div className="leaderboard-controls">
        <div className="search-box">
          <FiSearch className="search-icon" />
          <input
            type="text"
            placeholder="Search by name or department..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <select className="filter-select" value={filter} onChange={(e) => setFilter(e.target.value)}>
          <option value="all">All Departments</option>
          <option value="cs">Computer Science</option>
          <option value="math">Mathematics</option>
          <option value="physics">Physics</option>
        </select>
      </div>

      <div className="leaderboard-table">
        <div className="table-header">
          <div className="rank-col">Rank</div>
          <div className="user-col">User</div>
          <div className="points-col">Points</div>
          <div className="dept-col">Department</div>
        </div>
        {filteredData.map((user) => (
          <div key={user.rank} className="table-row">
            <div className="rank-col">
              {user.badge ? <span className="rank-badge">{user.badge}</span> : <span>#{user.rank}</span>}
            </div>
            <div className="user-col">
              <div className="user-avatar">{user.avatar}</div>
              <span className="user-name">{user.name}</span>
            </div>
            <div className="points-col">{user.points} pts</div>
            <div className="dept-col">{user.department}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Leaderboard;