import { faker } from "@faker-js/faker";

describe("add new book", () => {
  const title = faker.lorem.sentence(3);
  const description = faker.lorem.sentence(5);
  const author = faker.name.fullName();

  before(() => {
    const width = Cypress.env("viewportWidth");
    const height = Cypress.env("viewportHeight");
    if (width && height) {
      cy.viewport(width, height);
    }
  });

  beforeEach(() => {
    cy.visit("/");
  });

  it("Add new favorite book", () => {
    cy.login("test@test.com", "test");
    cy.contains("Add new").click();
    cy.fillField(title, description, author);
    cy.get("#fileCover").click();
    cy.get("#favorite").dblclick();
    cy.contains("Submit").click();
    cy.get(".modal-title").should("not.exist");
    cy.contains(title).should("be.visible");
  });

  it("Add new favorite book", () => {
    cy.login("test@test.com", "test");
    cy.get(".card-title:first").click();
    cy.contains("Dowload book").should("be.visible");
  });

  it("Error when submitting a form with an empty Title field", () => {
    cy.login("test@test.com", "test");
    cy.contains("Add new").click();
    cy.contains("Submit").click();
    cy.get("#title")
      .then((element) => {
        return element[0].checkValidity();
      })
      .should("be.false");
    cy.get("#title")
      .then((element) => {
        return element[0].validationMessage;
      })
      .should("contain", "Заполните это поле.");
  });
});
