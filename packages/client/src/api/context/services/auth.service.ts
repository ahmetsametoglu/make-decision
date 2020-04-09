import { IErrorResponse } from '@shared/models/error-response';
import { Dispatch } from 'react';
import Axios from 'axios';
import { BaseService } from './base.service';
import { AppActions } from '@api/redux/app/action';
import { IUser } from '@shared/models/user.model';
import { AuthActions } from '@api/redux/auth/action';
import { AuthUtil } from '@api/util/auth.util';

export class AuthService extends BaseService {
  constructor(dispatch: Dispatch<any>) {
    super(dispatch);
    console.log('[AuthUtil]: init', dispatch);
  }

  public login(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      if (!username || !password) {
        this.dispatch(AppActions.showNotification('error', 'missing info'));
        reject('missing info');
      }

      try {
        const response = await Axios.post<{ user: IUser; token: string } & IErrorResponse>('/auth/login', {
          username,
          password,
        });

        if (!!response.data.hasError) {
          throw response.data.message;
        }
        const { user, token } = response.data;

        AuthUtil.setToken(token);
        AuthUtil.setUser(user);
        this.dispatch(AuthActions.authenticate(user));
        resolve(user);
      } catch (error) {
        this.dispatch(AppActions.showNotification('error', error.message));
        reject(error.message);
      }
    });
  }

  public register(username: string, password: string) {
    return new Promise(async (resolve, reject) => {
      if (!username || !password) {
        this.dispatch(AppActions.showNotification('warning', 'missing info'));
        reject('missing info');
      }

      try {
        const response = await Axios.post<{ user: IUser; token: string } & IErrorResponse>('/auth/register', {
          username,
          password,
        });

        if (!!response.data.hasError) {
          throw response.data.message;
        }

        const { user, token } = response.data;

        AuthUtil.setToken(token);
        AuthUtil.setUser(user);
        this.dispatch(AppActions.showNotification('info', 'Account created successfully.'));
        this.dispatch(AuthActions.authenticate(user));
        resolve(user);
      } catch (error) {
        this.dispatch(AppActions.showNotification('error', error.message));
        reject(error.message);
      }
    });
  }

  public logout() {
    console.log('AuthService logout...');

    AuthUtil.setToken('');
    AuthUtil.setUser(null);
    this.dispatch(AuthActions.logout());
  }
}
