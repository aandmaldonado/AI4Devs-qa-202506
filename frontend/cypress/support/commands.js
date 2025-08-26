// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

// Comando para navegar al dashboard principal
Cypress.Commands.add('visitDashboard', () => {
  cy.visit('/')
  cy.get('h1').should('contain', 'Dashboard del Reclutador')
})

// Comando para navegar a la página de posiciones
Cypress.Commands.add('visitPositions', () => {
  cy.visit('/positions')
  cy.get('h2').should('contain', 'Posiciones')
})

// Comando para crear una posición de prueba
Cypress.Commands.add('createTestPosition', (positionData = {}) => {
  const defaultPosition = {
    title: 'Desarrollador Full Stack Senior',
    description: 'Desarrollador con experiencia en React y Node.js',
    requirements: 'React, Node.js, TypeScript, PostgreSQL',
    salaryMin: 50000,
    salaryMax: 80000,
    location: 'Madrid',
    employmentType: 'Full-time',
    ...positionData
  }

  // Mock de la API para crear posición
  cy.intercept('POST', `${Cypress.env('apiUrl')}/positions`, {
    statusCode: 201,
    body: {
      id: 1,
      ...defaultPosition,
      status: 'Draft',
      isVisible: false
    }
  }).as('createPosition')

  // Aquí se implementaría la lógica para crear la posición
  // Por ahora retornamos los datos mock
  return defaultPosition
})

// Comando para crear un candidato de prueba
Cypress.Commands.add('createTestCandidate', (candidateData = {}) => {
  const defaultCandidate = {
    firstName: 'Juan',
    lastName: 'Pérez',
    email: 'juan.perez@example.com',
    phone: '123456789',
    address: 'Calle Test 123, Madrid',
    ...candidateData
  }

  // Mock de la API para crear candidato
  cy.intercept('POST', `${Cypress.env('apiUrl')}/candidates`, {
    statusCode: 201,
    body: {
      id: 1,
      ...defaultCandidate
    }
  }).as('createCandidate')

  return defaultCandidate
})

// Comando para mover un candidato entre etapas
Cypress.Commands.add('moveCandidateToStage', (candidateId, fromStage, toStage) => {
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

  // Simular el drag & drop
  cy.get(`[data-testid="candidate-card-${candidateId}"]`)
    .trigger('mousedown', { button: 0 })
    .trigger('mousemove', { clientX: 0, clientY: 0 })
    .get(`[data-testid="stage-column-${toStage}"]`)
    .trigger('mouseup')
    .trigger('drop')

  // Esperar a que se complete la actualización
  cy.wait('@updateCandidateStage')
})

// Comando para abrir los detalles de un candidato
Cypress.Commands.add('openCandidateDetails', (candidateId) => {
  cy.get(`[data-testid="candidate-card-${candidateId}"]`).click()
  cy.get('[data-testid="candidate-details-panel"]').should('be.visible')
})

// Comando para registrar una entrevista
Cypress.Commands.add('registerInterview', (candidateId, interviewData = {}) => {
  const defaultInterview = {
    notes: 'Entrevista técnica exitosa',
    score: 4,
    ...interviewData
  }

  // Mock de la API para crear entrevista
  cy.intercept('POST', `${Cypress.env('apiUrl')}/candidates/${candidateId}/interviews`, {
    statusCode: 201,
    body: {
      id: 1,
      applicationId: 1,
      interviewStepId: 1,
      employeeId: 1,
      interviewDate: new Date().toISOString(),
      score: defaultInterview.score,
      notes: defaultInterview.notes
    }
  }).as('createInterview')

  // Abrir formulario de entrevista
  cy.get('[data-testid="register-interview-btn"]').click()
  
  // Llenar formulario
  cy.get('[data-testid="interview-notes"]').type(defaultInterview.notes)
  cy.get(`[data-testid="star-rating-${defaultInterview.score}"]`).click()
  
  // Guardar entrevista
  cy.get('[data-testid="save-interview-btn"]').click()
  
  // Esperar a que se complete
  cy.wait('@createInterview')
})

// Comando para filtrar posiciones
Cypress.Commands.add('filterPositions', (filters = {}) => {
  if (filters.status) {
    cy.get('[data-testid="status-filter"]').select(filters.status)
  }
  
  if (filters.search) {
    cy.get('[data-testid="search-input"]').type(filters.search)
  }
  
  if (filters.date) {
    cy.get('[data-testid="date-filter"]').type(filters.date)
  }
  
  if (filters.manager) {
    cy.get('[data-testid="manager-filter"]').select(filters.manager)
  }
})

// Comando para esperar a que se cargue la página
Cypress.Commands.add('waitForPageLoad', () => {
  cy.get('body').should('not.have.class', 'loading')
  cy.get('[data-testid="loading-spinner"]').should('not.exist')
})

// Comando para verificar que no hay errores
Cypress.Commands.add('shouldHaveNoErrors', () => {
  cy.get('[data-testid="error-message"]').should('not.exist')
  cy.get('.alert-danger').should('not.exist')
})

// Comando para verificar mensaje de éxito
Cypress.Commands.add('shouldShowSuccessMessage', (message) => {
  cy.get('[data-testid="success-message"]').should('contain', message)
  cy.get('.alert-success').should('contain', message)
})

// Comando para verificar mensaje de error
Cypress.Commands.add('shouldShowErrorMessage', (message) => {
  cy.get('[data-testid="error-message"]').should('contain', message)
  cy.get('.alert-danger').should('contain', message)
})
