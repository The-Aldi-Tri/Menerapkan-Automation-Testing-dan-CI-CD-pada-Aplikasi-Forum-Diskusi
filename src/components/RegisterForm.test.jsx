import { faker } from "@faker-js/faker";
import "@testing-library/jest-dom";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import React from "react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { asyncRegisterUser } from "../states/authUser/authUserThunk";
import {
  renderWithProvider,
  setupStore,
} from "../test-utils/renderWithProvider";
import RegisterForm from "./RegisterForm";

vi.mock("../states/authUser/authUserThunk", () => ({
  asyncRegisterUser: vi.fn((payload) => ({
    type: "authUser/asyncRegisterUser",
    payload,
  })),
}));

describe("RegisterForm component", () => {
  afterEach(() => {
    cleanup();
    vi.clearAllMocks();
  });

  it("should render all input fields and button", async () => {
    renderWithProvider(<RegisterForm />);

    expect(screen.getByLabelText(/name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /register/i }),
    ).toBeInTheDocument();
  });

  it("should shows validation errors when submitting empty form", async () => {
    renderWithProvider(<RegisterForm />);

    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/name must be at least 3 characters/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/email is a required field/i),
      ).toBeInTheDocument();
      expect(
        screen.getByText(/password must be at least 8 characters/i),
      ).toBeInTheDocument();
    });
  });

  it("should dispatch thunk correctly on valid form submission", async () => {
    const validName = faker.person.fullName();
    const validEmail = faker.internet.exampleEmail();
    const validPassword =
      faker.string.alpha(3, { casing: "upper" }) +
      faker.string.alpha(3, { casing: "lower" }) +
      faker.string.numeric(3);
    const store = setupStore();
    const storeSpy = vi.spyOn(store, "dispatch");
    renderWithProvider(<RegisterForm />, { store });

    fireEvent.change(screen.getByLabelText(/name/i), {
      target: { value: validName },
    });
    fireEvent.change(screen.getByLabelText(/email/i), {
      target: { value: validEmail },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: validPassword },
    });
    fireEvent.click(screen.getByRole("button", { name: /register/i }));

    await waitFor(() => {
      expect(storeSpy).toHaveBeenCalledWith(
        asyncRegisterUser({
          name: validName,
          email: validEmail,
          password: validPassword,
        }),
      );
    });
  });
});
