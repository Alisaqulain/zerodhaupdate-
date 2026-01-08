import React, { useState, useEffect } from 'react';
import { Notifications as NotificationsIcon, Close } from '@mui/icons-material';
import './Notifications.css';

const NotificationSystem = () => {
  const [notifications, setNotifications] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Simulate stock movement notifications
    const interval = setInterval(() => {
      const stocks = ['INFY', 'TCS', 'RELIANCE', 'HDFCBANK', 'WIPRO'];
      const randomStock = stocks[Math.floor(Math.random() * stocks.length)];
      const change = (Math.random() * 4 - 2).toFixed(2); // -2% to +2%
      const isPositive = parseFloat(change) > 0;

      if (Math.abs(parseFloat(change)) > 1) { // Only notify significant changes
        const notification = {
          id: Date.now(),
          type: isPositive ? 'success' : 'warning',
          title: `${randomStock} Price Alert`,
          message: `${randomStock} has moved ${isPositive ? 'up' : 'down'} by ${Math.abs(change)}%`,
          timestamp: new Date(),
          read: false
        };

        setNotifications(prev => [notification, ...prev].slice(0, 10)); // Keep last 10

        // Show browser notification if permission granted
        if ('Notification' in window && Notification.permission === 'granted') {
          new Notification(notification.title, {
            body: notification.message,
            icon: '/logo.png'
          });
        }
      }
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  const markAsRead = (id) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const removeNotification = (id) => {
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div className="notifications-container">
      <button
        className="notifications-toggle"
        onClick={() => setIsOpen(!isOpen)}
        title="Notifications"
      >
        <NotificationsIcon />
        {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
      </button>

      {isOpen && (
        <div className="notifications-dropdown">
          <div className="notifications-header">
            <h3>Notifications</h3>
            <button onClick={() => setIsOpen(false)} className="close-btn">
              <Close />
            </button>
          </div>

          <div className="notifications-list">
            {notifications.length === 0 ? (
              <div className="no-notifications">No notifications</div>
            ) : (
              notifications.map(notification => (
                <div
                  key={notification.id}
                  className={`notification-item ${notification.type} ${notification.read ? 'read' : 'unread'}`}
                  onClick={() => markAsRead(notification.id)}
                >
                  <div className="notification-content">
                    <h4>{notification.title}</h4>
                    <p>{notification.message}</p>
                    <span className="notification-time">
                      {notification.timestamp.toLocaleTimeString()}
                    </span>
                  </div>
                  <button
                    className="remove-btn"
                    onClick={(e) => {
                      e.stopPropagation();
                      removeNotification(notification.id);
                    }}
                  >
                    <Close />
                  </button>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <button
              className="clear-all-btn"
              onClick={() => setNotifications([])}
            >
              Clear All
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default NotificationSystem;


