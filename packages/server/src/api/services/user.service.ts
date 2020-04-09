import { HttpError } from '../models/http-error.model';
import { NextFunction, Request } from 'express';
import { UserEntity } from '../../entities/user.entity';
import { AuthTokenPayload } from '../models/token.model';
import JwtService from './jwt.service';

const getUserById = async (userId: string, next: NextFunction, projection?: any) => {
  try {
    const user = await UserEntity.findById(userId, projection);

    if (user) {
      return user;
    } else {
      next(new HttpError('User not found'));
      return;
    }
  } catch (error) {
    next(new HttpError('Error : ' + error));
    return;
  }
};
const getUserIdOnHeaderToken = (req: Request) => {
  const token = <string>req.headers['auth'];
  const payload = JwtService.resolveToken<AuthTokenPayload>(token);
  return payload.userId;
};

const UserService = { getUserById, getUserIdOnHeaderToken };

export default UserService;
