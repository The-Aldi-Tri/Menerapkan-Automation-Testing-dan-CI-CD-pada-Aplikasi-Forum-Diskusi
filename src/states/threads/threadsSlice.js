import { createSlice } from "@reduxjs/toolkit";

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
export default threadsSlice.reducer;
