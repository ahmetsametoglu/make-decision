import { createStore, applyMiddleware } from 'redux';
import { createEpicMiddleware } from 'redux-observable';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer, rootEpic } from './combine';

export const configureStore = (initialState?: any) => {
  const epicMiddleware = createEpicMiddleware();
  const store = createStore(
    rootReducer,
    initialState || {},
    composeWithDevTools(applyMiddleware(thunk, epicMiddleware)),
  );

  epicMiddleware.run(rootEpic);

  return store;
};

export type RootStoreType = ReturnType<typeof rootReducer>;
