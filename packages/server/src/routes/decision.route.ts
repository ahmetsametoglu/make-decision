import { Router } from 'express';
import { checkAuthentication } from '../middlewares/auth.middleware';
import DecisionController from '../controllers/decision.controller';

const DecisionRouter = Router();

DecisionRouter.post('/', [checkAuthentication], DecisionController.create);
DecisionRouter.get('/', [checkAuthentication], DecisionController.getDecisionList);
DecisionRouter.get('/:id', [checkAuthentication], DecisionController.getDecision);

export default DecisionRouter;
