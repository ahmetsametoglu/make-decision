import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { appReducer } from './app/reducer';
import { appEpics } from './app/epic';
import { authReducer } from './auth/reducer';
import { decisionEpics } from './decision/epic';
import { decisionReducer } from './decision/reducer';

export const rootEpic = combineEpics<any>(...appEpics, ...decisionEpics);

export const rootReducer = combineReducers({
  appState: appReducer,
  authState: authReducer,
  decisionState: decisionReducer,
});
