/// <reference types="Cypress"/>

describe("test pizza maker functionality", () => {
    
    it("loads homepage", () => {
        cy.visit("/");
        cy.percySnapshot();
    })
})