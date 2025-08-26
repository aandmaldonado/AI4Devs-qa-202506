class PositionsPage {
  // Elementos de la página
  elements = {
    title: () => cy.get('h2'),
    searchInput: () => cy.get('[data-testid="search-input"]'),
    statusFilter: () => cy.get('[data-testid="status-filter"]'),
    dateFilter: () => cy.get('[data-testid="date-filter"]'),
    managerFilter: () => cy.get('[data-testid="manager-filter"]'),
    positionsList: () => cy.get('[data-testid="positions-list"]'),
    positionCard: (id) => cy.get(`[data-testid="position-card-${id}"]`),
    createPositionBtn: () => cy.get('[data-testid="create-position-btn"]'),
    backToDashboardBtn: () => cy.get('[data-testid="back-to-dashboard-btn"]'),
    loadingSpinner: () => cy.get('[data-testid="loading-spinner"]'),
    errorMessage: () => cy.get('[data-testid="error-message"]'),
    successMessage: () => cy.get('[data-testid="success-message"]')
  }

  // Métodos de navegación
  visit() {
    cy.visit('/positions')
    this.waitForPageLoad()
  }

  goBackToDashboard() {
    this.elements.backToDashboardBtn().click()
    cy.url().should('include', '/')
  }

  // Métodos de búsqueda y filtrado
  searchByTitle(searchTerm) {
    this.elements.searchInput().clear().type(searchTerm)
  }

  filterByStatus(status) {
    this.elements.statusFilter().select(status)
  }

  filterByDate(date) {
    this.elements.dateFilter().type(date)
  }

  filterByManager(manager) {
    this.elements.managerFilter().select(manager)
  }

  // Métodos de validación
  shouldShowTitle(title) {
    this.elements.title().should('contain', title)
  }

  shouldShowPositions(count) {
    this.elements.positionsList().children().should('have.length', count)
  }

  shouldShowPositionWithTitle(title) {
    this.elements.positionsList().should('contain', title)
  }

  shouldShowPositionWithStatus(status) {
    this.elements.positionsList().should('contain', status)
  }

  shouldShowNoPositions() {
    this.elements.positionsList().should('contain', 'No hay posiciones disponibles')
  }

  // Métodos de interacción con posiciones
  clickPositionCard(positionId) {
    this.elements.positionCard(positionId).click()
  }

  clickViewProcess(positionId) {
    this.elements.positionCard(positionId).find('[data-testid="view-process-btn"]').click()
  }

  clickEditPosition(positionId) {
    this.elements.positionCard(positionId).find('[data-testid="edit-position-btn"]').click()
  }

  // Métodos de creación de posiciones
  clickCreatePosition() {
    this.elements.createPositionBtn().click()
  }

  // Métodos de espera
  waitForPageLoad() {
    this.elements.loadingSpinner().should('not.exist')
    this.elements.title().should('be.visible')
  }

  waitForPositionsToLoad() {
    this.elements.positionsList().should('be.visible')
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

  // Métodos de validación de filtros
  shouldShowFilteredResults(expectedCount) {
    this.elements.positionsList().children().should('have.length', expectedCount)
  }

  shouldShowActiveFilters() {
    this.elements.statusFilter().should('have.value')
    this.elements.searchInput().should('have.value')
  }

  // Métodos de limpieza de filtros
  clearAllFilters() {
    this.elements.searchInput().clear()
    this.elements.statusFilter().select('')
    this.elements.dateFilter().clear()
    this.elements.managerFilter().select('')
  }

  // Métodos de validación de datos de posición
  validatePositionCard(positionId, expectedData) {
    const card = this.elements.positionCard(positionId)
    
    if (expectedData.title) {
      card.should('contain', expectedData.title)
    }
    
    if (expectedData.status) {
      card.should('contain', expectedData.status)
    }
    
    if (expectedData.contactInfo) {
      card.should('contain', expectedData.contactInfo)
    }
    
    if (expectedData.applicationDeadline) {
      card.should('contain', expectedData.applicationDeadline)
    }
  }

  // Métodos de navegación a detalles
  navigateToPositionProcess(positionId) {
    this.clickViewProcess(positionId)
    cy.url().should('include', `/positions/${positionId}`)
  }

  navigateToEditPosition(positionId) {
    this.clickEditPosition(positionId)
    cy.url().should('include', `/positions/${positionId}/edit`)
  }
}

export default new PositionsPage()
