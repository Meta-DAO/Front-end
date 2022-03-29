import { getAddresses, BONDS } from "../constants";

export const addressForAsset = (bond: string, networkID: number): string => {
    const addresses = getAddresses(networkID);

    if (bond === BONDS.mim) {
        return addresses.RESERVES.MIM;
    }

    throw Error(`Address for asset doesn't support: ${bond}`);
};
