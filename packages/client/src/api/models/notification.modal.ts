export type NotificationType = 'info' | 'success' | 'error' | 'warning';
export interface INotification {
  id: string;
  type: NotificationType;
  message: string;
  duration: number;
  title?: string;
}
