import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../utils/api";

const threadsSlice = createSlice({
  name: "threads",
  initialState: [],
  reducers: {
    receiveThreads: (state, action) => action.payload,
    addThread: (state, action) => [action.payload, ...state],
    toggleUpVoteThread: (state, action) =>
      state.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy.concat(action.payload.userId),
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy,
          };
        }
        return thread;
      }),
    toggleDownVoteThread: (state, action) =>
      state.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy.concat(action.payload.userId),
          };
        }
        return thread;
      }),
    toggleNeutralizeVoteThread: (state, action) =>
      state.map((thread) => {
        if (thread.id === action.payload.threadId) {
          return {
            ...thread,
            upVotesBy: thread.upVotesBy.includes(action.payload.userId)
              ? thread.upVotesBy.filter((id) => id !== action.payload.userId)
              : thread.upVotesBy,
            downVotesBy: thread.downVotesBy.includes(action.payload.userId)
              ? thread.downVotesBy.filter((id) => id !== action.payload.userId)
              : thread.downVotesBy,
          };
        }
        return thread;
      }),
  },
});

export const {
  addThread,
  receiveThreads,
  toggleDownVoteThread,
  toggleNeutralizeVoteThread,
  toggleUpVoteThread,
} = threadsSlice.actions;

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

export default threadsSlice.reducer;
