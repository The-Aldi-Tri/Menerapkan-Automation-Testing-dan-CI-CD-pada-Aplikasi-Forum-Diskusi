import { faker } from "@faker-js/faker";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiService from "../../utils/api";
import { setAuthUser } from "../authUser/authUserSlice";
import { setIsPreload } from "./isPreloadSlice";
import { asyncPreloadProcess } from "./isPreloadThunk";

vi.mock("react-redux-loading-bar");
vi.mock("../../utils/api");

describe("isPreload thunk", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("asyncPreloadProcess", () => {
    it("should dispatch action correctly when data fetching success", async () => {
      const fakeUser = {
        id: faker.string.uuid(),
        name: faker.internet.username(),
        email: faker.internet.exampleEmail(),
        avatar: faker.image.avatar(),
      };
      ApiService.getOwnProfile.mockResolvedValue({ user: fakeUser });

      await asyncPreloadProcess()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.getOwnProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(fakeUser));
      expect(dispatch).toHaveBeenCalledWith(setIsPreload(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should dispatch action correctly when data fetching failed", async () => {
      ApiService.getOwnProfile.mockRejectedValue(new Error("Network Error"));

      await asyncPreloadProcess()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(setAuthUser(null));
      expect(dispatch).toHaveBeenCalledWith(setIsPreload(false));
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
