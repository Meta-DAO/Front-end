import { ethers } from "ethers";
import { getAddresses, BONDS } from "../constants";
import { MimBondContract, MimTimeBondContract, WavaxBondContract } from "../abi";

export const contractForBond = (
  bond: string,
  networkID: number,
  provider: ethers.Signer | ethers.providers.Provider,
): ethers.Contract => {
  const addresses = getAddresses(networkID);

  if (bond === BONDS.mim) {
    return new ethers.Contract(addresses.BONDS.MIM, MimBondContract, provider);
  }

  throw Error(`Contract for bond doesn't support: ${bond}`);
};
