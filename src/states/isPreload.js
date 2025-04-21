import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../utils/api";
import { setAuthUser } from "./authUser";

const isPreloadSlice = createSlice({
  name: "isPreload",
  initialState: true,
  reducers: {
    setIsPreload: (state, action) => action.payload,
  },
});

export const { setIsPreload } = isPreloadSlice.actions;

export const asyncPreloadProcess = createAsyncThunk(
  "isPreload/asyncPreloadProcess",
  async (_, { dispatch }) => {
    dispatch(showLoading());

    try {
      const { user: authUser } = await ApiService.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      dispatch(setAuthUser(null));
    }

    dispatch(setIsPreload(false));
    dispatch(hideLoading());
  },
);

export default isPreloadSlice.reducer;
