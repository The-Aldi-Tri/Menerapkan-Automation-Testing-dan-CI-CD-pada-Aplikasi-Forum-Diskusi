/**
 * Test scenario for CommentForm component
 *
 * - CommentForm component
 *  - should render all input fields and the submit button
 *  - should display error when submitting an empty form
 *  - should dispatch thunk correctly on valid form submission
 */

import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { asyncAddComment } from "../states/threadDetail/threadDetailThunk";
import {
  renderWithProvider,
  setupStore,
} from "../test-utils/renderWithProvider";
import CommentForm from "./CommentForm";

vi.mock("../states/threadDetail/threadDetailThunk", () => ({
  asyncAddComment: vi.fn((payload) => ({
    type: "threadDetail/asyncAddComment",
    payload,
  })),
}));

describe("CommentForm component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render all input fields and the submit button", async () => {
    renderWithProvider(<CommentForm />);

    expect(screen.getByLabelText(/comment/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /Kirim Komentar/i }),
    ).toBeInTheDocument();
  });

  it("should display error when submitting an empty form", async () => {
    renderWithProvider(<CommentForm />);

    fireEvent.click(screen.getByRole("button", { name: /Kirim Komentar/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/comment must be at least 3 characters/i),
      ).toBeInTheDocument();
    });
  });

  it("should dispatch thunk correctly on valid form submission", async () => {
    const validComment = faker.lorem.sentences();
    const dummyThreadId = faker.string.uuid();
    const store = setupStore({ threadDetail: { id: dummyThreadId } });
    const storeSpy = vi.spyOn(store, "dispatch");
    renderWithProvider(<CommentForm />, { store });

    fireEvent.change(screen.getByLabelText(/comment/i), {
      target: { value: validComment },
    });
    fireEvent.click(screen.getByRole("button", { name: /Kirim Komentar/i }));

    await waitFor(() => {
      expect(storeSpy).toHaveBeenCalledWith(
        asyncAddComment({
          content: validComment,
          threadId: dummyThreadId,
        }),
      );
    });
  });
});
