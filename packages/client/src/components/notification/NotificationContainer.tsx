import './NotificationContainer.scss';
import React from 'react';
import Notification from './Notification';
import { accessStore } from '@api/helper/selector.helper';

const NotificationContainer = () => {
  const { notifications } = accessStore(s => s.appState);

  return (
    <div className="notification-container">
      {notifications.map(n => (
        <Notification key={n.id} notification={n} />
      ))}
    </div>
  );
};

export default NotificationContainer;
