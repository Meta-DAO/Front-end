import { ethers } from "ethers";
import { getAddresses } from "../constants";
import { MimTimeReserveContract } from "../abi";

export async function getMarketPrice(
    networkID: number,
    provider: ethers.Signer | ethers.providers.Provider,
): Promise<number> {
    if (networkID === 250) {
        const address = getAddresses(networkID);
        const pairContract = new ethers.Contract(address.RESERVES.MIM_META, MimTimeReserveContract, provider);
        const reserves = await pairContract.getReserves();
        const marketPrice = reserves[0] / reserves[1];

        return marketPrice;
    }

    return 2000000000;
}
