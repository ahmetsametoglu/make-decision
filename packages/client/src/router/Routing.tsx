import React from 'react';
import { IonReactRouter } from '@ionic/react-router';
import { Switch, Route, Redirect } from 'react-router';
import { IonRouterOutlet } from '@ionic/react';
import LoginPage from '../pages/LoginPage';
import RegisterPage from '../pages/RegiserPage';
import ErrorPage from '../pages/ErrorPage';
import Home from '../pages/Home';
import NewDecisionPage from '../pages/NewDecisionPage';
import AuthRoute from './AuthRoute';
import DecisionDetailPage from '../pages/DecisionDetailPage';
import RedirectWithParams from './RedirectWithParams';
import { accessStore } from '@api/helper/selector.helper';

const Routing = () => {
  const isAuth = !!accessStore(s => s.authState).user;
  console.log('[Routing]');

  return (
    <IonReactRouter>
      <Switch>
        <Redirect path="/" to="/home" exact />
        <Route path="/decision/:id" render={() => <RedirectWithParams to="/decision" />} exact />
        <Route path="/login" component={LoginPage} exact />
        <Route path="/error" component={ErrorPage} exact />
        <IonRouterOutlet>
          <Route path="/register" component={RegisterPage} exact />
          <Route path="/decision/" component={DecisionDetailPage} exact />
          <AuthRoute path="/home" component={Home} isAuth={isAuth} exact />
          <AuthRoute path="/new-decision" component={NewDecisionPage} isAuth={isAuth} exact />
        </IonRouterOutlet>
        <Redirect to="/error" />
      </Switch>
    </IonReactRouter>
  );
};

export default Routing;
