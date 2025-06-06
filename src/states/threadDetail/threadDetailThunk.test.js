/**
 * Test scenario for threadDetail thunks
 *
 * - asyncReceiveThreadDetail thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleUpVoteThreadDetail thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleDownVoteThreadDetail thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleNeutralizeVoteThreadDetail thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncAddComment thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleUpVoteComment thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleDownVoteComment thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 * - asyncToggleNeutralizeVoteComment thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 */

import { faker } from "@faker-js/faker";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiService from "../../utils/api";
import {
  toggleDownVoteThread,
  toggleNeutralizeVoteThread,
  toggleUpVoteThread,
} from "../threads/threadsSlice";
import {
  addComment,
  clearThreadDetail,
  receiveThreadDetail,
  toggleDownVoteComment,
  toggleDownVoteThreadDetail,
  toggleNeutralizeVoteComment,
  toggleNeutralizeVoteThreadDetail,
  toggleUpVoteComment,
  toggleUpVoteThreadDetail,
} from "./threadDetailSlice";
import {
  asyncAddComment,
  asyncReceiveThreadDetail,
  asyncToggleDownVoteComment,
  asyncToggleDownVoteThreadDetail,
  asyncToggleNeutralizeVoteComment,
  asyncToggleNeutralizeVoteThreadDetail,
  asyncToggleUpVoteComment,
  asyncToggleUpVoteThreadDetail,
} from "./threadDetailThunk";

vi.mock("react-redux-loading-bar");
vi.mock("../../utils/api");

describe("threadDetail thunks", () => {
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

  const generateComment = () => ({
    id: faker.string.uuid(),
    content: faker.lorem.lines(),
    createdAt: faker.date.past().toISOString(),
    owner: {
      id: faker.string.uuid(),
      name: faker.internet.username(),
      avatar: faker.image.avatar(),
    },
    upVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    downVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
  });
  const generateThreadDetail = () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
    category: faker.word.noun(),
    createdAt: faker.date.past().toISOString(),
    owner: {
      id: faker.string.uuid(),
      name: faker.internet.username(),
      avatar: faker.image.avatar(),
    },
    upVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    downVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    comments: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateComment,
    ),
  });

  describe("asyncReceiveThreadDetail thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      const fakeThreadDetail = generateThreadDetail();
      ApiService.getThreadById.mockResolvedValue({
        detailThread: fakeThreadDetail,
      });
      const payload = fakeThreadDetail.id;

      await asyncReceiveThreadDetail(payload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearThreadDetail());
      expect(ApiService.getThreadById).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(
        receiveThreadDetail(fakeThreadDetail),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.getThreadById.mockRejectedValue(new Error("Network Error"));
      const payload = faker.string.uuid();

      await asyncReceiveThreadDetail(payload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(clearThreadDetail());
      expect(ApiService.getThreadById).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleUpVoteThreadDetail thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.upVoteThread.mockResolvedValue(undefined);
      const fakeThreadDetail = generateThreadDetail();
      const payload = fakeThreadDetail.id;

      await asyncToggleUpVoteThreadDetail(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThreadDetail({ userId: getState().authUser.id }),
      );
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

      await asyncToggleUpVoteThreadDetail(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThreadDetail({ userId: getState().authUser.id }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.upVoteThread).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThreadDetail({ userId: getState().authUser.id }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleDownVoteThreadDetail thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.downVoteThread.mockResolvedValue(undefined);
      const fakeThreadDetail = generateThreadDetail();
      const payload = fakeThreadDetail.id;

      await asyncToggleDownVoteThreadDetail(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThreadDetail({ userId: getState().authUser.id }),
      );
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

      await asyncToggleDownVoteThreadDetail(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThreadDetail({ userId: getState().authUser.id }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.downVoteThread).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThreadDetail({ userId: getState().authUser.id }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleNeutralizeVoteThreadDetail thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.neutralizeVoteThread.mockResolvedValue(undefined);
      const fakeThreadDetail = generateThreadDetail();
      const payload = fakeThreadDetail.id;

      await asyncToggleNeutralizeVoteThreadDetail(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThreadDetail({ userId: getState().authUser.id }),
      );
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

      await asyncToggleNeutralizeVoteThreadDetail(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThreadDetail({ userId: getState().authUser.id }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.neutralizeVoteThread).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThreadDetail({ userId: getState().authUser.id }),
      );
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteThread({
          threadId: payload,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncAddComment thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      const fakeThreadDetail = generateThreadDetail();
      const comment = faker.lorem.lines();
      ApiService.createComment.mockResolvedValue({ comment });
      const payload = {
        threadId: fakeThreadDetail.id,
        content: comment,
      };

      await asyncAddComment(payload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.createComment).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(addComment(comment));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.createComment.mockRejectedValue(new Error("Network Error"));
      const payload = {
        threadId: faker.string.uuid(),
        content: faker.lorem.lines(),
      };

      await asyncAddComment(payload)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.createComment).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleUpVoteComment thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.upVoteComment.mockResolvedValue(undefined);
      const fakeThreadDetail = generateThreadDetail();
      const payload = {
        threadId: fakeThreadDetail.id,
        commentId: fakeThreadDetail.comments[0].id,
      };

      await asyncToggleUpVoteComment(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.upVoteComment).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.upVoteComment.mockRejectedValue(new Error("Network Error"));
      const fakeThreadDetail = generateThreadDetail();
      const payload = {
        threadId: fakeThreadDetail.id,
        commentId: fakeThreadDetail.comments[0].id,
      };

      await asyncToggleUpVoteComment(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.upVoteComment).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleUpVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleDownVoteComment thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.downVoteComment.mockResolvedValue(undefined);
      const fakeThreadDetail = generateThreadDetail();
      const payload = {
        threadId: fakeThreadDetail.id,
        commentId: fakeThreadDetail.comments[0].id,
      };

      await asyncToggleDownVoteComment(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.downVoteComment).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.downVoteComment.mockRejectedValue(new Error("Network Error"));
      const fakeThreadDetail = generateThreadDetail();
      const payload = {
        threadId: fakeThreadDetail.id,
        commentId: fakeThreadDetail.comments[0].id,
      };

      await asyncToggleDownVoteComment(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.downVoteComment).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleDownVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncToggleNeutralizeVoteComment thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      ApiService.neutralizeVoteComment.mockResolvedValue(undefined);
      const fakeThreadDetail = generateThreadDetail();
      const payload = {
        threadId: fakeThreadDetail.id,
        commentId: fakeThreadDetail.comments[0].id,
      };

      await asyncToggleNeutralizeVoteComment(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.neutralizeVoteComment).toHaveBeenCalledWith(payload);
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.neutralizeVoteComment.mockRejectedValue(
        new Error("Network Error"),
      );
      const fakeThreadDetail = generateThreadDetail();
      const payload = {
        threadId: fakeThreadDetail.id,
        commentId: fakeThreadDetail.comments[0].id,
      };

      await asyncToggleNeutralizeVoteComment(payload)(dispatch, getState);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(ApiService.neutralizeVoteComment).toHaveBeenCalledWith(payload);
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(
        toggleNeutralizeVoteComment({
          commentId: payload.commentId,
          userId: getState().authUser.id,
        }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
