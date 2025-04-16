describe('Prediction Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/prediction');
    });
  
    it('TC_24: Verify that the weather input field is displayed', () => {
        cy.get('input').should('have.length', 4);
        cy.get('#light-input').should('exist');
        cy.get('#temperature-input').should('exist');
        cy.get('#humidity-input').should('exist');
        cy.get('#pm-input').should('exist');
    });
  
    it('TC_25: Verify that the weather input fields accept valid input and return correct values', () => {
        cy.get('#light-input').type('270').should('have.value', '270');
        cy.get('#temperature-input').type('70').should('have.value', '70');
        cy.get('#humidity-input').type('35').should('have.value', '35');
        cy.get('#pm-input').type('30').should('have.value', '30');
    });
  
    it('TC_27: Verify that the traffic flow prediction result is displayed', () => {
        cy.get('#light-input').type('270')
        cy.get('#temperature-input').type('70')
        cy.get('#humidity-input').type('35')
        cy.get('#pm-input').type('30')
        cy.get('#predict-button').click();
        cy.get('#prediction-card > .grid').should('exist');
    });
});
  