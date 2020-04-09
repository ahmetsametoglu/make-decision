import { IDecision } from '@shared/models/decision.model';
import { action } from 'typesafe-actions';
import { ActionsUnion } from '../../helper/type.helper';

export enum DecisionActionType {
  CREATE = '[decision]: CREATE ',
  CREATE_ERROR = '[decision]: CREATE_ERROR ',
  CREATE_SUCCESS = '[decision]: CREATE_SUCCESS ',

  UPDATE = '[decision]: UPDATE ',
  UPDATE_ERROR = '[decision]: UPDATE_ERROR ',
  UPDATE_SUCCESS = '[decision]: UPDATE_SUCCESS ',

  DELETE = '[decision]: DELETE ',
  DELETE_ERROR = '[decision]: DELETE_ERROR ',
  DELETE_SUCCESS = '[decision]: DELETE_SUCCESS ',

  GET_LIST = '[decision]: GET_LIST',
  GET_LIST_SUCCESS = '[decision]: GET_LIST_SUCCESS',
  GET_LIST_ERROR = '[decision]: GET_LIST_ERROR',

  GET = '[decision]: GET',
  GET_SUCCESS = '[decision]: GET_SUCCESS',
  GET_ERROR = '[decision]: GET_ERROR',
  SUBSCRIBE = '[decision]: SUBSCRIBE_GET',
  UNSUBSCRIBE = '[decision]: UNSUBSCRIBE_GET',

  GET_TIMELINE = '[decision]: GET_TIMELINE ',
  GET_TIMELINE_SUCCESS = '[decision]: GET_TIMELINE_SUCCESS ',
  GET_TIMELINE_ERROR = '[decision]: GET_TIMELINE_ERROR ',
}

export const DecisionActions = {
  create: (decision: IDecision) => action(DecisionActionType.CREATE, { decision }),
  createSuccess: (decision: IDecision) => action(DecisionActionType.CREATE_SUCCESS, { decision }),
  createError: (message: string) => action(DecisionActionType.CREATE_ERROR, { message }),
  update: () => action(DecisionActionType.UPDATE), //TODO: add missing property
  updateSuccess: () => action(DecisionActionType.UPDATE_SUCCESS), //TODO: add missing property
  updateError: () => action(DecisionActionType.UPDATE_ERROR), //TODO: add missing property
  delete: () => action(DecisionActionType.DELETE), //TODO: add missing property
  deleteSuccess: () => action(DecisionActionType.DELETE_SUCCESS), //TODO: add missing property
  deleteError: () => action(DecisionActionType.DELETE_ERROR), //TODO: add missing property
  getList: () => action(DecisionActionType.GET_LIST),
  getListSuccess: (decisionList: IDecision[]) => action(DecisionActionType.GET_LIST_SUCCESS, { decisionList }),
  getListError: (message: string) => action(DecisionActionType.GET_LIST_ERROR, { message }),
  get: (id: string) => action(DecisionActionType.GET, { id }),
  getSuccess: (decision: IDecision) => action(DecisionActionType.GET_SUCCESS, { decision }),
  getError: (message: string) => action(DecisionActionType.GET_ERROR, { message }),
  subscribeDecision: (id: string) => action(DecisionActionType.SUBSCRIBE, { id }),
  unsubscribeGet: () => action(DecisionActionType.UNSUBSCRIBE),
  getTimeline: () => action(DecisionActionType.GET_TIMELINE), //TODO: add missing property
  getTimelineSuccess: () => action(DecisionActionType.GET_TIMELINE_SUCCESS), //TODO: add missing property
  getTimelineError: () => action(DecisionActionType.GET_TIMELINE_ERROR), //TODO: add missing property
};

export type DecisionAction = ActionsUnion<typeof DecisionActions>;
