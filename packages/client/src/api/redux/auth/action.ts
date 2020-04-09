import { IUser } from '@shared/models/user.model';
import { ActionsUnion } from '../../helper/type.helper';
import { action } from 'typesafe-actions';

export enum AuthActionType {
  AUTHENTICATE = '[auth]: AUTHENTICATE',
  LOGOUT = '[auth]: LOGOUT',
}

export const AuthActions = {
  authenticate: (user: IUser) => action(AuthActionType.AUTHENTICATE, { user }),
  logout: () => action(AuthActionType.LOGOUT),
};

export type AuthAction = ActionsUnion<typeof AuthActions>;
