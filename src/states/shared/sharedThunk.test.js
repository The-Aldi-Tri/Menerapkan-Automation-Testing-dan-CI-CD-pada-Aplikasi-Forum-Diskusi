/**
 * Test scenario for shared thunks
 *
 * - asyncPopulateThreadsAndUsers thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 */

import { faker } from "@faker-js/faker";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiService from "../../utils/api";
import { receiveThreads } from "../threads/threadsSlice";
import { receiveUsers } from "../users/usersSlice";
import { asyncPopulateThreadsAndUsers } from "./sharedThunk";

vi.mock("../../utils/api");
vi.mock("react-redux-loading-bar");
vi.mock("../threads/threadsSlice");
vi.mock("../users/usersSlice");

describe("shared thunk", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("asyncPopulateThreadsAndUsers thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      const fakeUsers = Array.from(
        { length: faker.number.int({ min: 10, max: 20 }) },
        () => ({
          id: faker.string.uuid(),
          name: faker.internet.username(),
          email: faker.internet.exampleEmail(),
          avatar: faker.image.avatar(),
        }),
      );
      const userIds = fakeUsers.map((user) => user.id);
      const categories = Array.from({ length: 10 }, () => faker.word.noun());
      const fakeThreads = Array.from(
        { length: faker.number.int({ min: 5, max: 9 }) },
        () => ({
          id: faker.string.uuid(),
          title: faker.lorem.sentence(),
          body: faker.lorem.paragraphs(),
          category: faker.helpers.arrayElement(categories),
          createdAt: faker.date.past().toISOString(),
          ownerId: faker.helpers.arrayElement(userIds),
          upVotesBy: faker.helpers.arrayElements(userIds),
          downVotesBy: faker.helpers.arrayElements(userIds),
          totalComments: faker.number.int(100),
        }),
      );
      ApiService.getAllUsers.mockResolvedValue({ users: fakeUsers });
      ApiService.getAllThreads.mockResolvedValue({ threads: fakeThreads });
      const ownerIds = new Set(fakeThreads.map((thread) => thread.ownerId));
      const usersWithThread = fakeUsers.filter((user) => ownerIds.has(user.id));

      await asyncPopulateThreadsAndUsers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.getAllThreads).toHaveBeenCalled();
      expect(ApiService.getAllUsers).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(receiveThreads(fakeThreads));
      expect(dispatch).toHaveBeenCalledWith(receiveUsers(usersWithThread));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      ApiService.getAllThreads.mockRejectedValue(new Error("Network Error"));
      ApiService.getAllUsers.mockRejectedValue(new Error("Network Error"));
      window.alert = vi.fn();

      await asyncPopulateThreadsAndUsers()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
