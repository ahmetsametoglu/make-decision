import { Request } from 'express';

const getClientIp = (req: Request) => {
  const header = typeof req.headers['x-forwarded-for'] === 'string' ? req.headers['x-forwarded-for'] : '';
  const address = !!req.connection.remoteAddress ? req.connection.remoteAddress : '';

  return (header || address) as string;
};

const HttpService = { getClientIp };

export default HttpService;
