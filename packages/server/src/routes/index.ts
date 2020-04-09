import { Router } from 'express';
import AuthRouter from './auth.route';
import DecisionRouter from './decision.route';
import TokenRouter from './token.route';

const router = Router();

router.use('/auth', AuthRouter);
router.use('/decision', DecisionRouter);
router.use('/token', TokenRouter);

export default router;
