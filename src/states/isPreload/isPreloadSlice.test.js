import { describe, expect, it } from "vitest";
import isPreloadReducer, { setIsPreload } from "./isPreloadSlice";

describe("isPreload reducer", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = true;
    const action = { type: "UNKNOWN" };

    const result = isPreloadReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  it("should return the new value when given by setIsPreload action", () => {
    const initialState = true;
    const payload = false;
    const action = setIsPreload(payload);

    const result = isPreloadReducer(initialState, action);

    expect(result).toEqual(payload);
  });
});
