import { Router } from 'express';
import TokenController from '../controllers/token.controller';

const TokenRouter = Router();

TokenRouter.post('/decision', TokenController.getDecisionToken);

export default TokenRouter;
