import { Request, Response, NextFunction } from 'express';
import HttpService from '../api/services/http.service';
import { HttpError } from '../api/models/http-error.model';
import { DecisionTokenPayload } from '../api/models/token.model';
import UserService from '../api/services/user.service';
import JwtService from '../api/services/jwt.service';

const getDecisionToken = (req: Request, res: Response, next: NextFunction) => {
  const { decisionId, deviceId } = req.body;
  const ip = HttpService.getClientIp(req);
  // check missing paramter TODO: is ip valid
  if (!decisionId || !deviceId || !ip) {
    next(new HttpError('missing paramter', 404));
  }
  const tokenPayload: DecisionTokenPayload = {
    decisionId,
    deviceId,
    ip,
    userId: UserService.getUserIdOnHeaderToken(req),
  };
  const decisionToken = JwtService.createToken(tokenPayload);
  res.status(200).send(decisionToken);
};

const TokenController = { getDecisionToken };
export default TokenController;
