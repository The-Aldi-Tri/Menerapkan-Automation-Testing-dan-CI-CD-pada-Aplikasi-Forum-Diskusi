/* eslint-disable import/prefer-default-export */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import ApiService from "../../utils/api";
import { receiveThreads } from "../threads/threadsSlice";
import { receiveUsers } from "../users/usersSlice";

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
      const usersWithThread = users.filter((user) => ownerIds.has(user.id));

      dispatch(receiveThreads(threads));
      dispatch(receiveUsers(usersWithThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  },
);
