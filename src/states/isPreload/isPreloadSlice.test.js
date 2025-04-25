/**
 * Test scenario for isPreload reducer
 *
 * - isPreload reducer function
 *  - should return the initial state when given by unknown action
 *  - should return the new isPreload value when given by setIsPreload action
 */

import { describe, expect, it } from "vitest";
import isPreloadReducer, { setIsPreload } from "./isPreloadSlice";

describe("isPreload reducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = true;
    const action = { type: "UNKNOWN" };

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return the new isPreload value when given by setIsPreload action", () => {
    const initialState = true;
    const payload = false;
    const action = setIsPreload(payload);

    const nextState = isPreloadReducer(initialState, action);

    expect(nextState).toEqual(payload);
  });
});
