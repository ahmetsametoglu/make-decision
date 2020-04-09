import HttpUtil from '@api/util/http.util';
import { IUser } from '@shared/models/user.model';

const removeAuthenticationInfo = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  HttpUtil.initializeAxios();
};
const setToken = (token: string) => {
  localStorage.setItem('token', token);
  HttpUtil.initializeAxios();
};

const setUser = (user: IUser | null) => {
  localStorage.setItem('user', JSON.stringify(user));
};

const getAuthenticationInfo = () => {
  const tokenData = localStorage.getItem('token');
  const token = !!tokenData ? tokenData : undefined;

  const userData = localStorage.getItem('user');
  const user = !!userData ? JSON.parse(userData) : undefined;

  return { token, user };
};

export const AuthUtil = {
  removeAuthenticationInfo,
  setToken,
  setUser,
  getAuthenticationInfo,
};
