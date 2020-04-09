import HttpUtil from '@api/util/http.util';
import { Plugins } from '@capacitor/core';

const { Device } = Plugins;

const initializeApp = (logout: () => void) => {
  HttpUtil.initializeAxios();
  HttpUtil.checkToken(logout);
};

const getDeviceId = async () => {
  const info = await Device.getInfo();
  return info.uuid;
};

const AppUtil = {
  initializeApp,
  getDeviceId,
};

export default AppUtil;
