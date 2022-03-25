import { Networks } from "./blockchain";

const FANTOM_TESTNET = {
    DAO_ADDRESS: "0x685544D90BC337e9Ff9d486c6a6B60b1B3DEb7d9",
    TIME_ADDRESS: "0xda5f7c0b5e750C5f0eC7eD2A9886fCB24DFa68da",
    MIM_ADDRESS: "0x5F31c0D4558f34ECD5DE637436324e4E2a20a30b",
    TREASURY_ADDRESS: "0x6287362496b60E87db7547d6DD13451CD4b4E79E",
    TIME_BONDING_CALC_ADDRESS: "0x47f1f07abA03D40fe39488d16Acc7Aa200455Af7",
    STAKING_ADDRESS: "0x5Ca010973433E9F4c95C2403B1c14B86eb3e791f",
    MEMO_ADDRESS: "0x9F6166693Be0C8C6b9254bb9AEF83be04D3bEEF0",
    STAKING_HELPER_ADDRESS: "0x0CfB2Baf8e059efa83a202CF1736D552eA264066",

    RESERVES: {
        MIM: "0x5F31c0D4558f34ECD5DE637436324e4E2a20a30b",
        MIM_META: "",
    },
    BONDS: {
        MIM: "0x920EaD274C1c053AbFF03c6140aed1f4B57abe2b",
        // MIM_META: "0xA184AE1A71EcAD20E822cB965b99c287590c4FFe",
    },
};

const FANTOM_MAINNET = {
    DAO_ADDRESS: "0x3aA626d2383B611a10e094F1898748AD0594C30c",
    TIME_ADDRESS: "0x4bBB7DBaB901f7F710e880B0E1Fa8648dDfd187E",
    MIM_ADDRESS: "0x82f0B8B456c1A451378467398982d4834b6829c1",
    TREASURY_ADDRESS: "0xf3670e223b7DC6B3Ffa5F425dC35f10d5D182cd6",
    TIME_BONDING_CALC_ADDRESS: "0x4c67b5CBd1C808E5B78DE03c50A07650353A304E",
    STAKING_ADDRESS: "0xd1233cED7532F0C58392B85B58E3c89Cd902f178",
    MEMO_ADDRESS: "0x77ba12b1Fa3AfC62633F0B29D39fdf104215F5Fc",
    STAKING_HELPER_ADDRESS: "0x89BDc00Fe7A0016Ac64d4Ba3329771d985CbE766",

    RESERVES: {
        MIM: "0x82f0B8B456c1A451378467398982d4834b6829c1",
        MIM_META: "0x17a89310364524f7f22a12ba2ab3b11efcc961fc",
    },
    BONDS: {
        MIM: "0x08EB6dEdbC4d5F79c9F05BB073A9564792114eb1",
        // MIM_META: "0xA184AE1A71EcAD20E822cB965b99c287590c4FFe",
    },
};

export const getAddresses = (networkID: number) => {
    if (networkID === Networks.FANTOM) return FANTOM_MAINNET;
    if (networkID == Networks.FANTOM_TEST) return FANTOM_TESTNET;

    throw Error("Network don't support");
};
