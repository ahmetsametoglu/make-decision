import { ActionsUnion } from './../../helper/type.helper';
import { action } from 'typesafe-actions';
import { NotificationType } from '@api/models/notification.modal';

export enum AppActionType {
  SHOW_NOTIFICATION = '[app]: SHOW_NOTIFICATION',
  DELETE_NOTIFICATION = '[app]: DELETE_NOTIFICATION',
}

export const AppActions = {
  showNotification: (type: NotificationType, message: string, title?: string, duration?: number) =>
    action(AppActionType.SHOW_NOTIFICATION, { type, message, title, duration }),
  deleteNotification: (notificationId: string) => action(AppActionType.DELETE_NOTIFICATION, { notificationId }),
};

export type AppAction = ActionsUnion<typeof AppActions>;
