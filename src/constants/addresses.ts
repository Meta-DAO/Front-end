import { Networks } from "./blockchain";

const ADDRESSES = {
    MAIN_NET: {
        DAO_ADDRESS: "0x78a9e536EBdA08b5b9EDbE5785C9D1D50fA3278C",
        MEMO_ADDRESS: "0x136Acd46C134E8269052c62A67042D6bDeDde3C9",
        TIME_ADDRESS: "0xb54f16fB19478766A268F172C9480f8da1a7c9C3",
        MIM_ADDRESS: "0x130966628846BFd36ff31a822705796e8cb8C18D",
        STAKING_ADDRESS: "0x4456B87Af11e87E329AB7d7C7A246ed1aC2168B9",
        STAKING_HELPER_ADDRESS: "0x096BBfB78311227b805c968b070a81D358c13379",
        TIME_BONDING_CALC_ADDRESS: "0x819323613AbC79016f9D2443a65E9811545382a5",
        TREASURY_ADDRESS: "0x1c46450211CB2646cc1DA3c5242422967eD9e04c",
        ZAPIN_ADDRESS: "0xc669dC61aF974FdF50758d95306e4083D36f1430",
    },
    TEST_NET: {
        DAO_ADDRESS: "00x1250B6f5216Da89AA2b0d84f7B1174133a74389E",
        MEMO_ADDRESS: "0xE924d974c93EB15539f99E947337db45d0fE3230",
        TIME_ADDRESS: "0x8886Ce383eb630C0B4A53355c97D2d741387CB37", // DONE
        MIM_ADDRESS: "0x42fdD2F4a29A6274FfF537840f93aDd4F5EfeD6e", // DONE
        STAKING_ADDRESS: "0x606f30BAbcA3A2B45feC1f735236E9447D0C103a", // DONE
        STAKING_HELPER_ADDRESS: "0x02bd7b0bb6db07a4BB74379898B2d17f2D6a1Dec", // DONE
        TIME_BONDING_CALC_ADDRESS: "0x819323613AbC79016f9D2443a65E9811545382a5",
        TREASURY_ADDRESS: "0x789225BDA119Fd3BF4887660FB0ba78562f89Fb9", // DONE
        ZAPIN_ADDRESS: "0xc669dC61aF974FdF50758d95306e4083D36f1430",
    },
};

export const getAddresses = (networkID: number | string) => {
    switch (networkID) {
        case Networks.MAIN_NET:
            return ADDRESSES.MAIN_NET;
        case Networks.TEST_NET:
            return ADDRESSES.TEST_NET;
        default:
            throw Error("Network don't support");
    }
};
