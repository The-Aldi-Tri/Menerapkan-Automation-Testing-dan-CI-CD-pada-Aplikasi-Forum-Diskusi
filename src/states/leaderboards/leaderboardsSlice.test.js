/**
 * Test scenario for leaderboards reducer
 *
 * - leaderboards reducer function
 *  - should return the initial state when given by unknown action
 *  - should return leaderboards when given by receiveLeaderboards action
 */

import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import leaderboardsReducer, { receiveLeaderboards } from "./leaderboardsSlice";

describe("leaderboards reducer function", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return leaderboards when given by receiveLeaderboards action", () => {
    const initialState = [];
    const fakeLeaderboards = [
      {
        user: {
          id: faker.string.uuid(),
          name: faker.internet.username(),
          email: faker.internet.exampleEmail(),
          avatar: faker.image.avatar(),
        },
        score: faker.number.int({ min: 0, max: 100 }),
      },
    ];
    const action = receiveLeaderboards(fakeLeaderboards);

    const nextState = leaderboardsReducer(initialState, action);

    expect(nextState).toEqual(fakeLeaderboards);
  });
});
