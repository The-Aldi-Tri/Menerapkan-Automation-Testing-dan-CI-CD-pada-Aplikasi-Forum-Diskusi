/**
 * Test scenario for authUser reducer
 *
 * - authUser reducer function
 *  - should return the initial state when given by unknown action
 *  - should return authUser when given by setAuthUser action
 *  - should return null when given by unsetAuthUser action
 */

import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import authUserReducer, { setAuthUser, unsetAuthUser } from "./authUserSlice";

describe("authUser reducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  const fakeUser = {
    id: faker.string.uuid(),
    name: faker.internet.username(),
    email: faker.internet.exampleEmail(),
    avatar: faker.image.avatar(),
  };

  it("should return authUser when given by setAuthUser action", () => {
    const initialState = null;
    const action = setAuthUser(fakeUser);

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toEqual(fakeUser);
  });

  it("should return null when given by unsetAuthUser action", () => {
    const initialState = fakeUser;
    const action = unsetAuthUser();

    const nextState = authUserReducer(initialState, action);

    expect(nextState).toBe(null);
  });
});
