import { NotificationType } from '../redux/app/type';
import { Observable, concat, of } from 'rxjs';
import { AppActions, AppAction } from '../redux/app/action';
import { AuthAction } from '../redux/auth/action';
import { DecisionAction } from '../redux/decision/action';

export type Action = AppAction | AuthAction | DecisionAction;

export const getActionWithNotification = ({
  action,
  notification,
}: {
  action: Action;
  notification: { type: NotificationType; message: string; title?: string; duration?: number };
}): Observable<Action> => {
  return concat(
    of(action),
    of(AppActions.showNotification(notification.type, notification.message, notification.title, notification.duration)),
  );
};
