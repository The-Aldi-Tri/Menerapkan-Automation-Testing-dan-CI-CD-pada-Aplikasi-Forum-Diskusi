/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../../utils/api";
import { setAuthUser } from "../authUser/authUserSlice";
import { setIsPreload } from "./isPreloadSlice";

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
