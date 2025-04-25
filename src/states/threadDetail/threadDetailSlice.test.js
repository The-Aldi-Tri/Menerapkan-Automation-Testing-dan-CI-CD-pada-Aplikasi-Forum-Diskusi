/**
 * Test scenario for threadDetail reducer
 *
 * - threadDetail reducer function
 *  - should return the initial state when given by unknown action
 *  - should return threadDetail when given by receiveThreadDetail action
 *  - should return null when given by clearThreadDetail action
 *  - should toggle up vote (add up vote) on threadDetail when given by toggleUpVoteThreadDetail action
 *  - should toggle up vote (revert up vote) on threadDetail when given by toggleUpVoteThreadDetail action
 *  - should toggle down vote (add down vote) on threadDetail when given by toggleDownVoteThreadDetail action
 *  - should toggle down vote (revert down vote) on threadDetail when given by toggleDownVoteThreadDetail action
 *  - should neutralize up vote on threadDetail when given by toggleNeutralizeVoteThreadDetail action
 *  - should neutralize down vote on threadDetail when given by toggleNeutralizeVoteThreadDetail action
 *  - should add comment on threadDetail when given by addComment action
 *  - should toggle up vote (add up vote) on comment when given by toggleUpVoteComment action
 *  - should toggle up vote (revert up vote) on comment when given by toggleUpVoteComment action
 *  - should toggle down vote (add down vote) on comment when given by toggleDownVoteComment action
 *  - should toggle down vote (revert down vote) on comment when given by toggleDownVoteComment action
 *  - should neutralize up vote on comment when given by toggleNeutralizeVoteComment action
 *  - should neutralize down vote on comment when given by toggleNeutralizeVoteComment action
 */

import { faker } from "@faker-js/faker";
import { describe, expect, it } from "vitest";
import threadDetailReducer, {
  addComment,
  clearThreadDetail,
  receiveThreadDetail,
  toggleDownVoteComment,
  toggleDownVoteThreadDetail,
  toggleNeutralizeVoteComment,
  toggleNeutralizeVoteThreadDetail,
  toggleUpVoteComment,
  toggleUpVoteThreadDetail,
} from "./threadDetailSlice";

