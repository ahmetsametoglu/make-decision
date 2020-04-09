import { config } from '../../config';
import * as jwt from 'jsonwebtoken';
import { TokenPayload } from 'api/models/token.model';

const createToken = (payload: TokenPayload): string => {
  const token = jwt.sign(payload as any, config.jwtSecretKey, {
    expiresIn: config.jwtTokenExpiresIn,
  });
  return token;
};

const resolveToken = <T>(token: string): T => {
  const tokenPayload = jwt.verify(token, config.jwtSecretKey) as any;
  return { ...tokenPayload } as T;
};

const JwtService = { createToken, resolveToken };

export default JwtService;
