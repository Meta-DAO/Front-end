import { BONDS } from "../constants";

export const bondName = (bond: string): string => {
  if (bond === BONDS.mim) return "MIM";

  throw Error(`Bond name doesn't support: ${bond}`);
};
