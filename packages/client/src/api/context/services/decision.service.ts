import { BaseService } from './base.service';
import { AppActions } from '@api/redux/app/action';
import { DecisionActions } from '@api/redux/decision/action';
import { IErrorResponse } from '@shared/models/error-response.model';
import { IDecision } from '@shared/models/decision.model';
import Axios from 'axios';

export class DecisionService extends BaseService {
  createDecision(newDecision: IDecision) {
    return new Promise(async (resolve, reject) => {
      try {
        type Data = { decision: IDecision } & IErrorResponse;
        const response = await Axios.post<Data>('/decision', { decision: newDecision });
        const { hasError, message, decision } = response.data;

        // check error
        if (hasError) {
          this.dispatch(AppActions.showNotification('error', message));
          reject(message);
        }

        this.dispatch(DecisionActions.add(decision));
        resolve(decision);
      } catch (error) {
        this.dispatch(AppActions.showNotification('error', error.message));
        reject(error.message);
      }
    });
  }

  loadDecisionList() {
    return new Promise(async (resolve, reject) => {
      try {
        type Data = { decisionList: IDecision[] } & IErrorResponse;
        const response = await Axios.get<Data>('/decision');
        const { decisionList, hasError, message } = response.data;

        //check error
        if (hasError) {
          reject(message);
          this.dispatch(AppActions.showNotification('error', message));
        }

        this.dispatch(DecisionActions.setList(decisionList));
        resolve(decisionList);
      } catch (error) {
        reject(error.message);
        this.dispatch(AppActions.showNotification('error', error.message));
      }
    });
  }

  selectDecision(id: string) {
    return new Promise<IDecision>(async (resolve, reject) => {
      try {
        type Data = IErrorResponse & { decision: IDecision };

        const response = await Axios.get<Data>(`/decision/${id}`);
        const { decision, hasError, message } = response.data;

        //check error
        if (hasError) {
          this.dispatch(AppActions.showNotification('error', message));
          reject(message);
        }

        //check is decision exist
        if (!decision) {
          const message = 'Decision not found.';
          this.dispatch(AppActions.showNotification('error', message));
          reject(message);
        }

        this.dispatch(DecisionActions.selectDecision(decision));
        resolve(decision);
      } catch (error) {
        this.dispatch(AppActions.showNotification('error', error.message));
        reject(error.message);
      }
    });
  }
}
