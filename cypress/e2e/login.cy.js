describe("login page", () => {
  beforeEach(() => {
    if (Cypress.env("view-port")) {
      cy.viewport();
    }
    cy.visit("/");
  });

  it("Should open the main page", () => {
    cy.contains("Books list");
  });

  it("logins user", () => {
    cy.login("test@test.com", "test");
    cy.contains("Добро пожаловать test@test.com").should("be.visible");
  });

  it("fails to login with empty login", () => {
    cy.login(null, "test");
    cy.get("#mail")
      .then((element) => {
        return element[0].checkValidity();
      })
      .should("be.false");
    cy.get("#mail")
      .then((element) => {
        return element[0].validationMessage;
      })
      .should("contain", "Заполните это поле.");
  });

  it("fails to login with empty password", () => {
    cy.login("test@test.com", null);
    cy.get("#pass")
      .then((element) => {
        return element[0].checkValidity();
      })
      .should("be.false");
    cy.get("#pass")
      .then((element) => {
        return element[0].validationMessage;
      })
      .should("contain", "Заполните это поле.");
  });
});
