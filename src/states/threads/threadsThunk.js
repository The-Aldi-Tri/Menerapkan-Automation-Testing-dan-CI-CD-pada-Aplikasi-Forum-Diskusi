import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../../utils/api";
import {
  addThread,
  toggleDownVoteThread,
  toggleNeutralizeVoteThread,
  toggleUpVoteThread,
} from "./threadsSlice";

export const asyncAddThread = createAsyncThunk(
  "threads/asyncAddThread",
  async ({ title, body, category }, { dispatch }) => {
    dispatch(showLoading());

    try {
      const { thread } = await ApiService.createThread({
        title,
        body,
        category,
      });
      dispatch(addThread(thread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleUpVoteThread = createAsyncThunk(
  "threads/asyncToggleUpVoteThread",
  async (threadId, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));

    try {
      await ApiService.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThread({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleDownVoteThread = createAsyncThunk(
  "threads/asyncToggleDownVoteThread",
  async (threadId, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));

    try {
      await ApiService.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThread({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleNeutralizeVoteThread = createAsyncThunk(
  "threads/asyncToggleNeutralizeVoteThread",
  async (threadId, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    dispatch(toggleNeutralizeVoteThread({ threadId, userId: authUser.id }));

    try {
      await ApiService.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThread({ threadId, userId: authUser.id }));
    }

    dispatch(hideLoading());
  },
);
