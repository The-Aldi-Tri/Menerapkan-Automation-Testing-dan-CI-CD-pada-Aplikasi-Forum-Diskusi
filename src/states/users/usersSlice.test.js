import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import usersReducer, { receiveUsers } from "./usersSlice";

describe("users reducer", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const result = usersReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  it("should return the new user when given by receiveUsers action", () => {
    const initialState = [];
    const payload = Array.from({ length: 3 }, () => ({
      id: faker.string.uuid(),
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    }));
    const action = receiveUsers(payload);

    const result = usersReducer(initialState, action);

    expect(result).toEqual(payload);
  });
});
