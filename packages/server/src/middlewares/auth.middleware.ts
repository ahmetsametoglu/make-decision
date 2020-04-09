import { HttpError } from '../api/models/http-error.model';
import { Request, Response, NextFunction } from 'express';
import { AuthTokenPayload } from '../api/models/token.model';
import JwtService from '../api/services/jwt.service';
import UserService from '../api/services/user.service';

export const checkAuthentication = async (req: Request, res: Response, next: NextFunction) => {
  let jwtPayLoad: AuthTokenPayload;

  // Get the token from the head
  const token = <string>req.headers['auth'];

  // Try to validate the token and get data
  try {
    jwtPayLoad = JwtService.resolveToken<AuthTokenPayload>(token);
    res.locals.jwtPayLoad = jwtPayLoad;

    const user = await UserService.getUserById(jwtPayLoad.userId, next);
    if (user) {
      req.body.currentUser = user;
    } else {
      next(new HttpError('User not found'));
      return;
    }
  } catch (error) {
    console.log('Token is not valid:' + error);
    next(new HttpError('Token is not valid', 401));
    return;
  }

  //The token is valid for 1 hour
  //We want to send a new token on every request
  // Creating token
  const newToken = JwtService.createToken({
    username: jwtPayLoad.username,
    userId: jwtPayLoad.userId,
  } as AuthTokenPayload);

  res.setHeader('auth', newToken);

  next();
};
