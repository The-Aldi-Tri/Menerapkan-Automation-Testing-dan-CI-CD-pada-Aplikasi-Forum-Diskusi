import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../../utils/api";
import AuthService from "../../utils/auth";
import { setAuthUser, unsetAuthUser } from "./authUserSlice";

export const asyncSetAuthUser = createAsyncThunk(
  "authUser/asyncSetAuthUser",
  async ({ email, password }, { dispatch }) => {
    dispatch(showLoading());

    try {
      const { token } = await ApiService.loginUser({ email, password });
      AuthService.putAccessToken(token);
      const { user: authUser } = await ApiService.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);

export const asyncUnsetAuthUser = createAsyncThunk(
  "authUser/asyncUnsetAuthUser",
  async (_, { dispatch }) => {
    dispatch(showLoading());

    dispatch(unsetAuthUser(null));
    AuthService.putAccessToken("");

    dispatch(hideLoading());
  },
);

export const asyncRegisterUser = createAsyncThunk(
  "authUser/asyncRegisterUser",
  async ({ name, email, password }, { dispatch }) => {
    dispatch(showLoading());

    try {
      await ApiService.registerUser({ name, email, password });
      const { token } = await ApiService.loginUser({ email, password });
      AuthService.putAccessToken(token);
      const { user: authUser } = await ApiService.getOwnProfile();
      dispatch(setAuthUser(authUser));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);
