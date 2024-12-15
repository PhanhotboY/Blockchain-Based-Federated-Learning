import { formatEther, parseEther } from "ethers";

import { BBFLModelContract } from "~/contracts";
import { getRootHDNodeWallet } from "../utils/hdWallet";
import { IRawUpdate, IUpdate, IUpdateAttrs } from "~/interfaces/update.interface";
import { UpdateModel } from "~/models/update.model";

const createModelUpdate = async (model: IUpdateAttrs) => {
  return await UpdateModel.create(model);
};

const updateModelUpdate = async (update: IUpdateAttrs) => {
  return await UpdateModel.findOneAndUpdate({ id: update.id }, update, { upsert: true });
};

const getModelUpdates = async () => {
  const rootWallet = getRootHDNodeWallet();
  const bbflContract = BBFLModelContract(rootWallet);
  const updates = await bbflContract.getModelUpdates();

  for (const update of updates) {
    await updateModelUpdate({
      id: +update.id.toString(),
      owner: update.owner,
      modelHash: update.modelHash,
      timestamp: +update.timestamp.toString(),
      score: +formatEther(update.score),
      epoch: +update.epoch.toString(),
      learningRate: +formatEther(update.learningRate),
      batchSize: +update.batchSize.toString(),
      prevModelId: +update.prevModelId.toString(),
      accuracy: +formatEther(update.accuracy),
    });
  }

  return (await UpdateModel.find()) as Array<IRawUpdate>;
};

export { getModelUpdates, createModelUpdate, updateModelUpdate };
