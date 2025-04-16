describe('Prediction Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/prediction');
    });
  
    it('Verify that the weather input field is displayed', () => {
        cy.get('input').should('have.length', 4);
        cy.get('#light-input').should('exist');
        cy.get('#temperature-input').should('exist');
        cy.get('#humidity-input').should('exist');
        cy.get('#pm-input').should('exist');
    });
  
    it('Verify that the weather input fields accept valid input and return correct values', () => {
        cy.get('#light-input').type('270', { force: true }).should('have.value', '270');
        cy.get('#temperature-input').type('70', { force: true }).should('have.value', '70');
        cy.get('#humidity-input').type('35', { force: true }).should('have.value', '35');
        cy.get('#pm-input').type('30', { force: true }).should('have.value', '30');
    });
  
    it('Verify that the traffic flow prediction result is displayed', () => {
        cy.get('#light-input').type('270', { force: true })
        cy.get('#temperature-input').type('70', { force: true })
        cy.get('#humidity-input').type('35', { force: true })
        cy.get('#pm-input').type('30', { force: true })
        cy.get('#predict-button').click();
        cy.get('#prediction-card > .grid').should('exist');
    });
});
  