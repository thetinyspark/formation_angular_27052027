describe('My First Test', () => {
  it('Visits the initial project page and check title', () => {
    cy.visit('/')
    cy.contains('MyApp')
  })

  it('Visits the catalog and select a platform then checked all products platform', () => {
    cy.visit('/catalog')
    cy.get("select").select("N64");
    cy.get(".product").contains("N64");
  });

  it('Visits the catalog and search products with a certain name', () => {
    cy.visit('/catalog')
    cy.get("#search").type("Call Of");
    cy.get(".product h2").contains("Call Of");
  });

  it('should add a product to the cart then should be able to retrieve it', () => {
    cy.visit('/catalog')
    cy.get(".product button").first().click();
    cy.visit('/cart')
    cy.get(".product h2").contains("Call Of");

  });


})
