import { Reducer } from 'typesafe-actions';
import { AppAction, AppActionType } from './action';
import { INotification } from '@api/models/notification.modal';
import { createUUID } from '@api/helper/general.helper';

type AppState = {
  notifications: INotification[];
};

const initialState: AppState = {
  notifications: [],
};

export const appReducer: Reducer<AppState, AppAction> = (state = initialState, action): AppState => {
  switch (action.type) {
    case AppActionType.SHOW_NOTIFICATION: {
      const { duration, type, message, title } = action.payload;
      let notification: INotification = {
        id: createUUID(),
        duration: duration || 3000,
        type: type || 'info',
        message,
        title,
      };

      const notifications = [...state.notifications];
      notifications.push(notification);

      return { ...state, notifications };
    }

    case AppActionType.DELETE_NOTIFICATION: {
      const restNotification = state.notifications.filter(n => n.id !== action.payload.notificationId);
      return { ...state, notifications: restNotification };
    }

    default:
      return state;
  }
};
