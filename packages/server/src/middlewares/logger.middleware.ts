import { Request, Response, NextFunction } from 'express';
import HttpService from '../api/services/http.service';

export const logger = (request: Request, response: Response, next: NextFunction) => {
  const ip = HttpService.getClientIp(request);

  console.log(`${ip}: ${request.method} ${request.originalUrl}`);

  const start = new Date().getTime();

  response.on('finish', () => {
    const duration = new Date().getTime() - start;
    console.log(`${request.method} ${request.originalUrl} ${response.statusCode} ${duration}ms`);
  });

  next();
};
