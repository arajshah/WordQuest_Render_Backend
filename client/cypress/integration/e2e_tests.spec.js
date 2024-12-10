describe('End-to-End Tests', () => {
    // TC-E2E-01: Run full Story Mode journey from start to finish
    it('TC-E2E-01: Run full Story Mode journey from start to finish', () => {
      cy.visit('http://localhost:3000'); // Adjust the URL as needed
      cy.get('[data-testid="start-story-mode"]').click();
      cy.get('[data-testid="story-mode-level"]').should('exist');
      // Add more steps to complete the Story Mode journey
    });
  
    // TC-E2E-02: Play through a Multiplayer session, check syncing
    it('TC-E2E-02: Play through a Multiplayer session, check syncing', () => {
      cy.visit('http://localhost:3000'); // Adjust the URL as needed
      cy.get('[data-testid="start-multiplayer"]').click();
      cy.get('[data-testid="multiplayer-room"]').should('exist');
      // Add more steps to complete a Multiplayer session
    });
  
    // TC-E2E-04: Validate final score display and leaderboard view
    it('TC-E2E-04: Validate final score display and leaderboard view', () => {
      cy.visit('http://localhost:3000'); // Adjust the URL as needed
      cy.get('[data-testid="view-leaderboard"]').click();
      cy.get('[data-testid="leaderboard"]').should('exist');
      // Add more steps to validate the final score and leaderboard
    });
  });