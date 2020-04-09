import { Reducer } from 'typesafe-actions';
import { AuthUtil } from '@api/util/auth.util';
import { IUser } from '@shared/models/user.model';
import { AuthActionType, AuthAction } from './action';

export type AuthStateType = {
  user: IUser | null;
};

const initialState: AuthStateType = {
  user: AuthUtil.getAuthenticationInfo().user,
};

export const authReducer: Reducer<AuthStateType, AuthAction> = (state = initialState, action): AuthStateType => {
  switch (action.type) {
    case AuthActionType.AUTHENTICATE: {
      const { user } = action.payload;
      return { ...state, user: user };
    }

    case AuthActionType.LOGOUT: {
      return { ...state, user: null };
    }
    default:
      return { ...state };
  }
};
