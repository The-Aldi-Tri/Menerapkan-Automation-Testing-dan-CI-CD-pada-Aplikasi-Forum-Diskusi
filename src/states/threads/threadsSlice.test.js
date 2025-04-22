import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import threadsReducer, {
  addThread,
  receiveThreads,
  toggleDownVoteThread,
  toggleNeutralizeVoteThread,
  toggleUpVoteThread,
} from "./threadsSlice";

describe("threads reducer", () => {
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

    const result = threadsReducer(initialState, action);

    expect(result).toEqual(initialState);
  });

  it("should save threads to the state when given by receiveThreads action", () => {
    const initialState = [];
    const payload = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const action = receiveThreads(payload);

    const result = threadsReducer(initialState, action);

    expect(result).toEqual(payload);
  });

  it("should add a thread to the state when given by addThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = generateThread();
    const action = addThread(payload);

    const result = threadsReducer(initialState, action);

    expect(result).toEqual([payload, ...initialState]);
  });

  it("should toggle up vote (add up vote) thread when given by toggleUpVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    const action = toggleUpVoteThread(payload);

    const result = threadsReducer(initialState, action);

    expect(result[0].upVotesBy).toContain(payload.userId);
    expect(result[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle up vote (revert up vote) thread when given by toggleUpVoteThread action", () => {
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

    const result = threadsReducer(initialState, action);

    expect(result[0].upVotesBy).not.toContain(payload.userId);
    expect(result[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle down vote (add down vote) thread when given by toggleDownVoteThread action", () => {
    const initialState = Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateThread,
    );
    const payload = {
      threadId: initialState[0].id,
      userId: faker.string.uuid(),
    };
    const action = toggleDownVoteThread(payload);

    const result = threadsReducer(initialState, action);

    expect(result[0].upVotesBy).not.toContain(payload.userId);
    expect(result[0].downVotesBy).toContain(payload.userId);
  });

  it("should toggle down vote (revert down vote) thread when given by toggleDownVoteThread action", () => {
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

    const result = threadsReducer(initialState, action);

    expect(result[0].upVotesBy).not.toContain(payload.userId);
    expect(result[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle neutralize up vote thread when given by toggleNeutralizeVoteThread action", () => {
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

    const result = threadsReducer(initialState, action);

    expect(result[0].upVotesBy).not.toContain(payload.userId);
    expect(result[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle neutralize down vote thread when given by toggleNeutralizeVoteThread action", () => {
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

    const result = threadsReducer(initialState, action);

    expect(result[0].upVotesBy).not.toContain(payload.userId);
    expect(result[0].downVotesBy).not.toContain(payload.userId);
  });
});
