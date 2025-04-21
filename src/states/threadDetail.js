import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../utils/api";
import {
  toggleDownVoteThread,
  toggleNeutralizeVoteThread,
  toggleUpVoteThread,
} from "./threads";

const threadDetailSlice = createSlice({
  name: "threadDetail",
  initialState: null,
  reducers: {
    receiveThreadDetail: (state, action) => action.payload,
    clearThreadDetail: () => null,
    toggleUpVoteThreadDetail: (state, action) => ({
      ...state,
      upVotesBy: state.upVotesBy.includes(action.payload.userId)
        ? state.upVotesBy.filter((id) => id !== action.payload.userId)
        : state.upVotesBy.concat(action.payload.userId),
      downVotesBy: state.downVotesBy.includes(action.payload.userId)
        ? state.downVotesBy.filter((id) => id !== action.payload.userId)
        : state.downVotesBy,
    }),
    toggleDownVoteThreadDetail: (state, action) => ({
      ...state,
      upVotesBy: state.upVotesBy.includes(action.payload.userId)
        ? state.upVotesBy.filter((id) => id !== action.payload.userId)
        : state.upVotesBy,
      downVotesBy: state.downVotesBy.includes(action.payload.userId)
        ? state.downVotesBy.filter((id) => id !== action.payload.userId)
        : state.downVotesBy.concat(action.payload.userId),
    }),
    toggleNeutralizeVoteThreadDetail: (state, action) => ({
      ...state,
      upVotesBy: state.upVotesBy.includes(action.payload.userId)
        ? state.upVotesBy.filter((id) => id !== action.payload.userId)
        : state.upVotesBy,
      downVotesBy: state.downVotesBy.includes(action.payload.userId)
        ? state.downVotesBy.filter((id) => id !== action.payload.userId)
        : state.downVotesBy,
    }),
    addComment: (state, action) => ({
      ...state,
      comments: [action.payload, ...state.comments],
    }),
    toggleUpVoteComment: (state, action) => ({
      ...state,
      comments: state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy.concat(action.payload.userId),
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy,
          };
        }
        return comment;
      }),
    }),
    toggleDownVoteComment: (state, action) => ({
      ...state,
      comments: state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy.concat(action.payload.userId),
          };
        }
        return comment;
      }),
    }),
    toggleNeutralizeVoteComment: (state, action) => ({
      ...state,
      comments: state.comments.map((comment) => {
        if (comment.id === action.payload.commentId) {
          return {
            ...comment,
            upVotesBy: comment.upVotesBy.includes(action.payload.userId)
              ? comment.upVotesBy.filter((id) => id !== action.payload.userId)
              : comment.upVotesBy,
            downVotesBy: comment.downVotesBy.includes(action.payload.userId)
              ? comment.downVotesBy.filter((id) => id !== action.payload.userId)
              : comment.downVotesBy,
          };
        }
        return comment;
      }),
    }),
  },
});

export const {
  receiveThreadDetail,
  clearThreadDetail,
  toggleUpVoteThreadDetail,
  toggleDownVoteThreadDetail,
  toggleNeutralizeVoteThreadDetail,
  addComment,
  toggleUpVoteComment,
  toggleDownVoteComment,
  toggleNeutralizeVoteComment,
} = threadDetailSlice.actions;

export const asyncReceiveThreadDetail = createAsyncThunk(
  "threadDetail/asyncReceiveThreadDetail",
  async (threadId, { dispatch }) => {
    dispatch(showLoading());

    dispatch(clearThreadDetail());

    try {
      const { detailThread: threadDetail } =
        await ApiService.getThreadById(threadId);
      dispatch(receiveThreadDetail(threadDetail));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleUpVoteThreadDetail = createAsyncThunk(
  "threadDetail/asyncToggleUpVoteThreadDetail",
  async (threadId, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    const userId = authUser.id;

    dispatch(toggleUpVoteThreadDetail({ threadId, userId }));
    dispatch(toggleUpVoteThread({ threadId, userId }));

    try {
      await ApiService.upVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteThreadDetail({ threadId, userId }));
      dispatch(toggleUpVoteThread({ threadId, userId }));
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleDownVoteThreadDetail = createAsyncThunk(
  "threadDetail/asyncToggleDownVoteThreadDetail",
  async (threadId, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    const userId = authUser.id;

    dispatch(toggleDownVoteThreadDetail({ threadId, userId }));
    dispatch(toggleDownVoteThread({ threadId, userId }));

    try {
      await ApiService.downVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteThreadDetail({ threadId, userId }));
      dispatch(toggleDownVoteThread({ threadId, userId }));
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleNeutralizeVoteThreadDetail = createAsyncThunk(
  "threadDetail/asyncToggleNeutralizeVoteThreadDetail",
  async (threadId, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    const userId = authUser.id;

    dispatch(toggleNeutralizeVoteThreadDetail({ threadId, userId }));
    dispatch(toggleNeutralizeVoteThread({ threadId, userId }));

    try {
      await ApiService.neutralizeVoteThread(threadId);
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteThreadDetail({ threadId, userId }));
      dispatch(toggleNeutralizeVoteThread({ threadId, userId }));
    }

    dispatch(hideLoading());
  },
);

export const asyncAddComment = createAsyncThunk(
  "threadDetail/asyncAddComment",
  async ({ threadId, content }, { dispatch }) => {
    dispatch(showLoading());

    try {
      const { comment } = await ApiService.createComment({ threadId, content });
      dispatch(addComment(comment));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleUpVoteComment = createAsyncThunk(
  "threadDetail/asyncToggleUpVoteComment",
  async ({ threadId, commentId }, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    const userId = authUser.id;

    dispatch(toggleUpVoteComment({ commentId, userId }));

    try {
      await ApiService.upVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleUpVoteComment({ commentId, userId }));
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleDownVoteComment = createAsyncThunk(
  "threadDetail/asyncToggleDownVoteComment",
  async ({ threadId, commentId }, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    const userId = authUser.id;

    dispatch(toggleDownVoteComment({ commentId, userId }));

    try {
      await ApiService.downVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleDownVoteComment({ commentId, userId }));
    }

    dispatch(hideLoading());
  },
);

export const asyncToggleNeutralizeVoteComment = createAsyncThunk(
  "threadDetail/asyncToggleNeutralizeVoteComment",
  async ({ threadId, commentId }, { dispatch, getState }) => {
    dispatch(showLoading());

    const { authUser } = getState();
    const userId = authUser.id;

    dispatch(toggleNeutralizeVoteComment({ commentId, userId }));

    try {
      await ApiService.neutralizeVoteComment({ threadId, commentId });
    } catch (error) {
      alert(error.message);
      dispatch(toggleNeutralizeVoteComment({ commentId, userId }));
    }

    dispatch(hideLoading());
  },
);

export default threadDetailSlice.reducer;
