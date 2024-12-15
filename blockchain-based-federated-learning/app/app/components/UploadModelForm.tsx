import { useFetcher } from "@remix-run/react";
import { RiCloseLine } from "@remixicon/react";
import { ToastContainer, toast as notify, Bounce } from "react-toastify";
import { useEffect, useRef } from "react";

import "react-toastify/ReactToastify.css";

export default function UploadModelForm({
  fetcherKey: key,
  action,
  children,
  cta,
}: {
  fetcherKey: string;
  action?: string;
  children?: React.ReactNode;
  cta?: string;
}) {
  const fetcher = useFetcher<any>({ key });

  // Hook to show the toasts
  const toastIdRef = useRef<any>(null);

  useEffect(() => {
    switch (fetcher.state) {
      case "submitting":
        // Show a loading toast and store the ID in the ref
        console.log("submitting: ", toastIdRef);
        toastIdRef.current = notify.loading("Loadding...", { autoClose: false });

        break;

      case "idle":
        console.log("idling: ", fetcher.data);
        if (fetcher.data?.toast && toastIdRef.current) {
          const { toast: toastData } = fetcher.data as any;
          notify.update(toastIdRef.current, {
            render: toastData.message,
            type: toastData.type || "success", // Default to 'success' if type is not provided
            autoClose: 3000,
            isLoading: false,
          });
          toastIdRef.current = null;
          break;
        }

        notify.update(toastIdRef.current, {
          render: fetcher.data,
          autoClose: 3000,
          isLoading: false,
          type: "error",
        });

        break;
    }
  }, [fetcher.state]);

  return (
    <div className="flex items-center justify-center">
      <div className="mx-auto px-9 w-[800px]">
        <fetcher.Form method="POST" encType="multipart/form-data" action={action}>
          <div className="grid grid-cols-2 w-full gap-x-4">
            {children}

            <div className="grow overflow-hidden">
              <div className="mb-6 ">
                <label className="mb-5 block text-xl font-semibold text-[#07074D]">
                  Upload Model
                </label>
                <div className="mb-8">
                  <input
                    type="file"
                    name="file"
                    id="fileInput"
                    className="sr-only"
                    accept=".pth"
                    required
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="relative flex min-h-[200px] items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
                  >
                    <div>
                      <span className="mb-2 block text-xl font-semibold text-[#07074D]">
                        Drop model here
                      </span>
                      <span className="mb-2 block text-base font-medium text-[#6B7280]">Or</span>
                      <span className="cursor-pointer inline-flex rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D]">
                        Browse
                      </span>
                    </div>
                  </label>
                </div>

                <div
                  id="proContainer"
                  className="rounded-md bg-[#F5F7FB] py-4 px-8"
                  style={{ display: "none" }}
                >
                  <div id="preContainer" className="mb-5" style={{ display: "none" }}>
                    <img
                      src=""
                      alt="Preview"
                      id="previewImage"
                      className="rounded-lg w-full h-[200px] object-cover"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <span id="fName" className="truncate pr-3 text-base font-medium text-[#07074D]">
                      File Name
                    </span>
                    <button id="cBtn" className="text-[#07074D]" type="button">
                      <RiCloseLine />
                    </button>
                  </div>
                  <div className="relative mt-5 h-[6px] w-full rounded-lg bg-[#E2E5EF]">
                    <div
                      id="pBar"
                      className="absolute left-0 right-0 h-full rounded-lg bg-[#6A64F1]"
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              id="sBtn"
              className="capitalize disabled:opacity-50 hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
              disabled={fetcher.state !== "idle"}
            >
              {cta || "Upload"}
            </button>
          </div>
        </fetcher.Form>

        <ToastContainer
          position="top-right"
          autoClose={3000}
          closeButton={true}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition={Bounce}
        />
      </div>
    </div>
  );
}

const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files![0];
  const proContainer = document.getElementById("proContainer");
  const pBar = document.getElementById("pBar");
  const cBtn = document.getElementById("cBtn");
  const sBtn = document.getElementById("sBtn");
  const fInput = document.getElementById("fileInput");
  const fName = document.getElementById("fName");

  if (file) {
    const reader = new FileReader();

    reader.onloadstart = () => {
      proContainer!.style.display = "block";
      pBar!.style.width = "0%";
      cBtn!.style.display = "none";
      fName!.textContent = file.name;
      sBtn!.attributes.setNamedItem(document.createAttribute("disabled"));
    };
    reader.onprogress = (event) => {
      if (event.lengthComputable) {
        const progress = (event.loaded / event.total) * 100;
        pBar!.style.width = `${progress}%`;
      }
    };
    reader.onload = () => {
      const uploadTime = 2000;
      const interval = 50;
      const steps = uploadTime / interval;
      let currentStep = 0;
      const updateProgress = () => {
        const progress = (currentStep / steps) * 100;
        pBar!.style.width = `${progress}%`;
        currentStep++;

        if (currentStep <= steps) {
          setTimeout(updateProgress, interval);
        } else {
          pBar!.style.width = "100%";
          cBtn!.style.display = "block";
          sBtn!.attributes.removeNamedItem("disabled");
        }
      };
      setTimeout(updateProgress, interval);
    };
    reader.readAsDataURL(file);
  }

  cBtn!.addEventListener("click", () => {
    (fInput as any).value = "";
    pBar!.style.width = "0%";
    proContainer!.style.display = "none";
    cBtn!.style.display = "none";
  });
};
