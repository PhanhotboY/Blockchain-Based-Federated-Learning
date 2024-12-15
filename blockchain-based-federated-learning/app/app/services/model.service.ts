import { execSync } from "child_process";
import { ModelModel } from "~/models/model.model";
import { BBFLModelContract } from "~/contracts";
import { getRootHDNodeWallet } from "../utils/hdWallet";
import { IModel, IModelAttrs, IRawModel } from "~/interfaces/model.interface";

const scoreModel = (modelPath: string) => {
  console.log("scoring model");
  const result = execSync(`python3 public/eval.py ${modelPath}`);

  return JSON.parse(result.toString()) as {
    accuracy: number;
    precision: number;
    recall: number;
    f1_score: number;
  };
};

const createModel = async (model: IModelAttrs) => {
  return await ModelModel.create(model);
};

const updateModel = async (model: IModelAttrs) => {
  return await ModelModel.findOneAndUpdate({ id: model.id }, model, { upsert: true });
};

const getModels = async () => {
  const rootWallet = getRootHDNodeWallet();
  const bbflContract = BBFLModelContract(rootWallet);
  const models = await bbflContract.getModels();

  for (const model of models) {
    await updateModel({
      id: +model.id.toString(),
      updateId: +model.upadteId.toString(),
      owner: model.owner,
      modelHash: model.modelHash,
      timestamp: +model.timestamp.toString(),
    });
  }

  return (await ModelModel.find()) as Array<IRawModel>;
};

export { scoreModel, createModel, getModels };
