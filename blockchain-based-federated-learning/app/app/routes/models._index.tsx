import { LoaderFunctionArgs, json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { Fragment, useState } from "react";
import ModelCard from "~/components/ModelCard";
import ModelPopup from "~/components/ModelPopup";
import { BBFLModelContract } from "~/contracts";
import { getModels } from "~/services/model.service";
import { getModelUpdates, updateModelUpdate } from "~/services/update.service";
import { getRootHDNodeWallet } from "~/utils/hdWallet";

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const models = await getModels();
  const modelUpdates = await getModelUpdates();
  const rootWallet = getRootHDNodeWallet();
  const bbflContract = BBFLModelContract(rootWallet);
  const round = await bbflContract.round();

  return json({ models, modelUpdates, round: +round.toString() });
};

export default function Models() {
  const { models, modelUpdates, round } = useLoaderData<typeof loader>();

  const [showingModel, setShowingModel] = useState<number | null>();
  console.log(models);
  return (
    <div className="grid grid-cols-12 gap-4 pb-8">
      {new Array(round + 1).fill(0).map((r, i) => (
        <Fragment key={i}>
          <h3 className="font-semibold col-span-12">Round {i}</h3>
          {models
            .filter((m) => m.id === i)
            .map((model, i) => (
              <ModelCard
                className="col-span-3"
                model={modelUpdates.find((u) => u.id === model.updateId)}
                onClick={() => setShowingModel(model.updateId)}
                key={i}
                isModel
              />
            ))}

          {modelUpdates
            .filter((u) => u.id >= (i - 1) * 10 && u.id < i * 10)
            .map((update, i) => (
              <ModelCard
                className="col-span-3"
                model={update}
                onClick={() => setShowingModel(update.id)}
                key={i}
              />
            ))}
        </Fragment>
      ))}

      {Number.isInteger(showingModel) && (
        <div
          className="fixed inset-0 bg-gray-800/50 w-full min-h-screen flex items-center justify-center"
          onClick={() => setShowingModel(null)}
        >
          <ModelPopup model={modelUpdates.find((u) => u.id === showingModel)} />
        </div>
      )}
    </div>
  );
}
