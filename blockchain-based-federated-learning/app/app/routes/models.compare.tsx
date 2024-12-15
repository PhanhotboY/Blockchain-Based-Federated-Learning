import { json, useFetcher } from "@remix-run/react";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { sha256 } from "js-sha256";

import UploadModelForm from "~/components/UploadModelForm";

export const action = async ({ request }: ActionFunctionArgs) => {
  if (request.method === "POST") {
    const formData = await request.formData();
    const file = formData.get("file");
    const buffer = await (file as File).arrayBuffer();
    const modelHash = sha256(buffer);

    const hash = formData.get("hash") as string;

    setTimeout(() => {
      new Response("Success", {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      });
    }, 1000);
    return json({
      result: hash === modelHash,
      toast: { message: "Model uploaded successfully", type: "success" },
    });
  }
};

export default function Models() {
  const key = "compare-model-hash";
  const fetcher = useFetcher({ key });
  console.log("compare model: ", fetcher.data);

  return (
    <UploadModelForm fetcherKey={key} cta="compare">
      <div className="my-5">
        <label htmlFor="hash" className="mb-3 block text-base font-medium text-[#07074D]">
          Model Hash:
        </label>
        <input
          type="text"
          name="hash"
          id="hash"
          placeholder="0x..."
          required
          className="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
    </UploadModelForm>
  );
}
