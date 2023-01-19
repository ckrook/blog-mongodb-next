describe("Read a Blogpost headline", () => {
  it("Should navigate to a blogpost and read the headline", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
    cy.get("#header").then(($h1) => {
      const firstMatchedDiv = $h1.find("h1").first();
    });
  });
});

describe("Navigate blogpost and home", () => {
  it("Should navigate to a blogpost and return home to homepage", () => {
    // Start from the index page
    cy.visit("http://localhost:3000/");
    cy.get("#header").then(($h1) => {
      const firstMatchedDiv = $h1.find("h1").first();
      firstMatchedDiv.click();
    });
    cy.get("#homelogolink").click();
  });

  describe("Copy blogpost url to clipboard", () => {
    it("Should navigate into a blogpost and copy a url to clipboard", () => {
      // Start from the index page
      cy.visit("http://localhost:3000/");
      cy.get("#header").then(($h1) => {
        const firstMatchedDiv = $h1.find("h1").first();
        firstMatchedDiv.click();
      });
      cy.get("button[data-id=copy-url-button]").click();
      cy.assertValueCopiedToClipboard("http://localhost:3000/post/63c666611fde9604489568c8");
    });
  });
});
