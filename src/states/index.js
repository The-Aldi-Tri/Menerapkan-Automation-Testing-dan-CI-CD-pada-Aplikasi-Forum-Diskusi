import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserReducer from "./authUser/authUserSlice";
import isPreloadReducer from "./isPreload/isPreloadSlice";
import leaderboardsReducer from "./leaderboards/leaderboardsSlice";
import threadDetailReducer from "./threadDetail/threadDetailSlice";
import threadsReducer from "./threads/threadsSlice";
import usersReducer from "./users/usersSlice";

const store = configureStore({
  reducer: {
    authUser: authUserReducer,
    isPreload: isPreloadReducer,
    users: usersReducer,
    threads: threadsReducer,
    threadDetail: threadDetailReducer,
    leaderboards: leaderboardsReducer,
    loadingBar: loadingBarReducer,
  },
});

export default store;
