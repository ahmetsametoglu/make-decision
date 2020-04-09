export type DecisionStatusType = 'Pending' | 'Activated' | 'Decided';
export type DecisionAccessType = 'public' | 'private' | 'only-friends' | 'with-invite';
export type DecisionEvolutionType = 'Yes-No' | 'Good-Bad-NotBad' | 'Range';

export interface IDecision extends IDecisionDocument {
  _id: string;
}
export interface IDecisionDocument {
  ownerId: string;
  createdBy: string;
  title: string;
  subtitle: string;
  status: DecisionStatusType;
  description: string;
  accessType: DecisionAccessType;
  imageURL?: string;
  url?: string;
  restriction: IRestriction;
  advices?: IAdviceItem[];
  timeLine: IDecisionTimeLineItem[];
  evolutionType?: DecisionEvolutionType;
}

export interface IAdviceItem {
  title: string;
  description: string;
  imageURL?: string;
  url?: string;
  totalScore: number;
  evolutions: IEvolutionItem[];
}

export interface IEvolutionItem {
  responder: IResponder;
  score: number;
}

export interface IRestriction {
  durationMinute: number;
  maxParticipantCount: number;
  sameMachineAccessCount: number;
  sameIpAccessCount: number;
  canParticipantEdit: boolean;
  responderInformation: IResponder[];
}

export interface IResponder {
  ip: string;
  machineId: string;
  userId: string;
}

export interface IDecisionTimeLineItem {
  type: DecisionTimeLineType;
  time: Date;
}

export type DecisionTimeLineType = 'created' | 'pending' | 'activated' | 'decided';
