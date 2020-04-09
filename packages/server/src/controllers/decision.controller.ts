import { HttpError } from './../api/models/http-error.model';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { DecisionEntity, DecisionDocument } from '../entities/decision.entity';
import { IDecision } from '@shared/models/decision.model';
import { IUser } from '@shared/models/user.model';

const create = async (req: Request, res: Response, next: NextFunction) => {
  console.log(req.body);

  const decision = req.body.decision as IDecision;
  const user = req.body.currentUser as IUser;

  //check is decision null
  if (!decision) next(new HttpError('decision can not be null'));

  decision.createdBy = `${user.firstName} ${user.lastName}`;
  decision.ownerId = user._id;

  //create decision entity
  const newDecision = new DecisionEntity({
    ...decision,
  });

  //Checking document validation
  const validationError = await newDecision.validateSync();
  if (validationError) next(new HttpError(validationError.message, 400));

  try {
    const result = await newDecision.save();
    console.log(`save result: ${result} `);
  } catch (error) {
    next(new HttpError(error.message, 404));
    return;
  }

  return res.status(201).send({
    decision: newDecision.toJSON(),
  });
};

const getDecisionList = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body.currentUser as IUser;

  //TODO: get public decision, invited decision, friends decision

  let decisionList: IDecision[] = [];
  try {
    decisionList = await DecisionEntity.find();
  } catch (error) {
    next(new HttpError(error.message, 404));
  }

  return res.status(200).send({ decisionList });
};

const getDecision = async (req: Request, res: Response, next: NextFunction) => {
  const decisionId = req.params.id;
  const user = req.body.currentUser as IUser;

  //check missing parameters
  if (!decisionId || !Types.ObjectId.isValid(decisionId)) {
    next(new HttpError('missing parameter', 404));
    return;
  }

  //get decision from db
  let decision: DecisionDocument | null;
  try {
    decision = await DecisionEntity.findById(decisionId);
  } catch (error) {
    next(new HttpError(error.message, 404));
    return;
  }

  //check decision is exist
  if (!decision) {
    next(new HttpError('decision is not exist', 404));
    return;
  }

  //check is this user authorized  access for this decision
  //TODO: check access authorization

  return res.status(200).send({ decision: decision.toJSON() });
};

const DecisionController = { create, getDecisionList, getDecision };

export default DecisionController;
