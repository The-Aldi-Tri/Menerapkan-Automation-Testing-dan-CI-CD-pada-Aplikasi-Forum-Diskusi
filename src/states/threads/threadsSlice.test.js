/**
 * Test scenario for threads reducer
 *
 * - threads reducer function
 *  - should return the initial state when given by unknown action
 *  - should return threads when given by receiveThreads action
 *  - should add new thread when given by addThread action
 *  - should toggle up vote (add up vote) on a thread when given by toggleUpVoteThread action
 *  - should toggle up vote (revert up vote) on a thread when given by toggleUpVoteThread action
 *  - should toggle down vote (add down vote) on a thread when given by toggleDownVoteThread action
 *  - should toggle down vote (revert down vote) on a thread when given by toggleDownVoteThread action
 *  - should toggle neutralize up vote on a thread when given by toggleNeutralizeVoteThread action
 *  - should toggle neutralize down vote on a thread when given by toggleNeutralizeVoteThread action
 */

import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import threadsReducer, {
  addThread,
  receiveThreads,
  toggleDownVoteThread,
  toggleNeutralizeVoteThread,
  toggleUpVoteThread,
} from "./threadsSlice";

describe("threads reducer function", () => {
  const generateThread = () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
    category: faker.word.noun(),
    createdAt: faker.date.past().toISOString(),
    ownerId: faker.string.uuid(),
    upVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    downVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    totalComments: faker.number.int(100),
  });

  it("should return the initial state when given by unknown action", () => {
    const initialState = [];
    const action = { type: "UNKNOWN" };

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return threads when given by receiveThreads action", () => {
    const initialState = [];
    const payload = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const action = receiveThreads(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual(payload);
  });

  it("should add new thread when given by addThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = generateThread();
    const action = addThread(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState).toEqual([payload, ...initialState]);
  });

  it("should toggle up vote (add up vote) on a thread when given by toggleUpVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    const action = toggleUpVoteThread(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).toContain(payload.userId);
    expect(nextState[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle up vote (revert up vote) on a thread when given by toggleUpVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    initialState[0].upVotesBy.push(payload.userId);
    const action = toggleUpVoteThread(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle down vote (add down vote) on a thread when given by toggleDownVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    const action = toggleDownVoteThread(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState[0].downVotesBy).toContain(payload.userId);
  });

  it("should toggle down vote (revert down vote) on a thread when given by toggleDownVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    initialState[0].downVotesBy.push(payload.userId);
    const action = toggleDownVoteThread(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle neutralize up vote on a thread when given by toggleNeutralizeVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    initialState[0].upVotesBy.push(payload.userId);
    const action = toggleNeutralizeVoteThread(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle neutralize down vote on a thread when given by toggleNeutralizeVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    initialState[0].downVotesBy.push(payload.userId);
    const action = toggleNeutralizeVoteThread(payload);

    const nextState = threadsReducer(initialState, action);

    expect(nextState[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState[0].downVotesBy).not.toContain(payload.userId);
  });
});
