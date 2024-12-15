import { RiFileDownloadLine } from "@remixicon/react";

import "./index.css";

export default function ModelCard({
  model,
  onClick,
  className,
  isModel,
}: {
  model: any;
  onClick: VoidFunction;
  className?: string;
  isModel?: boolean;
}) {
  return (
    <div className={`${className}`}>
      <div className="whitespace-normal break-words rounded-lg border border-blue-gray-50 bg-white p-4 font-sans text-sm font-normal text-blue-gray-500 shadow-lg shadow-blue-gray-500/10 focus:outline-none">
        <div className="flex justify-between mb-2 flex items-center gap-3">
          {isModel ? (
            <div
              className="center relative inline-block select-none whitespace-nowrap rounded-full bg-green-500 py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white hover:cursor-pointer"
              onClick={onClick}
            >
              <div className="mt-px">
                Model<span className="font-bold">#{model.id}</span>
              </div>
            </div>
          ) : (
            <div
              className="center relative inline-block select-none whitespace-nowrap rounded-full bg-yellow-500 py-1 px-2 align-baseline font-sans text-xs font-medium capitalize leading-none tracking-wide text-white hover:cursor-pointer"
              onClick={onClick}
            >
              <div className="mt-px">
                Update<span className="font-bold">#{model.id}</span>
              </div>
            </div>
          )}

          <a href={`/models/${model.modelHash}.pth`} type="download">
            <RiFileDownloadLine className="w-6 h-6 hover:text-blue-500" />
          </a>
        </div>

        <div>
          <b>Hash: </b>
          <span className="text-overflow">{model.modelHash}</span>
        </div>

        <div>
          <b>Owner: </b>
          <span className="text-overflow">{model.owner}</span>
        </div>

        <div>
          <b>Score: </b>
          <span>{model.score || model.update?.score}</span>
        </div>

        <div>
          <b>Accuracy: </b>
          <span>{model.accuracy || model.update?.accuracy}</span>
        </div>
      </div>
    </div>
  );
}
