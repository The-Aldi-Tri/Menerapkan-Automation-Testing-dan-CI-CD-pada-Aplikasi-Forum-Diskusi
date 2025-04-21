import { configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserReducer from "./authUser";
import isPreloadReducer from "./isPreload";
import leaderboardsReducer from "./leaderboards";
import threadDetailReducer from "./threadDetail";
import threadsReducer from "./threads";
import usersReducer from "./users";

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
