import { IDecision } from '@shared/models/decision.model';
import Axios from 'axios';
import { Epic, ofType } from 'redux-observable';
import { from, of } from 'rxjs';
import { webSocket } from 'rxjs/webSocket';
import { filter, switchMap, map, catchError, mergeMap, takeUntil, finalize } from 'rxjs/operators';
import { isOfType } from 'typesafe-actions';
import { DecisionAction, DecisionActions, DecisionActionType } from './action';
import { AppActions } from '../app/action';
import { getActionWithNotification } from '@api/helper/notification.helper';
import AppUtil from '@api/util/app.util';
import { AuthUtil } from '@api/util/auth.util';

const socket = webSocket('ws://localhost:3003?token=testToken');

const createDecision: Epic<DecisionAction, any> = actions$ =>
  actions$.pipe(
    filter(isOfType(DecisionActionType.CREATE)),
    switchMap(action => {
      const { decision } = action.payload;
      return from(
        Axios.post<{ decision: IDecision }>('/decision', { decision }),
      ).pipe(
        map(result => {
          const savedDecision = result.data.decision;
          if (!savedDecision) {
            throw Error('Unexpected error: decision not created');
          }

          return DecisionActions.createSuccess(savedDecision);
        }),
        catchError(err => {
          const message =
            (!!err.response.statusText && err.response.statusText) ||
            err.message ||
            'unexpected status: error message not found';

          return getActionWithNotification({
            action: DecisionActions.createError(message),
            notification: {
              message,
              type: 'error',
              title: 'Create Decision',
            },
          });
        }),
      );
    }),
  );

const getDecisionList: Epic<DecisionAction, any> = actions$ =>
  actions$.pipe(
    filter(isOfType(DecisionActionType.GET_LIST)),
    switchMap(() => {
      return from(Axios.get<{ decisionList: IDecision[] }>('/decision')).pipe(
        map(result => {
          const decisionList = result.data.decisionList;
          if (!decisionList) {
            throw Error("Unexpected error: decision list couldn't get");
          }

          return DecisionActions.getListSuccess(decisionList);
        }),
        catchError(err => {
          const message =
            (!!err.response && err.response.statusText) || err.message || 'unexpected status: error message not found';

          return getActionWithNotification({
            action: DecisionActions.getListError(message),
            notification: {
              message,
              type: 'error',
              title: 'Get Decision List',
            },
          });
        }),
      );
    }),
  );

const getDecision: Epic<DecisionAction, any> = actions$ =>
  actions$.pipe(
    filter(isOfType(DecisionActionType.GET)),
    switchMap(action => {
      const { id } = action.payload;

      return from(Axios.get<{ decision: IDecision }>(`/decision/${id}`)).pipe(
        map(result => {
          const { decision } = result.data;
          if (!decision) {
            throw Error("Unexpected error: decision couldn't get");
          }
          return DecisionActions.getSuccess(decision);
        }),
        catchError(err => {
          console.log(err.response);

          const message =
            (!!err.response && err.response.statusText) || err.message || 'unexpected status: error message not found';

          return getActionWithNotification({
            action: DecisionActions.getError(message),
            notification: {
              message,
              type: 'error',
              title: 'Get Decision',
            },
          });
        }),
      );
    }),
  );

const subscribeDecision: Epic<DecisionAction, any> = actions$ =>
  actions$.pipe(
    filter(isOfType(DecisionActionType.SUBSCRIBE)),
    switchMap(async action => {
      const { id: decisionId } = action.payload;
      const deviceId = await AppUtil.getDeviceId();
      const token = await AuthUtil.getAuthenticationInfo().token;
      console.log({ decisionId, deviceId });

      const decisionToken = await (await Axios.post('/token/decision', { decisionId, deviceId, token })).data;
      return { action, token: decisionToken };
    }),
    mergeMap(res => {
      // return AppActions.showNotification('error', 'test');
      // return from(
      return socket
        .multiplex(
          () => ({ type: 'subscribe', token: res.token }),
          () => ({ type: 'unsubscribe', token: res.token }),
          () => true,
        )
        .pipe(
          map(res => {
            console.log(res);
            return AppActions.showNotification('error', 'test');
            // return DecisionActions.getSuccess({});
          }),
          catchError(err => {
            console.log(JSON.stringify(err));
            return of(AppActions.showNotification('error', 'test'));
          }),
          takeUntil(actions$.pipe(ofType(DecisionActionType.UNSUBSCRIBE))),
          finalize(() => {
            console.log('connection disconnect');
          }),
        );
    }),
  );

export const decisionEpics = [createDecision, getDecisionList, getDecision, subscribeDecision];
