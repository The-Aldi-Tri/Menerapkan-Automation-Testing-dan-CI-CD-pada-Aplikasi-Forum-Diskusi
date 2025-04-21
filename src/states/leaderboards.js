import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../utils/api";

const leaderboardsSlice = createSlice({
  name: "leaderboards",
  initialState: [],
  reducers: {
    receiveLeaderboards: (state, action) => action.payload,
  },
});

export const { receiveLeaderboards } = leaderboardsSlice.actions;

export const asyncReceiveLeaderboards = createAsyncThunk(
  "leaderboards/asyncReceiveLeaderboards",
  async (_, { dispatch }) => {
    dispatch(showLoading());

    try {
      const { leaderboards } = await ApiService.getLeaderboards();
      dispatch(receiveLeaderboards(leaderboards));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);

export default leaderboardsSlice.reducer;
