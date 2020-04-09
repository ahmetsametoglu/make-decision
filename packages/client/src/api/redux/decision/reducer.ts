import { IDecision } from '@shared/models/decision.model';
import { Reducer } from 'typesafe-actions';
import { DecisionAction, DecisionActionType } from './action';

export type DecisionState = {
  decisions: IDecision[];
  selectedDecision: IDecision | null;
};

const initialState: DecisionState = {
  decisions: [],
  selectedDecision: null,
};

export const decisionReducer: Reducer<DecisionState, DecisionAction> = (
  state = initialState,
  action,
): DecisionState => {
  switch (action.type) {
    case DecisionActionType.ADD: {
      const { decision } = action.payload;
      const decisions = [...state.decisions];
      decisions.push(decision);
      return { ...state, decisions };
    }

    case DecisionActionType.SET_LIST: {
      const { decisions } = action.payload;
      return { ...state, decisions: [...decisions] };
    }
    case DecisionActionType.SELECT_DECISION: {
      const { decision } = action.payload;
      return { ...state, selectedDecision: !!decision ? { ...decision } : null };
    }

    default:
      return { ...state };
  }
};
