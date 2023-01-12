describe("template spec", () => {
  beforeEach(() => {
    cy.visit("http://localhost:3000");
  });
  it("Should find our welcome text page and message", () => {
    cy.get("h1").should("contain", "A fullstack Next-Mongodb blogplatform");
  });
});
