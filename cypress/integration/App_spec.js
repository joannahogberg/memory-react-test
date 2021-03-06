describe("My First Test", function() {
    beforeEach(() => {
        cy.visit("http://localhost:3003");

    });

    it("Does not do much!", function() {
        expect(true).to.equal(true);
    });

    it("Selects number of bricks and clicks start button to render bricks", function() {
        cy.get('select').select('4x4')
        cy.get('button').click()
        cy.get('div').last()
            .children()
            .should('have.length', 16)

    })
    it("Check click of brick to see if class gets updated", function() {
        cy.get('select').select('4x4')
            .wait(1000)
        cy.get('button')
            .wait(2000)
            .click()
            .should('have.class', 'pointer-events-none')
        cy.get('select')
            .should('have.class', 'pointer-events-none')
        cy.get('div').last()
            .children().first()
            .contains('src', 'backside.png')
            .should('not.have.class', 'pointer-events-none')

        cy.get('div').last()
            .children().last()
            .contains('src', 'backside.png')
            .should('not.have.class', 'pointer-events-none')
        cy.get('div').last()
            .children().first()
            .click()
            .not('src', 'backside.png')
            .should('have.class', 'pointer-events-none')

        cy.get('div').last()
            .children().last()
            .wait(3000)
            .click()
            .not('src', 'backside.png')
            .should('have.class', 'pointer-events-none')

    })
});