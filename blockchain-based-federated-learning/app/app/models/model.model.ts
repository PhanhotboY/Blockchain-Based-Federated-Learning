import mongoose, { Schema, Types, model } from "mongoose";
import { IModel, IModelModel } from "../interfaces/model.interface";
import { MODEL, UPDATE } from "../constants";
import { UpdateModel } from "./update.model";

const modelSchema = new Schema<IModel, IModelModel>(
  {
    id: {
      type: Number,
      primaryKey: true,
    },
    updateId: {
      type: Number,
      allowNull: false,
      required: true,
    },
    owner: {
      type: String,
      allowNull: false,
    },
    modelHash: {
      type: String,
      allowNull: false,
    },
    timestamp: {
      type: Number,
      allowNull: false,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
    collection: MODEL.COLLECTION_NAME,
    strict: false,
  }
);

modelSchema.statics.build = (attrs: IModel) => {
  return ModelSingleton.instance.create(attrs);
};

class ModelSingleton {
  static instance: IModelModel;

  static getInstance() {
    if (!ModelSingleton.instance) {
      console.log("Creating Model model instance");
      ModelSingleton.instance =
        (mongoose.models[MODEL.DOCUMENT_NAME] as any) ||
        model<IModel, IModelModel>(MODEL.DOCUMENT_NAME, modelSchema);
    }
    return ModelSingleton.instance;
  }
}

export const ModelModel = ModelSingleton.getInstance();
