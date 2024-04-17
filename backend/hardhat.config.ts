import {HardhatUserConfig} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-gas-reporter";
import * as dotenv from "dotenv";
import "@fireblocks/hardhat-fireblocks";
import {ApiBaseUrl} from "@fireblocks/fireblocks-web3-provider";
import path from "path";
import fs from "fs";

dotenv.config();

const {
  FIREBLOCKS_API_PRIVATE_KEY_PATH,
  FIREBLOCKS_API_KEY,
  FIREBLOCKS_VAULT_ACCOUNT_IDS,
  GAS_REPORT,
  COINMARKETCAP_API_KEY,
} = process.env;

const SKIP_LOAD = process.env.SKIP_LOAD === "true";
if (!SKIP_LOAD) {
  const taskPaths = ["util"];
  taskPaths.forEach((folder) => {
    const tasksPath = path.join(__dirname, "tasks", folder);
    fs.readdirSync(tasksPath)
      .filter((_path) => _path.includes(".ts"))
      .forEach((task) => {
        require(`${tasksPath}/${task}`);
      });
  });
}

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.20",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    fuji: {
      url: "https://api.avax-test.network/ext/bc/C/rpc",
      chainId: 43113,
      fireblocks: {
        apiBaseUrl: ApiBaseUrl.Sandbox, // If using a sandbox workspace
        privateKey: FIREBLOCKS_API_PRIVATE_KEY_PATH!,
        apiKey: FIREBLOCKS_API_KEY!,
        vaultAccountIds: FIREBLOCKS_VAULT_ACCOUNT_IDS!,
      },
    },
  },
  gasReporter: {
    enabled: GAS_REPORT ? true : false,
    currency: "JPY",
    gasPrice: 20,
    token: "ETH",
    coinmarketcap: COINMARKETCAP_API_KEY,
    gasPriceApi:
      "https://api.etherscan.io/api?module=proxy&action=eth_gasPrice",
  },
  etherscan: {
    apiKey: {},
    customChains: [],
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
