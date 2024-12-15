import { json, useFetcher } from "@remix-run/react";
import { sha256 } from "js-sha256";
import { createWriteStream } from "fs";
import { ActionFunctionArgs } from "@remix-run/node";

import UploadModelForm from "~/components/UploadModelForm";
import { createModel, scoreModel } from "~/services/model.service";
import { getRootHDNodeWallet } from "~/utils/hdWallet";
import { BBFLModelContract } from "~/contracts";
import { getHarmonicMean } from "~/utils";
import { EventLog, formatEther, parseEther } from "ethers";
import { createModelUpdate } from "~/services/update.service";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "POST") {
    const formData = await request.formData();
    const data = extractFormData(formData);

    if (data instanceof Response) {
      return data;
    }

    const { file, epoch, learningRate, batchSize, prevModelId } = data;

    const buffer = await (file as File).arrayBuffer();
    const hash = sha256(buffer);
    const modelPath = `public/models/${hash}.pth`;

    try {
      await new Promise((resolve, reject) => {
        const writeStream = createWriteStream(modelPath);
        writeStream.write(Buffer.from(buffer));
        writeStream.end();

        writeStream.on("finish", resolve); // Resolve when writing is finished
        writeStream.on("error", reject); // Reject on an error
      });

      const result = scoreModel(modelPath);

      const hdWallet = getRootHDNodeWallet();
      const bbflModel = BBFLModelContract(hdWallet);

      const tx = await bbflModel.uploadModelUpdate(
        hash,
        parseEther(getHarmonicMean(Object.values(result)).toString()),
        epoch,
        parseEther(learningRate),
        batchSize,
        prevModelId,
        parseEther(result.accuracy.toString())
      );
      const receipt = await tx.wait();
      const event = receipt?.logs?.find(
        (log) => (log as EventLog).fragment?.name === "ModelUpdateAdded"
      ) as EventLog;

      const model = await createModelUpdate({
        id: event.args[0].toString(),
        owner: event.args[1],
        score: +formatEther(event.args[2]),
        modelHash: event.args[3],
        epoch: +event.args[4].toString(),
        learningRate: +formatEther(event.args[5]),
        batchSize: +event.args[6].toString(),
        prevModelId: +event.args[7].toString(),
        accuracy: +formatEther(event.args[8]),
        timestamp: +event.args[9].toString(),
      });

      new Response("Success", {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });

      return json({
        hash,
        link: "http://localhost:5173/" + modelPath,
        toast: { message: "Model has been submitted Sucessfully", type: "success" },
        model,
      });
    } catch (error) {
      console.log(error);
      return new Response("Error submitting model: " + (error as any).message, {
        status: 500,
        headers: {
          "Content-Type": "text/plain",
        },
      });
    }
  }
};

export default function Models() {
  const key = "submit-model";
  const fetcher = useFetcher({ key });

  return (
    <UploadModelForm fetcherKey={key} cta="submit">
      <div className="flex flex-col gap-y-4 mt-12">
        <div className="">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#6A64F1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              name="prevModelId"
              type="number"
              min={0}
              defaultValue={0}
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#6A64F1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#6A64F1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#6A64F1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Previous Model Id
            </label>
          </div>
        </div>

        <div className="">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#6A64F1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              name="epoch"
              type="number"
              min={0}
              defaultValue={10}
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#6A64F1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#6A64F1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#6A64F1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Epoch
            </label>
          </div>
        </div>

        <div className="">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#6A64F1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              name="learningRate"
              type="number"
              min={0}
              step={0.000000000000000001}
              defaultValue={0.001}
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#6A64F1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#6A64F1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#6A64F1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Learning Rate
            </label>
          </div>
        </div>

        <div className="">
          <div className="relative h-10 w-full min-w-[200px]">
            <input
              className="peer h-full w-full rounded-[7px] border border-blue-gray-200 bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-[#6A64F1] focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
              placeholder=" "
              name="batchSize"
              type="number"
              min={0}
              defaultValue={64}
              required
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-[#6A64F1] peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-[#6A64F1] peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-[#6A64F1] peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
              Batch Size
            </label>
          </div>
        </div>
      </div>
    </UploadModelForm>
  );
}

const extractFormData = (formData: FormData) => {
  const file = formData.get("file");
  const epoch = formData.get("epoch");
  const learningRate = formData.get("learningRate");
  const batchSize = formData.get("batchSize");
  const prevModelId = formData.get("prevModelId");

  if (!file) {
    return new Response("No file found", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!(file instanceof File)) {
    return new Response("Invalid file", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (file.type !== "application/octet-stream") {
    return new Response("Invalid file type", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (file.name.split(".").pop() !== "pth") {
    return new Response("Invalid file type", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!epoch) {
    return new Response("Epoch not found", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!learningRate) {
    return new Response("Learning rate not found", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  if (!batchSize) {
    return new Response("Batch size not found", {
      status: 400,
      headers: {
        "Content-Type": "text/plain",
      },
    });
  }

  return {
    file,
    epoch,
    learningRate,
    batchSize,
    prevModelId,
  } as {
    file: File;
    epoch: string;
    learningRate: string;
    batchSize: string;
    prevModelId: string;
  };
};
