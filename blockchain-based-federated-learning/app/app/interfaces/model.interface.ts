import { HydratedDocument, Model } from "mongoose";

export interface IRawModel {
  id: number;
  updateId: number;
  owner: string;
  modelHash: string;
  timestamp: number;
  createdAt: Date;
  updatedAt: Date;
}

export type IModel = HydratedDocument<IRawModel>;

export interface IModelAttrs {
  id: number;
  updateId: number;
  owner: string;
  modelHash: string;
  timestamp: number;
}

export interface IModelModel extends Model<IModel> {
  build(attrs: IModelAttrs): Promise<IModel>;
}
