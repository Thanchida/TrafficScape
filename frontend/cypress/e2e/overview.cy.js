describe('Overview Page Test', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000'); 
    });

    it('TC_07: Verify the light vs Speed chart displays', () => {
        cy.contains('Light vs Speed').scrollIntoView().should('be.visible');
        cy.get('#light-speed-chart').scrollIntoView().should('exist');
    });

    it('TC_08: Verify the PM2.5 vs Travel Time chart displays', () => {
        cy.contains('PM2.5 vs Travel Time').scrollIntoView().should('be.visible');
        cy.get('#pm-time-chart').scrollIntoView().should('exist');
    });

    it('TC_09: Verify the PM2.5 vs Speed chart displays correctly based on data', () => {
        cy.contains('PM2.5 vs Speed').should('be.visible');
        cy.get('#pm-speed-chart').should('exist');
    });

    it('TC_10: Verify the Correlation Matrix table displays correctly based on data', () => {
        cy.contains('Correlation Matrix').should('be.visible');
        cy.get('#traffic-weather-correlation').should('exist'); 
        cy.get('#traffic-weather-correlation').within(() => {
            cy.contains('current_speed').should('exist');
            cy.contains('pm2_5').should('exist');
            cy.contains('1.00').should('exist');
      });
    });
});
