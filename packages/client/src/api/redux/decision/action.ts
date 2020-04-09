import { IDecision } from '@shared/models/decision.model';
import { action } from 'typesafe-actions';
import { ActionsUnion } from '../../helper/type.helper';

export enum DecisionActionType {
  ADD = '[decision]: ADD ',
  UPDATE = '[decision]: UPDATE ',
  DELETE = '[decision]: DELETE ',
  SET_LIST = '[decision]: SET_LIST',
  SELECT_DECISION = '[decision]: SELECT_DECISION',
}

export const DecisionActions = {
  add: (decision: IDecision) => action(DecisionActionType.ADD, { decision }),
  setList: (decisions: IDecision[]) => action(DecisionActionType.SET_LIST, { decisions }),
  selectDecision: (decision: IDecision | null) => action(DecisionActionType.SELECT_DECISION, { decision }),
};

export type DecisionAction = ActionsUnion<typeof DecisionActions>;
