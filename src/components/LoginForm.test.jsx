import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { asyncSetAuthUser } from "../states/authUser/authUserThunk";
import {
  renderWithProvider,
  setupStore,
} from "../test-utils/renderWithProvider";
import LoginForm from "./LoginForm";

vi.mock("../states/authUser/authUserThunk", () => ({
  asyncSetAuthUser: vi.fn((payload) => ({
    type: "authUser/asyncSetAuthUser",
    payload,
  })),
}));

describe("LoginForm component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render all input fields and button", async () => {
    renderWithProvider(<LoginForm />);

    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
  });

  it("should shows validation errors when submitting empty form", async () => {
    renderWithProvider(<LoginForm />);

    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/email is a required field/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });

  it("should dispatch thunk correctly on valid form submission", async () => {
    const validEmail = faker.internet.exampleEmail();
    const validPassword =
      faker.string.alpha(3, { casing: "upper" }) +
      faker.string.alpha(3, { casing: "lower" }) +
      faker.string.numeric(3);
    const store = setupStore();
    const storeSpy = vi.spyOn(store, "dispatch");
    renderWithProvider(<LoginForm />, { store });

    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: validEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: validPassword },
    });
    fireEvent.click(screen.getByRole("button", { name: /login/i }));

    await waitFor(() => {
      expect(storeSpy).toHaveBeenCalledWith(
        asyncSetAuthUser({
          email: validEmail,
          password: validPassword,
        }),
      );
    });
  });
});
