import { ContractRunner } from "ethers";

// import {
//   TokenOperator_ABI,
//   TokenClaimsIssuer_ABI,
//   EthereumDIDRegistry_ABI,
//   RewardToken_ABI,
//   PenaltyToken_ABI,
//   ReputationToken_ABI,
// } from "./artifacts/contracts";

import { BBFLModel, BBFLModel__factory } from "./typechain-types";

const contractAddresses = {
  BBFLModel: <string>process.env.VITE_CONTRACT_BBFLMODEL,
};

const contractFactories = {
  BBFLModel: BBFLModel__factory,
};

const getContract = <T>(contractName: keyof typeof contractFactories, runner?: ContractRunner) => {
  return <T>contractFactories[contractName].connect(contractAddresses[contractName], runner);
};

export const BBFLModelContract = (runner?: ContractRunner) =>
  getContract<BBFLModel>("BBFLModel", runner);
