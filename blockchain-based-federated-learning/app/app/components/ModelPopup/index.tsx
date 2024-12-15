import { Link } from "@remix-run/react";
import { RiDownload2Fill } from "@remixicon/react";

export default function ModelPopup({ model, className }: { model: any; className?: string }) {
  return (
    <div className="w-full py-4">
      <div
        className="whitespace-normal break-words bg-white w-5/6 md:w-3/4 lg:w-2/3 xl:w-[500px] 2xl:w-[600px] mt-8 mx-auto p-8 rounded-lg shadow-2xl"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <h2 className="text-center text-2xl font-bold tracking-wide text-gray-800">
          Model Details
        </h2>

        <div className="text-lg my-10 leading-8">
          <div>
            <b>Update ID: </b>
            <span>{model.updateId || model.id}</span>
          </div>

          <div>
            <b>Hash: </b>
            <span>{model.modelHash}</span>
          </div>

          <div>
            <b>Owner: </b>
            <span>{model.owner}</span>
          </div>

          <div>
            <b>Score: </b>
            <span>{model.score}</span>
          </div>

          <div>
            <b>Accuracy: </b>
            <span>{model.accuracy}</span>
          </div>

          <div className="border-t mt-2 pt-2">
            <b>Epoch: </b>
            <span>{model.epoch}</span>
          </div>

          <div>
            <b>Batch Size: </b>
            <span>{model.batchSize}</span>
          </div>

          <div>
            <b>Learning Rate: </b>
            <span>{model.learningRate}</span>
          </div>
        </div>

        <div className="flex items-center justify-center space-x-4">
          <a
            href={"/models/" + model.modelHash + ".pth"}
            type="download"
            className="bg-blue-600 flex hover:bg-blue-700 rounded-lg px-8 py-2 text-gray-100 hover:shadow-xl transition duration-150 uppercase"
          >
            <RiDownload2Fill className="w-5 h-5 mr-2" />
            Download
          </a>
        </div>
      </div>
    </div>
  );
}
