import { HydratedDocument, Model } from "mongoose";

export interface IRawUpdate {
  id: number;
  owner: string;
  modelHash: string;
  timestamp: number;
  score: number;
  epoch: number;
  learningRate: number;
  batchSize: number;
  prevModelId: number;
  accuracy: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IUpdate = HydratedDocument<IRawUpdate>;

export interface IUpdateAttrs {
  id: number;
  owner: string;
  modelHash: string;
  timestamp: number;
  score: number;
  epoch: number;
  learningRate: number;
  batchSize: number;
  prevModelId: number;
  accuracy: number;
}

export interface IUpdateModel extends Model<IUpdate> {
  build(attrs: IUpdateAttrs): Promise<IUpdate>;
}
