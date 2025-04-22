import { faker } from "@faker-js/faker";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiService from "../../utils/api";
import { receiveLeaderboards } from "./leaderboardsSlice";
import { asyncReceiveLeaderboards } from "./leaderboardsThunk";

vi.mock("react-redux-loading-bar");
vi.mock("../../utils/api");

describe("leaderboards thunk", () => {
  describe("asyncReceiveLeaderboards", () => {
    let dispatch;

    beforeEach(() => {
      dispatch = vi.fn();
    });

    afterEach(() => {
      vi.clearAllMocks();
    });

    it("should dispatch action correctly when data fetching success", async () => {
      const fakeLeaderboards = Array.from({ length: 3 }, () => ({
        user: {
          id: faker.string.uuid(),
          name: faker.internet.username(),
          email: faker.internet.exampleEmail(),
          avatar: faker.image.avatar(),
        },
        score: faker.number.int({ min: 0, max: 100 }),
      }));
      ApiService.getLeaderboards.mockResolvedValue({
        leaderboards: fakeLeaderboards,
      });

      await asyncReceiveLeaderboards()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.getLeaderboards).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        receiveLeaderboards(fakeLeaderboards),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action and call alert correctly when data fetching failed", async () => {
      ApiService.getLeaderboards.mockRejectedValue(new Error("Network Error"));
      window.alert = vi.fn();

      await asyncReceiveLeaderboards()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
