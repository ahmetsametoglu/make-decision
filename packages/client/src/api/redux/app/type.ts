export enum AppActionType {
  SHOW_NOTIFICATION = '[app]: SHOW_NOTIFICATION',
  SHOW_NOTIFICATION_SUCCESS = '[app]: SHOW_NOTIFICATION_SUCCESS',
  DELETE_NOTIFICATION = '[app]: DELETE_NOTIFICATION',
}

export type NotificationType = 'info' | 'success' | 'error' | 'warning';

export interface INotification {
  id: string;
  type: NotificationType;
  message: string;
  duration?: number;
  title?: string;
}
