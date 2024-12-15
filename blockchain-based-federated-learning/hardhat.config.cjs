const { readdirSync } = require('fs');

// require('@nomicfoundation/hardhat-toolbox');
require('@nomicfoundation/hardhat-ethers');
require('@typechain/hardhat');
const { task } = require('hardhat/config');

require('dotenv').config();

module.exports = {
  solidity: '0.8.28',
  defaultNetwork: 'localhost',
  networks: {
    hardhat: {
      chainId: 1337,
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: process.env.HARDHAT_NETWORK_ACCOUNT_MNEMONIC,
      },
    },
    sepolia: {
      url: '',
      chainId: 11155111,
      accounts: {
        mnemonic: '',
      },
    },
    localhost: {
      chainId: 1337,
      url: 'http://localhost:8545',
      allowUnlimitedContractSize: true,
      accounts: {
        mnemonic: process.env.HARDHAT_NETWORK_ACCOUNT_MNEMONIC,
      },
    },
  },
};

task('deploy', 'Deploy the contract', async (args, hre) => {
  const files = readdirSync('./deploy');

  await Promise.all(
    files.map(async (file) => {
      const deploy = require(`./deploy/${file}`);
      await deploy(hre);
    })
  );
});
