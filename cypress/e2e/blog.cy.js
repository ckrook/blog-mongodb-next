// describe("Login", () => {
//   it("should login through the Google auth flow", () => {
//     // Start from the index page
//     cy.visit("http://localhost:3000/");

//     // Find a link with an href attribute containing "about" and click it
//     cy.get("#signin").click();
//     cy.get(".button").click();
//     cy.origin("https://accounts.google.com", () => {
//       cy.get("input[type=email]").type("charles.krook@gmail.com");
//       cy.get(".VfPpkd-LgbsSe-OWXEXe-k8QpJ").click();
//       cy.get("input[type=password]").type("Google.1234");
//       cy.get(".VfPpkd-LgbsSe-OWXEXe-k8QpJ").click();
//     });
//   });
// });

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
});
