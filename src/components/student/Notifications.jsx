import React, { useState } from 'react';
import { FiBell, FiMessageCircle, FiCalendar, FiAward, FiCheck, FiTrash2 } from 'react-icons/fi';

const Notifications = () => {
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: 'appointment',
      title: 'Appointment Approved',
      message: 'Your appointment with Dr. Ahmed Khan has been approved for April 1, 2024 at 10:00 AM.',
      date: '2024-03-30T10:00:00',
      read: false
    },
    {
      id: 2,
      type: 'comment',
      title: 'New Comment on Your Post',
      message: 'Sarah commented on your research post: "Great work! Can you share more details?"',
      date: '2024-03-29T15:30:00',
      read: false
    },
    {
      id: 3,
      type: 'reward',
      title: 'New Achievement Unlocked!',
      message: 'You earned the "Social Butterfly" achievement for engaging with 10 posts!',
      date: '2024-03-28T09:15:00',
      read: true
    },
    {
      id: 4,
      type: 'like',
      title: 'Someone Liked Your Post',
      message: 'Dr. Muhammad Hassan liked your project post.',
      date: '2024-03-27T14:20:00',
      read: true
    }
  ]);

  const getNotificationIcon = (type) => {
    switch(type) {
      case 'appointment':
        return <FiCalendar className="icon appointment" />;
      case 'comment':
        return <FiMessageCircle className="icon comment" />;
      case 'reward':
        return <FiAward className="icon reward" />;
      case 'like':
        return <FiBell className="icon like" />;
      default:
        return <FiBell className="icon" />;
    }
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(notif =>
      notif.id === id ? { ...notif, read: true } : notif
    ));
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notif => notif.id !== id));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(notif => ({ ...notif, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-container">
      <div className="notifications-header">
        <div>
          <h2>Notifications</h2>
          <p>Stay updated with your activity</p>
        </div>
        {unreadCount > 0 && (
          <button className="btn btn-secondary" onClick={markAllAsRead}>
            Mark All as Read
          </button>
        )}
      </div>

      {unreadCount > 0 && (
        <div className="unread-badge">
          You have {unreadCount} unread notification{unreadCount !== 1 ? 's' : ''}
        </div>
      )}

      <div className="notifications-list">
        {notifications.length === 0 ? (
          <div className="empty-state">
            <FiBell size={48} />
            <p>No notifications yet</p>
          </div>
        ) : (
          notifications.map((notification) => (
            <div 
              key={notification.id} 
              className={`notification-card ${!notification.read ? 'unread' : ''}`}
            >
              <div className="notification-icon">
                {getNotificationIcon(notification.type)}
              </div>
              <div className="notification-content">
                <div className="notification-header">
                  <h3>{notification.title}</h3>
                  <span className="notification-date">
                    {new Date(notification.date).toLocaleDateString()} at {' '}
                    {new Date(notification.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
                <p>{notification.message}</p>
              </div>
              <div className="notification-actions">
                {!notification.read && (
                  <button 
                    className="action-btn read-btn" 
                    onClick={() => markAsRead(notification.id)}
                    title="Mark as read"
                  >
                    <FiCheck />
                  </button>
                )}
                <button 
                  className="action-btn delete-btn" 
                  onClick={() => deleteNotification(notification.id)}
                  title="Delete"
                >
                  <FiTrash2 />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Notifications;