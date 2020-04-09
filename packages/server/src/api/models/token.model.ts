export type AuthTokenPayload = {
  userId: string;
  username: string;
};
export type DecisionTokenPayload = {
  decisionId: string;
  deviceId: string;
  userId: string;
  ip: string;
};
export type TokenPayload = AuthTokenPayload | DecisionTokenPayload;
