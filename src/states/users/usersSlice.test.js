/**
 * Test scenario for users reducer
 *
 * - users reducer function
 *  - should return the initial state when given by unknown action
 *  - should return users when given by receiveUsers action
 */

import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import usersReducer, { receiveUsers } from "./usersSlice";

describe("users reducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return users when given by receiveUsers action", () => {
    const initialState = [];
    const payload = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }));
    const action = receiveUsers(payload);

    const nextState = usersReducer(initialState, action);

    expect(nextState).toEqual(payload);
  });
});
