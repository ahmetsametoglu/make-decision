import { Epic } from 'redux-observable';
import { timer } from 'rxjs';
import { filter, delayWhen, map } from 'rxjs/operators';
import { AppAction, AppActions } from './action';
import { isOfType } from 'typesafe-actions';
import { AppActionType, INotification } from './type';
import { createUUID } from '../../helper/general.helper';

const showNotification: Epic<AppAction> = actions$ =>
  actions$.pipe(
    filter(isOfType(AppActionType.SHOW_NOTIFICATION)),
    map(action => {
      let notification: INotification = {
        duration: 3000,
        type: 'info',
        ...action.payload,
        id: createUUID(),
      };

      return AppActions.showNotificationSuccess(notification);
    }),
  );

const showNotificationSuccess: Epic<AppAction> = actions$ =>
  actions$.pipe(
    filter(isOfType(AppActionType.SHOW_NOTIFICATION_SUCCESS)),
    delayWhen(action => timer(action.payload.notification.duration || 3000)),
    map(action => {
      return AppActions.deleteNotification(action.payload.notification.id!);
    }),
  );

export const appEpics = [showNotification, showNotificationSuccess];
