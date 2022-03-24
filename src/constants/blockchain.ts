export const EPOCH_INTERVAL = 28800;
export const TOKEN_DECIMALS = 18;

export enum Networks {
  UNKNOW = 0,
  MAINNET = 1,
  RINKEBY = 4,
  // AVAX = 43114,
  AVAX = 4002,
  FANTOM = 250,
  FANTOM_TEST = 4002,
}

const SELECTED_NETWORK = process.env.REACT_APP_NETWORK === "mainnet" ? Networks.FANTOM : Networks.FANTOM_TEST;
export const DEFAULT_NETWORK = SELECTED_NETWORK;
