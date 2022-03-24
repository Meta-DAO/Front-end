import { ethers } from "ethers";
import { getAddresses, BONDS } from "../../constants";
import { StakingContract, MemoTokenContract, BondingCalcContract, TimeTokenContract } from "../../abi";
import { addressForAsset, contractForReserve, setAll } from "../../helpers";
import { createSlice, createSelector, createAsyncThunk } from "@reduxjs/toolkit";
import { JsonRpcProvider } from "@ethersproject/providers";
import { getMarketPrice, getTokenPrice } from "../../helpers";

const initialState = {
  loading: true,
};

export interface IApp {
  loading: boolean;
  stakingTVL: number;
  marketPrice: number;
  marketCap: number;
  circSupply: number;
  currentIndex: string;
  currentBlock: number;
  currentBlockTime: number;
  fiveDayRate: number;
  treasuryBalance: number;
  stakingAPY: number;
  stakingRebase: number;
  networkID: number;
  nextRebase: number;
  totalSupply: number;
  rfv: number;
  runway: number;
}

interface ILoadAppDetails {
  networkID: number;
  provider: JsonRpcProvider;
}

export const loadAppDetails = createAsyncThunk(
  "app/loadAppDetails",
  //@ts-ignore
  async ({ networkID, provider }: ILoadAppDetails) => {
    const mimPrice = getTokenPrice("MIM");
    const addresses = getAddresses(networkID);
    const stakingContract = new ethers.Contract(addresses.STAKING_ADDRESS, StakingContract, provider);
    const currentBlock = await provider.getBlockNumber();

    const currentBlockTime = (await provider.getBlock(currentBlock)).timestamp;
    const memoContract = new ethers.Contract(addresses.MEMO_ADDRESS, MemoTokenContract, provider);
    // const bondCalculator = new ethers.Contract(addresses.TIME_BONDING_CALC_ADDRESS, BondingCalcContract, provider);
    const timeContract = new ethers.Contract(addresses.TIME_ADDRESS, TimeTokenContract, provider);

    const marketPrice = await getMarketPrice(networkID, provider);

    const totalSupply = (await timeContract.totalSupply()) / Math.pow(10, 9);
    const circSupply = (await memoContract.circulatingSupply()) / Math.pow(10, 9);
    const stakingTVL = circSupply * (marketPrice / Math.pow(10, 9)) * mimPrice;
    const marketCap = totalSupply * (marketPrice / Math.pow(10, 9)) * mimPrice;

    //MIM
    let token = contractForReserve(BONDS.mim, networkID, provider);
    const mimAmount = (await token.balanceOf(addresses.TREASURY_ADDRESS)) / Math.pow(10, 18);

    //MIM-META LP
    // token = contractForReserve(BONDS.mim_time, networkID, provider);
    // let mimTimeAmount = await token.balanceOf(addresses.TREASURY_ADDRESS);
    // let valuation = await bondCalculator.valuation(addressForAsset(BONDS.mim_time, networkID), mimTimeAmount);
    // let markdown = await bondCalculator.markdown(addressForAsset(BONDS.mim_time, networkID));
    // let mimTimeUSD = (valuation / Math.pow(10, 9)) * (markdown / Math.pow(10, 18));
    // const mimTimeReserves = await token.getReserves(); // 0 - mim , 1 - time

    //wAVAX
    // token = contractForReserve(BONDS.wavax, networkID, provider);

    const treasuryBalance = mimAmount;
    const rrfTreasuryBalance = mimAmount;

    const timeSupply = totalSupply;

    const rfv = rrfTreasuryBalance / timeSupply;

    const epoch = await stakingContract.epoch();
    const stakingReward = epoch.distribute;
    const currentIndex = await stakingContract.index();
    const nextRebase = epoch.endTime;
    console.log("Next Rebase: ", nextRebase);

    const circ = await memoContract.circulatingSupply();

    let stakingRebase = 0;
    let fiveDayRate = 0;
    let stakingAPY = 0;
    let treasuryRunway = 0;
    let runway = 0;

    console.log("staking reward: ", stakingReward.toString());

    if (stakingReward.toString() != "0" && circ.toString() != "0") {
      stakingRebase = stakingReward / circ;
      fiveDayRate = Math.pow(1 + stakingRebase, 5 * 3) - 1;
      stakingAPY = Math.pow(1 + stakingRebase, 365 * 3) - 1;

      treasuryRunway = rrfTreasuryBalance / circSupply;
      runway = Math.log(treasuryRunway) / Math.log(1 + stakingRebase) / 3;
    }

    return {
      currentIndex: Number(ethers.utils.formatUnits(currentIndex, "gwei")) / 4.5,
      totalSupply,
      marketCap,
      currentBlock,
      circSupply,
      fiveDayRate,
      treasuryBalance,
      stakingAPY,
      stakingTVL,
      stakingRebase,
      marketPrice: (marketPrice / Math.pow(10, 9)) * mimPrice,
      currentBlockTime,
      nextRebase,
      rfv,
      runway,
    };
  },
);

const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    fetchAppSuccess(state, action) {
      setAll(state, action.payload);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(loadAppDetails.pending, (state, action) => {
        state.loading = true;
      })
      .addCase(loadAppDetails.fulfilled, (state, action) => {
        setAll(state, action.payload);
        state.loading = false;
      })
      .addCase(loadAppDetails.rejected, (state, { error }) => {
        state.loading = false;
        console.log(error);
      });
  },
});

const baseInfo = (state: { app: IApp }) => state.app;

export default appSlice.reducer;

export const { fetchAppSuccess } = appSlice.actions;

export const getAppState = createSelector(baseInfo, app => app);
