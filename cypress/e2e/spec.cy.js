/// <reference types="cypress" />

describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Should find our h1 tag on startpage", () => {
    cy.get("h2").should("contain", "All blogposts");
  });
  it("Find blogpost", () => {
    cy.get("h1").should("contain", "First blogpost in the world");
  });
  it("Read blogpost", () => {
    cy.get("h1").click();
    cy.get("h1").should("contain", "First blogpost in the world");
  });
});
