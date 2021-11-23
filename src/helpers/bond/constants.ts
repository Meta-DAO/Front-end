import { Networks } from "../../constants/blockchain";

export enum BondType {
    StableAsset,
    LP,
}

export interface BondAddresses {
    reserveAddress: string;
    bondAddress: string;
}

export type NetworkAddresses = {
    [key in [4002, 250] as number]: BondAddresses;
};
