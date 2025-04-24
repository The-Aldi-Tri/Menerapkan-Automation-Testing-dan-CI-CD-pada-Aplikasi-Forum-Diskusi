import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import authUserReducer, { setAuthUser, unsetAuthUser } from "./authUserSlice";

describe("authUser reducer", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const result = authUserReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  const fakeUser = {
    id: faker.string.uuid(),
    name: faker.internet.username(),
    email: faker.internet.exampleEmail(),
    avatar: faker.image.avatar(),
  };

  it("should setAuthUser when given by setAuthUser action", () => {
    const initialState = null;
    const action = setAuthUser(fakeUser);

    const result = authUserReducer(initialState, action);

    expect(result).toEqual("fakeUser");
  });

  it("should unsetAuthUser when given by unsetAuthUser action", () => {
    const initialState = fakeUser;
    const action = unsetAuthUser();

    const result = authUserReducer(initialState, action);

    expect(result).toBe(null);
  });
});
