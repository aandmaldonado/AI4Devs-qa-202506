class PositionDetailsPage {
  // Elementos de la página
  elements = {
    title: () => cy.get('h2'),
    backToPositionsBtn: () => cy.get('[data-testid="back-to-positions-btn"]'),
    stageColumns: () => cy.get('[data-testid="stage-column"]'),
    stageColumn: (index) => cy.get(`[data-testid="stage-column-${index}"]`),
    stageTitle: (index) => cy.get(`[data-testid="stage-column-${index}"] [data-testid="stage-title"]`),
    candidateCards: (stageIndex) => cy.get(`[data-testid="stage-column-${stageIndex}"] [data-testid="candidate-card"]`),
    candidateCard: (candidateId) => cy.get(`[data-testid="candidate-card-${candidateId}"]`),
    candidateName: (candidateId) => cy.get(`[data-testid="candidate-card-${candidateId}"] [data-testid="candidate-name"]`),
    candidateRating: (candidateId) => cy.get(`[data-testid="candidate-card-${candidateId}"] [data-testid="candidate-rating"]`),
    loadingSpinner: () => cy.get('[data-testid="loading-spinner"]'),
    errorMessage: () => cy.get('[data-testid="error-message"]'),
    successMessage: () => cy.get('[data-testid="success-message"]'),
    dragDropContext: () => cy.get('[data-testid="drag-drop-context"]')
  }

  // Métodos de navegación
  visit(positionId) {
    cy.visit(`/positions/${positionId}`)
    this.waitForPageLoad()
  }

  goBackToPositions() {
    this.elements.backToPositionsBtn().click()
    cy.url().should('include', '/positions')
  }

  // Métodos de validación de etapas
  shouldShowStageColumns(count) {
    this.elements.stageColumns().should('have.length', count)
  }

  shouldShowStageTitle(stageIndex, title) {
    this.elements.stageTitle(stageIndex).should('contain', title)
  }

  shouldShowCandidatesInStage(stageIndex, count) {
    this.elements.candidateCards(stageIndex).should('have.length', count)
  }

  // Métodos de validación de candidatos
  shouldShowCandidateInStage(candidateId, stageIndex) {
    this.elements.stageColumn(stageIndex).should('contain', candidateId)
  }

  shouldShowCandidateName(candidateId, name) {
    this.elements.candidateName(candidateId).should('contain', name)
  }

  shouldShowCandidateRating(candidateId, rating) {
    this.elements.candidateRating(candidateId).should('contain', rating)
  }

  // Métodos de drag & drop
  dragCandidateToStage(candidateId, fromStage, toStage) {
    const candidateCard = this.elements.candidateCard(candidateId)
    const targetStage = this.elements.stageColumn(toStage)

    // Mock de la API para actualizar la etapa del candidato
    cy.intercept('PUT', `${Cypress.env('apiUrl')}/candidates/${candidateId}`, {
      statusCode: 200,
      body: {
        message: 'Candidate stage updated successfully',
        data: {
          id: candidateId,
          currentInterviewStep: toStage
        }
      }
    }).as('updateCandidateStage')

    // Simular drag & drop
    candidateCard
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientX: 0, clientY: 0 })
      .then(() => {
        targetStage.trigger('mouseup').trigger('drop')
      })

    // Esperar a que se complete la actualización
    cy.wait('@updateCandidateStage')
  }

  // Métodos de validación de movimiento
  shouldMoveCandidateToStage(candidateId, stageIndex) {
    this.elements.stageColumn(stageIndex).should('contain', candidateId)
  }

  shouldRemoveCandidateFromStage(candidateId, stageIndex) {
    this.elements.stageColumn(stageIndex).should('not.contain', candidateId)
  }

  // Métodos de interacción con candidatos
  clickCandidateCard(candidateId) {
    this.elements.candidateCard(candidateId).click()
  }

  // Métodos de espera
  waitForPageLoad() {
    this.elements.loadingSpinner().should('not.exist')
    this.elements.title().should('be.visible')
    this.elements.stageColumns().should('be.visible')
  }

  waitForStagesToLoad() {
    this.elements.stageColumns().should('be.visible')
  }

  waitForCandidatesToLoad() {
    this.elements.candidateCards(0).should('be.visible')
  }

  // Métodos de verificación de estado
  shouldHaveNoErrors() {
    this.elements.errorMessage().should('not.exist')
  }

  shouldShowSuccessMessage(message) {
    this.elements.successMessage().should('contain', message)
  }

  shouldShowErrorMessage(message) {
    this.elements.errorMessage().should('contain', message)
  }

  // Métodos de validación de datos
  validateStageData(stageIndex, expectedData) {
    if (expectedData.title) {
      this.elements.stageTitle(stageIndex).should('contain', expectedData.title)
    }
    
    if (expectedData.candidateCount !== undefined) {
      this.elements.candidateCards(stageIndex).should('have.length', expectedData.candidateCount)
    }
  }

  validateCandidateData(candidateId, expectedData) {
    if (expectedData.name) {
      this.elements.candidateName(candidateId).should('contain', expectedData.name)
    }
    
    if (expectedData.rating !== undefined) {
      this.elements.candidateRating(candidateId).should('contain', expectedData.rating)
    }
  }

  // Métodos de navegación a detalles de candidato
  openCandidateDetails(candidateId) {
    this.clickCandidateCard(candidateId)
    // Aquí se abriría el panel lateral de detalles
  }

  // Métodos de validación de URL
  shouldBeOnPositionPage(positionId) {
    cy.url().should('include', `/positions/${positionId}`)
  }

  // Métodos de validación de contenido
  shouldShowPositionTitle(title) {
    this.elements.title().should('contain', title)
  }

  shouldShowBackButton() {
    this.elements.backToPositionsBtn().should('be.visible')
  }

  // Métodos de validación de drag & drop
  shouldEnableDragAndDrop() {
    this.elements.dragDropContext().should('exist')
  }

  // Métodos de validación de estados de carga
  shouldShowLoadingState() {
    this.elements.loadingSpinner().should('be.visible')
  }

  shouldHideLoadingState() {
    this.elements.loadingSpinner().should('not.exist')
  }

  // Métodos de validación de errores de API
  shouldHandleApiError() {
    this.elements.errorMessage().should('be.visible')
  }

  // Métodos de validación de éxito de API
  shouldHandleApiSuccess() {
    this.elements.successMessage().should('be.visible')
  }

  // Métodos para validación del tablero Kanban
  shouldShowPositionTitle(expectedTitle) {
    cy.get('[data-testid="position-title"]').should('contain', expectedTitle)
  }

  shouldShowAllStages(expectedStages) {
    expectedStages.forEach((stageName, index) => {
      cy.get(`[data-testid="stage-${index}"]`).should('contain', stageName)
    })
  }

  shouldShowCandidateInStage(candidateName, stageIndex) {
    cy.get(`[data-testid="stage-${stageIndex}"]`)
      .find('[data-testid="candidate-card"]')
      .should('contain', candidateName)
  }

  dragCandidateToStage(candidateName, fromStageIndex, toStageIndex) {
    // Simular drag & drop usando el nombre del candidato
    cy.get(`[data-testid="stage-${fromStageIndex}"]`)
      .find(`[data-testid="candidate-card"]:contains("${candidateName}")`)
      .trigger('mousedown', { button: 0 })
      .trigger('mousemove', { clientX: 100, clientY: 100 })
      .get(`[data-testid="stage-${toStageIndex}"]`)
      .trigger('mouseover')
      .trigger('mouseup')
  }
}

export default new PositionDetailsPage()
