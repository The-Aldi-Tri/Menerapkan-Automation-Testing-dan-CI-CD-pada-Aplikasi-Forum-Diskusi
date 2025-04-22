import { createSlice } from "@reduxjs/toolkit";

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

export default threadDetailSlice.reducer;
