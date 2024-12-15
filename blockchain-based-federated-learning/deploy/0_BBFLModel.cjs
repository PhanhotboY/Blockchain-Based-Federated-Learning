const { ethers } = require('hardhat');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// import { ethers } from "hardhat";
// import { execSync } from "child_process";
// import fs from "fs";
// import path from "path";

module.exports = async function deploy() {
  console.log('Deploying BBFLModel...');

  const BBFLModelFactory = await ethers.getContractFactory('BBFLModel');

  /**
  {
    accuracy: 0.966093366093366,
    precision: 0.9660417517240375,
    recall: 0.966093366093366,
    f1_score: 0.9660649632769547
  }
   */
  const args = scoreModel(
    'public/models/fe49408daee4de2041a9ec4087abdc3fb187d6fc75c1753bea94ece02dd7b24d.pth'
  );

  const score =
    Object.keys(args).length /
    Object.keys(args).reduce((prev, k) => prev + 1 / args[k], 0);
  console.log('Model score:', await ethers.provider.send('eth_chainId'));

  /**
  constructor(
        string memory modelHash,
        uint256 score,
        uint256 epoch,
        uint256 learningRate,
        uint256 batchSize,
        uint256 accuracy
    )
   */
  const contract = await BBFLModelFactory.deploy(
    'fe49408daee4de2041a9ec4087abdc3fb187d6fc75c1753bea94ece02dd7b24d',
    ethers.parseEther(score.toString()),
    '10',
    ethers.parseEther('0.001'),
    '64',
    ethers.parseEther(args.accuracy.toString())
  );

  await contract.waitForDeployment();
  const address = await contract.getAddress();
  console.log(`BBFLModel deployed to: ${address}`);

  const updateEnv = async (envPath) => {
    const envServerPath = path.resolve(__dirname, envPath);
    const envServer = fs.readFileSync(envServerPath).toString();

    return envServer.replace(
      /CONTRACT_BBFLMODEL=0x[0-9a-fA-F]{40}/,
      `CONTRACT_BBFLMODEL=${address}`
    );
  };

  const envPath = path.resolve(__dirname, '../.env');
  const appEnvPath = path.resolve(__dirname, '../app/.env');
  const updatedEnv = await updateEnv(envPath);
  const updatedAppEnv = await updateEnv(appEnvPath);

  fs.cpSync('./typechain-types', './app/app/contracts/typechain-types', {
    recursive: true,
    force: true,
  });

  fs.writeFileSync(envPath, updatedEnv);
  fs.writeFileSync(appEnvPath, updatedAppEnv);
  console.log('Environment variables updated');
  process.exit(0);
};

const scoreModel = (modelPath) => {
  console.log('scoring model');
  const result = execSync(`python3 public/eval.py ${modelPath}`);

  return JSON.parse(result.toString());
};
