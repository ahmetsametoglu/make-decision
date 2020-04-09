import React from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { INotification } from '@api/redux/app/type';
import { AppActions } from '@api/redux/app/action';

type Prop = { notification: INotification };
const Notification = (props: Prop) => {
  const dispatch = useDispatch();
  const { title, message, type } = props.notification;

  const handleClick = () => {
    dispatch(AppActions.deleteNotification(props.notification.id));
  };

  const className = classNames([
    'notification',
    `notification-${type}`,
    'notification-enter',
    'notification-enter-active',
    'filled',
  ]);
  const titleEl = title ? <h4 className="title">{title}</h4> : null;
  return (
    <div className={className} onClick={handleClick}>
      <div className="notification-message" role="alert">
        {titleEl}
        <div className="message">{message}</div>
      </div>
    </div>
  );
};

export default Notification;
