require("dotenv").config();
export const TOKEN_DECIMALS = 9;

export enum Networks {
    TEST_NET = 4002,
    MAIN_NET = 250,
}

export const currentNetwork = () => {
    const network = process.env.REACT_APP_NETWORK;

    switch (network) {
        case "mainnet":
            return Networks.MAIN_NET;
        case "testnet":
            return Networks.TEST_NET;
        default:
            return Networks.MAIN_NET;
    }
};

export const DEFAULT_NETWORK = currentNetwork();
