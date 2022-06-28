describe("Random cocktails", () => {
  describe("Home", () => {
    beforeEach(() => {
      cy.visit("/");
    });
    it("should contain expected title", () => {
      cy.contains(".site-header h1", "Random cocktails");
    });
    it("should display three drinks", () => {
      cy.get(".drink-card").should("have.length", 3);
    });
    it("should display drinks ingredients", () => {
      cy.get(".drink-card__ingredients").each(($el) => {
        cy.wrap($el).find(".tag-item").should("have.length.at.least", 1);
      });
    });
    it("should display modal with drinks details on clicking the image", () => {
      cy.get(".drink-card img").first().click();
      cy.get(".modal-layout__content").should("be.visible");
    });
  });
});
