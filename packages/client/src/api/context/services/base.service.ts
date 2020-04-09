import { Dispatch } from 'react';

export class BaseService {
  dispatch: Dispatch<any>;
  constructor(dispatch: Dispatch<any>) {
    this.dispatch = dispatch;
  }
}
