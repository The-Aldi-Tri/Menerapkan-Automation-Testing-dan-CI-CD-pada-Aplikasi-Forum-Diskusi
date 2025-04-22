import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import leaderboardsReducer, { receiveLeaderboards } from "./leaderboardsSlice";

describe("leaderboards reducer", () => {
  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const result = leaderboardsReducer(initialState, action);

    expect(result).toEqual(initialState);
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

    const result = leaderboardsReducer(initialState, action);

    expect(result).toEqual(fakeLeaderboards);
  });
});