describe("threadDetail reducer function", () => {
  const generateComment = () => ({
    id: faker.string.uuid(),
    content: faker.lorem.lines(),
    createdAt: faker.date.past().toISOString(),
    owner: {
      id: faker.string.uuid(),
      name: faker.internet.username(),
      avatar: faker.image.avatar(),
    },
    upVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    downVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
  });
  const generateThreadDetail = () => ({
    id: faker.string.uuid(),
    title: faker.lorem.sentence(),
    body: faker.lorem.paragraphs(),
    category: faker.word.noun(),
    createdAt: faker.date.past().toISOString(),
    owner: {
      id: faker.string.uuid(),
      name: faker.internet.username(),
      avatar: faker.image.avatar(),
    },
    upVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    downVotesBy: Array.from({ length: faker.number.int(10) }, () =>
      faker.string.uuid(),
    ),
    comments: Array.from(
      { length: faker.number.int({ min: 1, max: 10 }) },
      generateComment,
    ),
  });

  it("should return the initial state when given by unknown action", () => {
    const initialState = null;
    const action = { type: "UNKNOWN" };

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(initialState);
  });

  it("should return threadDetail when given by receiveThreadDetail action", () => {
    const initialState = null;
    const payload = generateThreadDetail();
    const action = receiveThreadDetail(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toEqual(payload);
  });

  it("should return null when given by clearThreadDetail action", () => {
    const initialState = generateThreadDetail();
    const action = clearThreadDetail();

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState).toBeNull();
  });

  it("should toggle up vote (add up vote) on threadDetail when given by toggleUpVoteThreadDetail action", () => {
    const initialState = generateThreadDetail();
    const payload = { userId: faker.string.uuid() };
    const action = toggleUpVoteThreadDetail(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).toContain(payload.userId);
    expect(nextState.downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle up vote (revert up vote) on threadDetail when given by toggleUpVoteThreadDetail action", () => {
    const initialState = generateThreadDetail();
    const payload = { userId: faker.string.uuid() };
    initialState.upVotesBy.push(payload.userId);
    const action = toggleUpVoteThreadDetail(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain(payload.userId);
    expect(nextState.downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle down vote (add down vote) on threadDetail when given by toggleDownVoteThreadDetail action", () => {
    const initialState = generateThreadDetail();
    const payload = { userId: faker.string.uuid() };
    const action = toggleDownVoteThreadDetail(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain(payload.userId);
    expect(nextState.downVotesBy).toContain(payload.userId);
  });

  it("should toggle down vote (revert down vote) on threadDetail when given by toggleDownVoteThreadDetail action", () => {
    const initialState = generateThreadDetail();
    const payload = { userId: faker.string.uuid() };
    initialState.downVotesBy.push(payload.userId);
    const action = toggleDownVoteThreadDetail(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain(payload.userId);
    expect(nextState.downVotesBy).not.toContain(payload.userId);
  });

  it("should neutralize up vote on threadDetail when given by toggleNeutralizeVoteThreadDetail action", () => {
    const initialState = generateThreadDetail();
    const payload = { userId: faker.string.uuid() };
    initialState.upVotesBy.push(payload.userId);
    const action = toggleNeutralizeVoteThreadDetail(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain(payload.userId);
    expect(nextState.downVotesBy).not.toContain(payload.userId);
  });

  it("should neutralize down vote on threadDetail when given by toggleNeutralizeVoteThreadDetail action", () => {
    const initialState = generateThreadDetail();
    const payload = { userId: faker.string.uuid() };
    initialState.downVotesBy.push(payload.userId);
    const action = toggleNeutralizeVoteThreadDetail(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.upVotesBy).not.toContain(payload.userId);
    expect(nextState.downVotesBy).not.toContain(payload.userId);
  });

  it("should add comment on threadDetail when given by addComment action", () => {
    const initialState = generateThreadDetail();
    const payload = generateComment();
    const action = addComment(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments).toContain(payload);
  });

  it("should toggle up vote (add up vote) on comment when given by toggleUpVoteComment action", () => {
    const initialState = generateThreadDetail();
    const payload = {
      userId: faker.string.uuid(),
      commentId: initialState.comments[0].id,
    };
    const action = toggleUpVoteComment(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).toContain(payload.userId);
    expect(nextState.comments[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle up vote (revert up vote) on comment when given by toggleUpVoteComment action", () => {
    const initialState = generateThreadDetail();
    const payload = {
      userId: faker.string.uuid(),
      commentId: initialState.comments[0].id,
    };
    initialState.comments[0].upVotesBy.push(payload.userId);
    const action = toggleUpVoteComment(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState.comments[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should toggle down vote (add down vote) on comment when given by toggleDownVoteComment action", () => {
    const initialState = generateThreadDetail();
    const payload = {
      userId: faker.string.uuid(),
      commentId: initialState.comments[0].id,
    };
    const action = toggleDownVoteComment(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState.comments[0].downVotesBy).toContain(payload.userId);
  });

  it("should toggle down vote (revert down vote) on comment when given by toggleDownVoteComment action", () => {
    const initialState = generateThreadDetail();
    const payload = {
      userId: faker.string.uuid(),
      commentId: initialState.comments[0].id,
    };
    initialState.comments[0].downVotesBy.push(payload.userId);
    const action = toggleDownVoteComment(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState.comments[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should neutralize up vote on comment when given by toggleNeutralizeVoteComment action", () => {
    const initialState = generateThreadDetail();
    const payload = {
      userId: faker.string.uuid(),
      commentId: initialState.comments[0].id,
    };
    initialState.comments[0].upVotesBy.push(payload.userId);
    const action = toggleNeutralizeVoteComment(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState.comments[0].downVotesBy).not.toContain(payload.userId);
  });

  it("should neutralize down vote on comment when given by toggleNeutralizeVoteComment action", () => {
    const initialState = generateThreadDetail();
    const payload = {
      userId: faker.string.uuid(),
      commentId: initialState.comments[0].id,
    };
    initialState.comments[0].downVotesBy.push(payload.userId);
    const action = toggleNeutralizeVoteComment(payload);

    const nextState = threadDetailReducer(initialState, action);

    expect(nextState.comments[0].upVotesBy).not.toContain(payload.userId);
    expect(nextState.comments[0].downVotesBy).not.toContain(payload.userId);
  });
});
