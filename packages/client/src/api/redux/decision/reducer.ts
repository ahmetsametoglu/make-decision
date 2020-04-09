import { IDecision } from '@shared/models/decision.model';
import { Reducer } from 'typesafe-actions';
import { DecisionAction, DecisionActionType } from './action';

export type DecisionState = {
  error?: string;
  loading: boolean;
  decisionList: IDecision[];
  selectedDecision: IDecision | null;
};

const initialState: DecisionState = {
  loading: false,
  decisionList: [],
  selectedDecision: null,
};

export const decisionReducer: Reducer<DecisionState, DecisionAction> = (
  state = initialState,
  action,
): DecisionState => {
  switch (action.type) {
    case DecisionActionType.CREATE:
      return { ...state, error: undefined, loading: true };
    case DecisionActionType.CREATE_SUCCESS:
      return {
        ...state,
        error: undefined,
        loading: false,
        decisionList: [action.payload.decision, ...state.decisionList],
      };
    case DecisionActionType.CREATE_ERROR:
      return { ...state, error: action.payload.message, loading: false };

    case DecisionActionType.GET_LIST:
      return { ...state, error: undefined, loading: true };
    case DecisionActionType.GET_LIST_SUCCESS:
      const decisionList = [...action.payload.decisionList];
      return { ...state, error: undefined, loading: false, decisionList };
    case DecisionActionType.GET_LIST_ERROR:
      return { ...state, error: action.payload.message, loading: false };

    case DecisionActionType.GET:
      return { ...state, error: undefined, loading: true, selectedDecision: null };
    case DecisionActionType.GET_SUCCESS:
      return { ...state, error: undefined, loading: false, selectedDecision: action.payload.decision };
    case DecisionActionType.GET_ERROR:
      return { ...state, error: action.payload.message, loading: false, selectedDecision: null };

    case DecisionActionType.UNSUBSCRIBE:
      return { ...state, selectedDecision: null };

    default:
      return { ...state };
  }
};
