describe('Statistic Page Tests', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/statistic');
    });
  
    it('TC_11: Verify that the Menu Bar on the Statistic page exists', () => {
        cy.get('#statistic-menu-bar').should('exist');
        cy.get('#descriptive > a').should('exist');
        cy.get('#distribution > a').should('exist'); 
        cy.get('#correlation > a').should('exist');
    });
  
    it('TC_12: Verify that Descriptive Component on the Menu Bar', () => {
        cy.get('#descriptive > a').click();
        cy.contains('Sensor Data Descriptive').should('be.visible');
    });
  
    it('TC_15: Verify that all weather descriptive data is shown when Descriptive menu is selected', () => {
        cy.get('#descriptive > a').click();
        cy.contains('Light').should('be.visible');
        cy.get('#light-descriptive-card > .card-body').should('exist');
        
        cy.contains('Temperature').should('be.visible');
        cy.get('#humidity-descriptive-card > .card-body').should('exist');

        cy.contains('Humidity').should('be.visible');
        cy.get('#temperature-descriptive-card > .card-body').should('exist');

        cy.contains('Pm 2.5').should('be.visible');
        cy.get('#pm-descriptive-card > .card-body').should('exist');
    });
  
    it('TC_16: Verify that clicking on each Distribution menu item routes to the correct content/section', () => {              
        cy.get('#distribution > a').click();
        cy.contains('Sensor Data Distribution').should('be.visible');
    });
  
    it('TC_19: Verify that all distribution chart is shown when Distribution menu is selected', () => {
        cy.get('#distribution > a').click();
        cy.contains('Light Distribution').should('be.visible');
        cy.get('#light-distribution').should('exist');

        cy.contains('Temperature Distribution').should('be.visible');
        cy.get('#temperature-distribution').should('exist');

        cy.contains('Humidity Distribution').scrollIntoView().should('be.visible');
        cy.get('#humidity-distribution').scrollIntoView().should('exist');

        cy.contains('Pm2.5 Distribution').scrollIntoView().should('be.visible');
        cy.get('#pm-distribution').scrollIntoView().should('exist');
    });
  
    it('TC_20: Verify that clicking on each Correlation menu item routes to the correct content/section', () => {  
        cy.get('#correlation > a').click();
        cy.contains('Sensor Data Correlation').should('be.visible');
    });

    it('TC_23: Verify that weather correlation table is shown when Distribution menu is selected', () => {
        cy.get('#correlation > a').click();
        cy.get('#weather-correlation').should('exist');
    });
  });
  