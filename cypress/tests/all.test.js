describe("githun search app", () => {
  it("[happy] should be able to view a dropdown when entering characters", () => {
    cy.visit("/")
      .get("[data-test-id=search-input]")
      .type("type")
      .get("[data-test-id=quick-results]")
      .should("be.visible");
  });

  it("[happy] should be able to click on a recommendation and search", () => {
    cy.visit("/")
      .get("[data-test-id=search-input]")
      .type("type")
      .wait(5000)
      .get("[data-test-id=quick-results]")
      .contains("TypeScript")
      .click()
      .wait(3000)
      .get("[data-test-id=results]")
      .contains("basarat/typescript-book");
  });

  it("[happy] should be able to scroll to bottom and render more results", () => {
    cy.visit("/")
      .get("[data-test-id=search-input]")
      .type("type")
      .wait(5000)
      .get("[data-test-id=quick-results]")
      .contains("TypeScript")
      .click()
      .wait(3000);

    cy.scrollTo("bottom")
      .wait(3000)
      .get("[data-test-id=results]")
      .contains("nuxt/typescript");
  });
});
