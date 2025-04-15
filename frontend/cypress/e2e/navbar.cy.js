describe('Navbar Functionality Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000');
    });
    
    it('TC_02: Verify Navbar renders all links correctly', () => {
        cy.get('#nav-overview > a').should('contain', 'Overview').and('have.attr', 'href', '/');
        cy.get('#nav-statistic > a').should('contain', 'Statistic').and('have.attr', 'href', '/statistic');
        cy.get('#nav-prediction > a').should('contain', 'Traffic Prediction').and('have.attr', 'href', '/prediction');
    });
    
    it('TC_03: Verify clicking on a link routes to correct page', () => {
        cy.get('#nav-statistic > a').click();
        cy.url().should('include', '/statistic');
    
        cy.get('#nav-prediction > a').click();
        cy.url().should('include', '/prediction');
    
        cy.get('#nav-overview > a').click();
        cy.url().should('eq', 'http://localhost:3000/');
    });
});