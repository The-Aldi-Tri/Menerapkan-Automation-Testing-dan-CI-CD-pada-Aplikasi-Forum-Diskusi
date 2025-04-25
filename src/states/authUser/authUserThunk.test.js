/**
 * Test scenario for authUser thunks
 *
 * - asyncSetAuthUser thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 *
 * - asyncUnsetAuthUser thunk function
 *  - should correctly dispatch action(s)
 *
 * - asyncRegisterUser thunk function
 *  - should correctly dispatch action(s) when data fetching succeeds
 *  - should correctly dispatch action(s) and call alert when data fetching fails
 */

import { faker } from "@faker-js/faker";
import { hideLoading, showLoading } from "react-redux-loading-bar";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import ApiService from "../../utils/api";
import AuthService from "../../utils/auth";
import { setAuthUser, unsetAuthUser } from "./authUserSlice";
import {
  asyncRegisterUser,
  asyncSetAuthUser,
  asyncUnsetAuthUser,
} from "./authUserThunk";

vi.mock("../../utils/api");
vi.mock("../../utils/auth");
vi.mock("react-redux-loading-bar");

describe("authUser thunks", () => {
  let dispatch;

  beforeEach(() => {
    dispatch = vi.fn();
  });

  afterEach(() => {
    vi.clearAllMocks();
  });

  describe("asyncSetAuthUser thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      const email = faker.internet.exampleEmail();
      const password = faker.internet.password();
      const token = faker.internet.jwt();
      const id = faker.string.uuid();
      const name = faker.internet.username();
      const avatar = faker.image.avatar();
      ApiService.loginUser.mockResolvedValue({ token });
      ApiService.getOwnProfile.mockResolvedValue({
        user: { id, name, email, avatar },
      });

      await asyncSetAuthUser({ email, password })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.loginUser).toHaveBeenCalledWith({ email, password });
      expect(AuthService.putAccessToken).toHaveBeenCalledWith(token);
      expect(ApiService.getOwnProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        setAuthUser({ id, name, email, avatar }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      const userData = {
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };
      ApiService.loginUser.mockRejectedValue(new Error("Network Error"));
      window.alert = vi.fn();

      await asyncSetAuthUser(userData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncUnsetAuthUser thunk function", () => {
    it("should correctly dispatch action(s)", async () => {
      await asyncUnsetAuthUser()(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(dispatch).toHaveBeenCalledWith(unsetAuthUser(null));
      expect(AuthService.putAccessToken).toHaveBeenLastCalledWith("");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });

  describe("asyncRegisterUser thunk function", () => {
    it("should correctly dispatch action(s) when data fetching succeeds", async () => {
      const email = faker.internet.exampleEmail();
      const password = faker.internet.password();
      const token = faker.internet.jwt();
      const id = faker.string.uuid();
      const name = faker.internet.username();
      const avatar = faker.image.avatar();
      ApiService.loginUser.mockResolvedValue({ token });
      ApiService.getOwnProfile.mockResolvedValue({
        user: { id, name, email, avatar },
      });

      await asyncRegisterUser({ name, email, password })(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(ApiService.registerUser).toHaveBeenCalledWith({
        name,
        email,
        password,
      });
      expect(ApiService.loginUser).toHaveBeenCalledWith({ email, password });
      expect(AuthService.putAccessToken).toHaveBeenCalledWith(token);
      expect(ApiService.getOwnProfile).toHaveBeenCalled();
      expect(dispatch).toHaveBeenCalledWith(
        setAuthUser({ id, name, email, avatar }),
      );
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });

    it("should correctly dispatch action(s) and call alert when data fetching fails", async () => {
      const registerData = {
        name: faker.internet.username(),
        email: faker.internet.exampleEmail(),
        password: faker.internet.password(),
      };
      ApiService.registerUser.mockRejectedValue(new Error("Network Error"));
      window.alert = vi.fn();

      await asyncRegisterUser(registerData)(dispatch);

      expect(dispatch).toHaveBeenCalledWith(showLoading());
      expect(window.alert).toHaveBeenCalledWith("Network Error");
      expect(dispatch).toHaveBeenCalledWith(hideLoading());
    });
  });
});
