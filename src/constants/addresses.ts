import { Networks } from "./blockchain";

const FANTOM_TESTNET = {
    DAO_ADDRESS: "0xECA30B667CDbf7126EE1A67aD55a36D24334379D",
    TIME_ADDRESS: "0xce216dFc0D56Be382078f4e73A782C6662916f19",
    MIM_ADDRESS: "0x63552f9AaD064c237da91812F1f9448C36B2A181",
    TREASURY_ADDRESS: "0x26CeE8FEA31961a7b762aCac44e7aaE8965ec1eD",
    TIME_BONDING_CALC_ADDRESS: "0x25Df1572Ff0e9673dB90C9a5db7eFa4FfA4EA71c",
    STAKING_ADDRESS: "0x166508a4ae115FF563513FDd9C98127AB5d767bd",
    MEMO_ADDRESS: "0x4FfEef03072EdfCc1d581168A32099A916e6F79d",
    STAKING_HELPER_ADDRESS: "0x862c61b6903995a79F20DF0A5F52697fb1efE0EC",

    RESERVES: {
        MIM: "0x63552f9AaD064c237da91812F1f9448C36B2A181",
        MIM_META: "",
    },
    BONDS: {
        MIM: "0x1B15905C0063651964989F9370BC49f56006cc81",
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
