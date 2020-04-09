import { BaseService } from './base.service';
import { NotificationType } from '@api/models/notification.modal';
import { AppActions } from '@api/redux/app/action';

export class AppService extends BaseService {
  showNotification(type: NotificationType, message: string, title?: string, duration?: number) {
    this.dispatch(AppActions.showNotification(type, message, title, duration));
  }
  hideNotification(id: string) {
    this.dispatch(AppActions.deleteNotification(id));
  }
}
