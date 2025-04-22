import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { loadingBarReducer } from "react-redux-loading-bar";
import authUserReducer from "./authUser/authUserSlice";
import isPreloadReducer from "./isPreload/isPreloadSlice";
import leaderboardsReducer from "./leaderboards/leaderboardsSlice";
import threadDetailReducer from "./threadDetail/threadDetailSlice";
import threadsReducer from "./threads/threadsSlice";
import usersReducer from "./users/usersSlice";

export const rootReducer = combineReducers({
  authUser: authUserReducer,
  isPreload: isPreloadReducer,
  users: usersReducer,
  threads: threadsReducer,
  threadDetail: threadDetailReducer,
  leaderboards: leaderboardsReducer,
  loadingBar: loadingBarReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

export default store;
