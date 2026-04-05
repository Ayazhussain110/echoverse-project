import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { 
  FaTrophy, 
  FaStar, 
  FaMedal, 
  FaCalendarAlt, 
  FaCheckCircle,
  FaAward,
  FaRocket,
  FaUsers,
  FaChartLine
} from 'react-icons/fa';

const Rewards = () => {
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(true);
  const [rewardsData, setRewardsData] = useState({
    totalPoints: 0,
    rank: 0,
    level: 'Bronze',
    nextLevelPoints: 0,
    achievements: [],
    recentRewards: [],
    leaderboardPosition: 0
  });

  useEffect(() => {
    // Simulate loading
    setTimeout(() => {
      setRewardsData({
        totalPoints: user?.points || 1250,
        rank: 15,
        level: getLevelFromPoints(user?.points || 1250),
        nextLevelPoints: getNextLevelPoints(user?.points || 1250),
        achievements: [
          { id: 1, name: 'First Post', points: 50, icon: '📝', completed: true, date: '2024-03-15' },
          { id: 2, name: 'Social Butterfly', points: 100, icon: '🦋', completed: true, date: '2024-03-20' },
          { id: 3, name: 'Mentorship Seeker', points: 200, icon: '🎓', completed: true, date: '2024-03-25' },
          { id: 4, name: 'Research Enthusiast', points: 150, icon: '🔬', completed: false, progress: 60 },
          { id: 5, name: 'Community Leader', points: 300, icon: '👑', completed: false, progress: 30 },
          { id: 6, name: 'Top Contributor', points: 500, icon: '🏆', completed: false, progress: 45 },
        ],
        recentRewards: [
          { id: 1, name: 'Post of the Week', points: 50, date: '2024-03-28', type: 'bonus' },
          { id: 2, name: 'Helpful Comment', points: 10, date: '2024-03-27', type: 'engagement' },
          { id: 3, name: 'Mentorship Request', points: 20, date: '2024-03-26', type: 'mentorship' },
          { id: 4, name: 'Academic Post', points: 15, date: '2024-03-25', type: 'content' },
        ],
        leaderboardPosition: 42
      });
      setLoading(false);
    }, 1000);
  }, [user]);

  const getLevelFromPoints = (points) => {
    if (points < 500) return 'Bronze';
    if (points < 1500) return 'Silver';
    if (points < 3000) return 'Gold';
    if (points < 5000) return 'Platinum';
    return 'Diamond';
  };

  const getNextLevelPoints = (points) => {
    if (points < 500) return 500;
    if (points < 1500) return 1500;
    if (points < 3000) return 3000;
    if (points < 5000) return 5000;
    return 0;
  };

  const getLevelColor = (level) => {
    switch(level) {
      case 'Bronze': return '#cd7f32';
      case 'Silver': return '#c0c0c0';
      case 'Gold': return '#ffd700';
      case 'Platinum': return '#e5e4e2';
      case 'Diamond': return '#b9f2ff';
      default: return 'var(--primary-600)';
    }
  };

  const getProgressPercentage = () => {
    const previousLevelPoints = getPreviousLevelPoints(rewardsData.totalPoints);
    const currentLevelPoints = rewardsData.totalPoints - previousLevelPoints;
    const levelRange = rewardsData.nextLevelPoints - previousLevelPoints;
    return (currentLevelPoints / levelRange) * 100;
  };

  const getPreviousLevelPoints = (points) => {
    if (points < 500) return 0;
    if (points < 1500) return 500;
    if (points < 3000) return 1500;
    if (points < 5000) return 3000;
    return 5000;
  };

  const getNextLevelName = (currentLevel) => {
    const levels = ['Bronze', 'Silver', 'Gold', 'Platinum', 'Diamond'];
    const currentIndex = levels.indexOf(currentLevel);
    return levels[currentIndex + 1] || 'Max Level';
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Loading your rewards...</p>
      </div>
    );
  }

  return (
    <div className="rewards-container">
      {/* Header Section */}
      <div className="rewards-header">
        <h2>🏆 My Rewards</h2>
        <p>Track your achievements and earn points</p>
      </div>

      {/* Points Card */}
      <div className="points-card">
        <div className="points-header">
          <FaAward className="points-icon" />
          <div>
            <h3>Total Points</h3>
            <p className="points-value">{rewardsData.totalPoints}</p>
          </div>
        </div>
        <div className="rank-info">
          <span>🏅 Rank #{rewardsData.leaderboardPosition}</span>
          <span>⭐ Level: {rewardsData.level}</span>
        </div>
        {rewardsData.nextLevelPoints > 0 && (
          <div className="level-progress">
            <div className="progress-label">
              <span>Progress to {getNextLevelName(rewardsData.level)}</span>
              <span>{rewardsData.totalPoints} / {rewardsData.nextLevelPoints} points</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill" 
                style={{ width: `${getProgressPercentage()}%`, backgroundColor: getLevelColor(rewardsData.level) }}
              ></div>
            </div>
          </div>
        )}
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card">
          <FaChartLine className="stat-icon" />
          <div>
            <h4>Total Posts</h4>
            <p>{user?.postCount || 24}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaStar className="stat-icon" />
          <div>
            <h4>Achievements</h4>
            <p>{rewardsData.achievements.filter(a => a.completed).length}/{rewardsData.achievements.length}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaTrophy className="stat-icon" />
          <div>
            <h4>Global Rank</h4>
            <p>#{rewardsData.leaderboardPosition}</p>
          </div>
        </div>
        <div className="stat-card">
          <FaCalendarAlt className="stat-icon" />
          <div>
            <h4>Active Days</h4>
            <p>{user?.activeDays || 15}</p>
          </div>
        </div>
      </div>

      {/* Achievements Section */}
      <div className="achievements-section">
        <h3>🎯 Achievements</h3>
        <div className="achievements-grid">
          {rewardsData.achievements.map((achievement) => (
            <div key={achievement.id} className={`achievement-card ${achievement.completed ? 'completed' : 'locked'}`}>
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-info">
                <h4>{achievement.name}</h4>
                <p>+{achievement.points} points</p>
                {achievement.completed ? (
                  <span className="completed-badge">
                    <FaCheckCircle /> Completed
                  </span>
                ) : (
                  <div className="progress-info">
                    <div className="small-progress-bar">
                      <div className="small-progress-fill" style={{ width: `${achievement.progress}%` }}></div>
                    </div>
                    <span>{achievement.progress}%</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recent Rewards */}
      <div className="recent-rewards">
        <h3>📋 Recent Rewards</h3>
        <div className="rewards-list">
          {rewardsData.recentRewards.map((reward) => (
            <div key={reward.id} className="reward-item">
              <div className="reward-icon">
                {reward.type === 'bonus' && '🎁'}
                {reward.type === 'engagement' && '💬'}
                {reward.type === 'mentorship' && '👥'}
                {reward.type === 'content' && '📝'}
              </div>
              <div className="reward-info">
                <h4>{reward.name}</h4>
                <p><FaCalendarAlt /> {new Date(reward.date).toLocaleDateString()}</p>
              </div>
              <div className="reward-points">+{reward.points} pts</div>
            </div>
          ))}
        </div>
      </div>

      {/* Internship Rewards Section */}
      <div className="internship-section">
        <h3>💼 Internship Rewards</h3>
        <p className="internship-desc">Top performers get exclusive internship opportunities!</p>
        <div className="internship-card">
          <div className="internship-icon">🚀</div>
          <div className="internship-info">
            <h4>Earn Your Way to Internships</h4>
            <p>Reach 5000 points and rank in Top 10 to unlock internship opportunities with partner companies.</p>
            <div className="internship-requirements">
              <div className="requirement">
                <span>Points Needed:</span>
                <strong>{Math.max(0, 5000 - rewardsData.totalPoints)} more points</strong>
              </div>
              <div className="requirement">
                <span>Rank Needed:</span>
                <strong>Top 10 (Currently #{rewardsData.leaderboardPosition})</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;