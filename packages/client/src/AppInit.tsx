import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { IonApp } from '@ionic/react';
import NotificationContainer from './components/notification/NotificationContainer';
import Routing from './router/Routing';
import HttpUtil from '@api/util/http.util';
import AppUtil from '@api/util/app.util';
import { AuthActions } from '@api/redux/auth/action';
import { DecisionActions } from '@api/redux/decision/action';

const AppInit = () => {
  console.log('[AppInit]');
  const dispatch = useDispatch();
  const logout = () => dispatch(AuthActions.logout());

  useEffect(() => {
    console.log('[AppInit]: useEffect init');
    AppUtil.initializeApp(logout);
    HttpUtil.startLogging();
    dispatch(DecisionActions.getList());

    return () => {
      console.log('[AppInit]: useEffect destroy');
    };
    //eslint-disable-next-line
  }, []);

  return (
    <IonApp>
      <NotificationContainer />
      <Routing />
    </IonApp>
  );
};

export default AppInit;
