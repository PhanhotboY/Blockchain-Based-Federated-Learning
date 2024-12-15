import mongoose, { Schema, Types, model } from "mongoose";
import { IUpdate, IUpdateModel } from "../interfaces/update.interface";
import { UPDATE } from "../constants";

const updateSchema = new Schema<IUpdate, IUpdateModel>(
  {
    id: {
      type: Number,
      primaryKey: true,
      unique: true,
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
    score: {
      type: Number,
      allowNull: false,
    },
    epoch: {
      type: Number,
      allowNull: false,
    },
    learningRate: {
      type: Number,
      allowNull: false,
    },
    batchSize: {
      type: Number,
      allowNull: false,
    },
    prevModelId: {
      type: Number,
      allowNull: true,
    },
    accuracy: {
      type: Number,
      allowNull: false,
    },
    createdAt: Date,
    updatedAt: Date,
  },
  {
    timestamps: true,
    collection: UPDATE.COLLECTION_NAME,
    strict: false,
  }
);

updateSchema.statics.build = (attrs: IUpdate) => {
  return UpdateSingleton.instance.create(attrs);
};

class UpdateSingleton {
  static instance: IUpdateModel;

  static getInstance() {
    if (!UpdateSingleton.instance) {
      console.log("Creating Update model instance");
      UpdateSingleton.instance =
        (mongoose.models[UPDATE.DOCUMENT_NAME] as any) ||
        model<IUpdate, IUpdateModel>(UPDATE.DOCUMENT_NAME, updateSchema);
    }
    return UpdateSingleton.instance;
  }
}

export const UpdateModel = UpdateSingleton.getInstance();
