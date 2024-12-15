import { ethers } from "ethers";

import { jsonRpcProviderConfig } from "../config/jsonRpcProvider.config";

const config = jsonRpcProviderConfig[process.env.VITE_NODE_ENV || "development"];

class JsonRpcProvider extends ethers.JsonRpcProvider {
  instance: ethers.JsonRpcProvider;

  constructor() {
    super();
    this.instance = this.initJsonRpcConnection();
  }

  initJsonRpcConnection() {
    const connection = new ethers.JsonRpcProvider(config.url);

    return connection;
  }

  getInstance() {
    if (!this.instance) this.instance = this.initJsonRpcConnection();

    return this.instance;
  }
}

const jsonRpcProvider = new JsonRpcProvider();

export const provider = jsonRpcProvider.getInstance();
