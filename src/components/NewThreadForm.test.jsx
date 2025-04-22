import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { asyncAddThread } from "../states/threads/threadsThunk";
import {
  renderWithProvider,
  setupStore,
} from "../test-utils/renderWithProvider";
import NewThreadForm from "./NewThreadForm";

vi.mock("../states/threads/threadsThunk", () => ({
  asyncAddThread: vi.fn((payload) => ({
    type: "threads/asyncAddThread",
    payload,
  })),
}));

describe("NewThreadForm component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render all input fields and button", async () => {
    renderWithProvider(<NewThreadForm />);

    expect(screen.getByLabelText(/judul/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/kategori/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/isi/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /buat/i })).toBeInTheDocument();
  });

  it("should shows validation errors when submitting empty form", async () => {
    renderWithProvider(<NewThreadForm />);

    fireEvent.click(screen.getByRole("button", { name: /buat/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/title must be at least 3 characters/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/category must be at least 3 characters/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/body must be at least 3 characters/i),
      ).toBeInTheDocument();
    });
  });

  it("should dispatch thunk correctly on valid form submission", async () => {
    const validTitle = faker.word.words(3);
    const validCategory = faker.word.noun();
    const validBody = faker.lorem.paragraph();
    const store = setupStore();
    const storeSpy = vi.spyOn(store, "dispatch");
    renderWithProvider(<NewThreadForm />, { store });

    fireEvent.change(screen.getByLabelText(/judul/i), {
      target: { value: validTitle },
    });
    fireEvent.change(screen.getByLabelText(/kategori/i), {
      target: { value: validCategory },
    });
    fireEvent.change(screen.getByLabelText(/isi/i), {
      target: { value: validBody },
    });
    fireEvent.click(screen.getByRole("button", { name: /buat/i }));

    await waitFor(() => {
      expect(storeSpy).toHaveBeenCalledWith(
        asyncAddThread({
          title: validTitle,
          category: validCategory,
          body: validBody,
        }),
      );
    });
  });
});
