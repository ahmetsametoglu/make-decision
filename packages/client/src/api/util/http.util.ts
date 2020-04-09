import axios from 'axios';
import { AuthUtil } from './auth.util';

const initializeAxios = () => {
  const { token } = AuthUtil.getAuthenticationInfo();

  axios.defaults.headers.common['auth'] = token;
  axios.defaults.baseURL = 'http://localhost:3000';
};

const checkToken = (logout: () => void) => {
  axios.interceptors.response.use(
    response => {
      const token = response.config.headers['auth'];
      if (token) {
        AuthUtil.setToken(token);
        axios.defaults.headers.common['auth'] = token;
      }

      return response;
    },
    error => {
      if (!!error.response && error.response.status === 401) {
        logout();
      }

      // return Error object with Promise
      return Promise.reject(error);
    },
  );
};

const startLogging = () => {
  axios.interceptors.request.use(request => {
    console.log(
      `%cRequest: ${request.method} ${request.baseURL}${request.url}`,
      `color: red; font-weight: bold;`,
      request.data,
    );
    return request;
  });
  axios.interceptors.response.use(response => {
    console.log(
      `%cResponse: ${response.config.method} ${response.config.baseURL}${response.config.url}`,
      `color: green; font-weight: bold;`,
      { status: response?.status, text: response?.statusText },
      response.data,
    );
    return response;
  });
};

const HttpUtil = { initializeAxios, checkToken, startLogging };

export default HttpUtil;
