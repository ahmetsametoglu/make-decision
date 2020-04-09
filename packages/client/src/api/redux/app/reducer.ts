import { INotification, AppActionType } from './type';
import { Reducer } from 'typesafe-actions';
import { AppAction } from './action';

type AppState = {
  notifications: INotification[];
};

const initialState: AppState = {
  notifications: [],
};

export const appReducer: Reducer<AppState, AppAction> = (state = initialState, action): AppState => {
  switch (action.type) {
    case AppActionType.SHOW_NOTIFICATION_SUCCESS:
      return { ...state, notifications: [...state.notifications, action.payload.notification] };

    case AppActionType.DELETE_NOTIFICATION:
      const restNotification = state.notifications.filter(n => n.id !== action.payload.notificationId);
      return { ...state, notifications: restNotification };

    default:
      return state;
  }
};
