/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../../utils/api";
import { receiveLeaderboards } from "./leaderboardsSlice";

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
