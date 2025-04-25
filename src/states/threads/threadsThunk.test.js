/**
 * Test scenario for threads thunks
 *
 * - asyncAddThread thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleUpVoteThread thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleDownVoteThread thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleNeutralizeVoteThread thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 */

import { faker } from "@faker-js/faker";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiService from "../../utils/api";
import {
  addThread,
  toggleDownVoteThread,
  toggleNeutralizeVoteThread,
  toggleUpVoteThread,
} from "./threadsSlice";
import {
  asyncAddThread,
  asyncToggleDownVoteThread,
  asyncToggleNeutralizeVoteThread,
  asyncToggleUpVoteThread,
} from "./threadsThunk";

vi.mock("../../utils/api");
vi.mock("react-redux-loading-bar");

describe("threads thunks", () => {
  const generateThread = () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
    category: faker.word.noun(),
    createdAt: faker.date.past().toISOString(),
    ownerId: faker.string.uuid(),
    upVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    downVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    totalComments: faker.number.int(100),
  });

  let dispatch;
  let getState;
  window.alert = vi.fn();

  beforeEach(() => {
    dispatch = vi.fn();
    getState = vi
      .fn()
      .mockReturnValue({ authUser: { id: faker.string.uuid() } });
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("asyncAddThread thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      const fakeThread = generateThread();
      ApiService.createThread.mockResolvedValue({ thread: fakeThread });
      const payload = {
        title: fakeThread.title,
        body: fakeThread.body,
        category: fakeThread.category,
      };

      await asyncAddThread(payload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.createThread).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(addThread(fakeThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.createThread.mockRejectedValue(new Error("Network Error"));
      const payload = {
        title: faker.lorem.sentence(),
        body: faker.lorem.paragraphs(),
        category: faker.word.noun(),
      };

      await asyncAddThread(payload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleUpVoteThread thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.upVoteThread.mockResolvedValue(undefined);
      const payload = faker.string.uuid();

      await asyncToggleUpVoteThread(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.upVoteThread).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.upVoteThread.mockRejectedValue(new Error("Network Error"));
      const payload = faker.string.uuid();

      await asyncToggleUpVoteThread(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleDownVoteThread thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.downVoteThread.mockResolvedValue(undefined);
      const payload = faker.string.uuid();

      await asyncToggleDownVoteThread(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.downVoteThread).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.downVoteThread.mockRejectedValue(new Error("Network Error"));
      const payload = faker.string.uuid();

      await asyncToggleDownVoteThread(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleNeutralizeVoteThread thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.neutralizeVoteThread.mockResolvedValue(undefined);
      const payload = faker.string.uuid();

      await asyncToggleNeutralizeVoteThread(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.neutralizeVoteThread).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.neutralizeVoteThread.mockRejectedValue(
        new Error("Network Error"),
      );
      const payload = faker.string.uuid();

      await asyncToggleNeutralizeVoteThread(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
