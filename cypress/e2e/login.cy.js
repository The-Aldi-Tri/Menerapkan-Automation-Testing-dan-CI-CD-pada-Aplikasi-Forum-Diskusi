describe("login spec", () => {
  beforeEach(() => {
    cy.visit("http://127.0.0.1:5173/login");
  });

  // MUST REGISTER FIRST
  // EDIT THESE VALUES WITH YOUR OWN EMAIL AND PASSWORD
  const validEmail = "random99@gmail.com";
  const validPassword = "StrongPa5$";

  it("should display all input fields and button", () => {
    cy.get('input[autocomplete="email"]').should("be.visible");
    cy.get('input[autocomplete="current-password"]').should("be.visible");
    cy.get('button[type="submit"]').should("be.visible");
  });

  it("should show validation errors when submitting empty form", () => {
    cy.get('button[type="submit"]').click();

    cy.contains("email is a required field", { matchCase: false }).should(
      "be.visible",
    );
    cy.contains("password must be at least 8 characters", {
      matchCase: false,
    }).should("be.visible");
  });

  it("should show validation errors when email is invalid", () => {
    cy.get('input[autocomplete="email"]').type("invalid-email");
    cy.get('input[autocomplete="current-password"]').type(validEmail);
    cy.get('button[type="submit"]').click();

    cy.contains("email must be a valid email", { matchCase: false }).should(
      "be.visible",
    );
  });

  it("should show validation errors when password is too short", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("Short");
    cy.get('button[type="submit"]').click();

    cy.contains("password must be at least 8 characters", {
      matchCase: false,
    }).should("be.visible");
  });

  it("Should show validation errors when the password does not contain uppercase letter", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("lowercase");
    cy.get('button[type="submit"]').click();

    cy.contains("Must include at least one uppercase letter", {
      matchCase: false,
    }).should("be.visible");
  });

  it("Should show validation errors when the password does not contain lowercase letter", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("UPPERCASE");
    cy.get('button[type="submit"]').click();

    cy.contains("Must include at least one lowercase letter", {
      matchCase: false,
    }).should("be.visible");
  });

  it("Should show validation errors when the password does not contain number", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type("Alphabet");
    cy.get('button[type="submit"]').click();

    cy.contains("Must include at least one number", {
      matchCase: false,
    }).should("be.visible");
  });

  it("should show homepage when email and password are valid", () => {
    cy.get('input[autocomplete="email"]').type(validEmail);
    cy.get('input[autocomplete="current-password"]').type(validPassword);
    cy.get('button[type="submit"]').click();

    cy.location("pathname").should("eq", "/");
  });
});
