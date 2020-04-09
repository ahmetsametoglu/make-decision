import { Schema, Document, model } from 'mongoose';
import { IDecisionDocument } from '@shared/models/decision.model';

const Responder = new Schema({
  ip: String,
  machineId: String,
  userId: String,
});
const Restriction = new Schema(
  {
    durationMinute: Number,
    maxParticipantCount: Number,
    sameMachineAccessCount: Number,
    sameIpAccessCount: Number,
    canParticipantEdit: Boolean,
    responderInformation: [Responder],
  },
  { versionKey: false, _id: false, id: false },
);

const Evolution = new Schema({
  responder: Responder,
  score: Number,
});
const Advice = new Schema({
  title: String,
  description: String,
  imageURL: String,
  url: String,
  totalScore: Number,
  evolutions: [Evolution],
});
const TimeLineAction = new Schema(
  {
    time: Date,
    type: { type: String, enum: ['created', 'pending', 'activated', 'decided'] },
  },
  { versionKey: false, _id: false, id: false },
);

const DecisionSchema = new Schema(
  {
    ownerId: { required: true, type: String },
    createdBy: { required: true, type: String },
    title: { required: true, type: String },
    subtitle: { required: true, type: String },
    description: { required: true, type: String },
    imageURL: String,
    url: String,
    restriction: { required: true, type: Restriction },
    advices: { required: true, type: [Advice] },
    timeLine: { required: true, type: [TimeLineAction], default: [{ type: 'created', time: new Date() }] },
    status: { type: String, enum: ['Pending', 'Activated', 'Decided'], default: 'Pending' },
    evolutionType: { type: String, enum: ['Yes-No', 'Good-Bad-NotBad', 'Range'], default: 'Good-Bad-NotBad' },
    accessType: { type: String, required: true, enum: ['public', 'private', 'only-friends', 'with-invite'] },
  },
  { timestamps: true, versionKey: false, bufferCommands: false },
);

export interface DecisionDocument extends IDecisionDocument, Document {}

export const DecisionEntity = model<DecisionDocument>('Decision', DecisionSchema);
