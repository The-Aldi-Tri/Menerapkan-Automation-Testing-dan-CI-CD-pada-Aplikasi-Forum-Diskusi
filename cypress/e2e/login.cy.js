/**
 * Test scenario for login flow
 *
 * - login spec
 *  - should display all input fields and the submit button
 *  - should display error when email and password are empty
 *  - should display error when email format is invalid
 *  - should display error when password is too short
 *  - should display error when password does not contain uppercase letter
 *  - should display error when password does not contain lowercase letter
 *  - should display error when password does not contain number
 *  - should redirect to homepage when email and password are valid
 */

// eslint-disable-next-line import/no-extraneous-dependencies
import { faker } from "@faker-js/faker";

describe("login spec", () => {
  const validEmail = faker.internet.exampleEmail();
  const validPassword =
    faker.string.alpha(3, { casing: "upper" }) +
    faker.string.alpha(3, { casing: "lower" }) +
    faker.string.numeric(3);

  before(() => {
    // Create (register) an account for login
    cy.request("POST", "https://forum-api.dicoding.dev/v1/register", {
      name: faker.internet.username(),
      email: validEmail,
      password: validPassword,
    });
  });

  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/login");
  });

  it("should display all input fields and the submit button", () => {
    cy.get('input[autocomplete="email"]').should("be.visible");
    cy.get('input[autocomplete="current-password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should display error when email and password are empty", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("email is a required field", { matchCase: false }).should(
      "be.visible",
    );
    cy.contains("password must be at least 8 characters", {
      matchCase: false,
    }).should("be.visible");
  });

  it("should display error when email format is invalid", () => {
    cy.get('input[autocomplete="email"]').type("invalid-email");
    cy.get('input[autocomplete="current-password"]').type(validEmail);
    cy.get('button[type="submit"]').click();

    cy.contains("email must be a valid email", { matchCase: false }).should(
      "be.visible",
    );
  });

  it("should display error when password is too short", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("Short");
    cy.get('button[type="submit"]').click();

    cy.contains("password must be at least 8 characters", {
      matchCase: false,
    }).should("be.visible");
  });

  it("should display error when password does not contain uppercase letter", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("lowercase");
    cy.get('button[type="submit"]').click();

    cy.contains("Must include at least one uppercase letter", {
      matchCase: false,
    }).should("be.visible");
  });

  it("should display error when password does not contain lowercase letter", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("UPPERCASE");
    cy.get('button[type="submit"]').click();

    cy.contains("Must include at least one lowercase letter", {
      matchCase: false,
    }).should("be.visible");
  });

  it("should display error when password does not contain number", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("Alphabet");
    cy.get('button[type="submit"]').click();

    cy.contains("Must include at least one number", {
      matchCase: false,
    }).should("be.visible");
  });

  it("should redirect to homepage when email and password are valid", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.location("pathname").should("eq", "/");
  });
});
