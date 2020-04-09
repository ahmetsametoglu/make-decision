import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import { appReducer } from './app/reducer';
import { authReducer } from './auth/reducer';
import { decisionReducer } from './decision/reducer';

export const rootEpic = combineEpics<any>();

export const rootReducer = combineReducers({
  appState: appReducer,
  authState: authReducer,
  decisionState: decisionReducer,
});
