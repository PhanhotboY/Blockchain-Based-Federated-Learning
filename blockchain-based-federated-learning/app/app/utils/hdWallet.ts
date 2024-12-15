import { HDNodeWallet } from "ethers";

import { provider } from "../db/init.jsonRpcProvider";

export const getHDNodeWallet = (pathIndex: number) => {
  return HDNodeWallet.fromPhrase(
    process.env.VITE_HARDHAT_NETWORK_ACCOUNT_MNEMONIC!,
    "",
    `m/44'/60'/0'/0/${pathIndex}`
  ).connect(provider);
};

export const getRootHDNodeWallet = () => {
  return HDNodeWallet.fromPhrase(
    process.env.VITE_HARDHAT_NETWORK_ACCOUNT_MNEMONIC!,
    "",
    "m/44'/60'/0'/0/0"
  ).connect(provider);
};
