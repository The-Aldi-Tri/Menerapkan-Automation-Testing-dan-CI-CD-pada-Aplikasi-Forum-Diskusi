import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../utils/api";
import { receiveThreads } from "./threads";
import { receiveUsers } from "./users";

// eslint-disable-next-line import/prefer-default-export
export const asyncPopulateThreadsAndUsers = createAsyncThunk(
  "shared/asyncPopulateThreadsAndUsers",
  async (_, { dispatch }) => {
    dispatch(showLoading());

    try {
      const [{ threads }, { users }] = await Promise.all([
        ApiService.getAllThreads(),
        ApiService.getAllUsers(),
      ]);

      const ownerIds = new Set(threads.map((thread) => thread.ownerId));
      const usersWithThreads = users.filter((user) => ownerIds.has(user.id));

      dispatch(receiveThreads(threads));
      dispatch(receiveUsers(usersWithThreads));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);
