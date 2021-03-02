/// <reference types="Cypress"/>

describe("test pizza maker functionality", () => {
    beforeEach(()=> {
        cy.visit("/")
    })

    it("tests there are inputs for contact", () => {
        cy.get(':nth-child(1) > input').type("hello")
    })
})