import PositionsPage from '../../support/page-objects/PositionsPage'
import PositionDetailsPage from '../../support/page-objects/PositionDetailsPage'
import CandidateDetailsPanel from '../../support/page-objects/CandidateDetailsPanel'

describe('Interfaz de Posiciones - LTI-ATS', () => {
  beforeEach(() => {
    // Usar datos reales del backend en lugar de mocks
    cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'Senior Full-Stack Engineer',
          status: 'Open',
          contactInfo: 'John Doe',
          applicationDeadline: '2024-12-31',
          isVisible: true
        },
        {
          id: 2,
          title: 'UX/UI Designer',
          status: 'Open',
          contactInfo: 'Jane Smith',
          applicationDeadline: '2024-11-30',
          isVisible: true
        }
      ]
    }).as('getPositions')

    // Usar datos reales del backend para el flujo de entrevistas
    cy.intercept('GET', `${Cypress.env('apiUrl')}/positions/1/interviewFlow`, {
      statusCode: 200,
      body: {
        interviewFlow: {
          positionName: 'Senior Full-Stack Engineer',
          interviewFlow: {
            id: 1,
            description: 'Standard development interview process',
            interviewSteps: [
              {
                id: 1,
                name: 'Initial Screening',
                orderIndex: 1
              },
              {
                id: 2,
                name: 'Technical Interview',
                orderIndex: 2
              },
              {
                id: 3,
                name: 'Manager Interview',
                orderIndex: 3
              }
            ]
          }
        }
      }
    }).as('getInterviewFlow')

    // Usar datos reales del backend para candidatos
    cy.intercept('GET', `${Cypress.env('apiUrl')}/positions/1/candidates`, {
      statusCode: 200,
      body: [
        {
          fullName: 'John Doe',
          currentInterviewStep: 'Initial Screening',
          candidateId: 1,
          applicationId: 1,
          averageScore: 5
        },
        {
          fullName: 'Jane Smith',
          currentInterviewStep: 'Manager Interview',
          candidateId: 2,
          applicationId: 3,
          averageScore: 4
        },
        {
          fullName: 'Carlos García',
          currentInterviewStep: 'Manager Interview',
          candidateId: 3,
          applicationId: 4,
          averageScore: 0
        }
      ]
    }).as('getCandidates')
  })

  describe('Carga de la Página de Position', () => {
    it('debe cargar la lista de posiciones correctamente', () => {
      PositionsPage.visit()
      
      // Verificar que el título se muestra correctamente
      PositionsPage.shouldShowTitle('Posiciones')
      
      // Verificar que se cargan las posiciones
      cy.wait('@getPositions')
      PositionsPage.shouldShowPositions(2)
      
      // Verificar información de cada posición
      PositionsPage.shouldShowPositionWithTitle('Senior Full-Stack Engineer')
      PositionsPage.shouldShowPositionWithTitle('UX/UI Designer')
      PositionsPage.shouldShowPositionWithStatus('Open')
    })

    it('debe mostrar las columnas correspondientes a cada fase del proceso de contratación', () => {
      // Navegar a la vista del proceso de una posición
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Verificar que se cargan las etapas del proceso
      cy.wait('@getInterviewFlow')
      PositionDetailsPage.shouldShowStageColumns(3)
      
      // Verificar títulos de las etapas
      PositionDetailsPage.shouldShowStageTitle(0, 'Initial Screening')
      PositionDetailsPage.shouldShowStageTitle(1, 'Technical Interview')
      PositionDetailsPage.shouldShowStageTitle(2, 'Manager Interview')
    })

    it('debe mostrar las tarjetas de los candidatos en la columna correcta según su fase actual', () => {
      // Navegar a la vista del proceso
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Verificar que los candidatos aparecen en las columnas correctas
      PositionDetailsPage.shouldShowCandidatesInStage(0, 1) // Initial Screening
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1) // Technical Interview
      PositionDetailsPage.shouldShowCandidatesInStage(2, 1) // Manager Interview
      
      // Verificar nombres de candidatos en cada etapa
      PositionDetailsPage.shouldShowCandidateName(1, 'John Doe')
      PositionDetailsPage.shouldShowCandidateName(2, 'Jane Smith')
      PositionDetailsPage.shouldShowCandidateName(3, 'Carlos García')
    })
  })

  describe('Cambio de Fase de un Candidato', () => {
    it('debe permitir arrastrar una tarjeta de candidato de una columna a otra', () => {
      // Navegar a la vista del proceso
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Verificar estado inicial
      PositionDetailsPage.shouldShowCandidatesInStage(0, 1) // Initial Screening
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1) // Technical Interview
      
      // Mover candidato de "Initial Screening" a "Manager Interview"
      PositionDetailsPage.dragCandidateToStage(1, 0, 2)
      
      // Verificar que el candidato se movió correctamente
      PositionDetailsPage.shouldMoveCandidateToStage(1, 2)
      PositionDetailsPage.shouldRemoveCandidateFromStage(1, 0)
      
      // Verificar que se mantiene el candidato en "Technical Interview"
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1)
    })

    it('debe verificar que la tarjeta del candidato se mueve a la nueva columna', () => {
      // Navegar a la vista del proceso
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Mover candidato
      PositionDetailsPage.dragCandidateToStage(1, 0, 2)
      
      // Verificar movimiento visual
      PositionDetailsPage.shouldShowCandidatesInStage(2, 1)
      PositionDetailsPage.shouldShowCandidatesInStage(0, 0)
    })

    it('debe verificar que la fase del candidato se actualiza correctamente en el backend mediante el endpoint PUT /candidate/:id', () => {
      // Navegar a la vista del proceso
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Mock específico para la actualización
      cy.intercept('PUT', `${Cypress.env('apiUrl')}/candidates/1`, {
        statusCode: 200,
        body: {
          message: 'Candidate stage updated successfully',
          data: {
            id: 1,
            currentInterviewStep: 3 // Manager Interview
          }
        }
      }).as('updateCandidateStage')
      
      // Mover candidato
      PositionDetailsPage.dragCandidateToStage(1, 0, 2)
      
      // Verificar que se llamó al endpoint correcto
      cy.wait('@updateCandidateStage')
      
      // Verificar que la respuesta fue exitosa
      cy.get('@updateCandidateStage').its('response.statusCode').should('eq', 200)
    })
  })

  describe('Funcionalidades Adicionales', () => {
    it('debe permitir acceder a los detalles de un candidato', () => {
      // Navegar a la vista del proceso
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Hacer clic en una tarjeta de candidato
      PositionDetailsPage.clickCandidateCard(1)
      
      // Verificar que se abren los detalles
      cy.wait('@getCandidateDetails')
      CandidateDetailsPanel.shouldBeVisible()
      
      // Verificar información del candidato
      CandidateDetailsPanel.shouldShowCandidateName('John Doe')
      CandidateDetailsPanel.shouldShowCandidateEmail('juan.perez@example.com')
    })

    it('debe permitir filtrar posiciones por estado', () => {
      PositionsPage.visit()
      
      // Filtrar por estado "Open"
      PositionsPage.filterByStatus('Open')
      
      // Verificar que solo se muestran posiciones abiertas
      PositionsPage.shouldShowFilteredResults(2)
      PositionsPage.shouldShowPositionWithStatus('Open')
    })

    it('debe permitir buscar posiciones por título', () => {
      PositionsPage.visit()
      
      // Buscar por título
      PositionsPage.searchByTitle('Senior')
      
      // Verificar que solo se muestran posiciones que contengan "Senior"
      PositionsPage.shouldShowPositionWithTitle('Senior Full-Stack Engineer')
      PositionsPage.shouldNotShowPositionWithTitle('UX/UI Designer')
    })
  })

  describe('Manejo de Errores', () => {
    it('debe manejar errores de API correctamente', () => {
      // Mock de error en la API
      cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, {
        statusCode: 500,
        body: { message: 'Internal Server Error' }
      }).as('getPositionsError')
      
      PositionsPage.visit()
      
      // Verificar que se muestra el mensaje de error
      cy.wait('@getPositionsError')
      PositionsPage.shouldShowErrorMessage('Error')
    })

    it('debe mostrar estado de carga mientras se obtienen los datos', () => {
      // Mock de respuesta lenta
      cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, (req) => {
        req.reply({
          statusCode: 200,
          body: [],
          delay: 1000
        })
      }).as('getPositionsSlow')
      
      PositionsPage.visit()
      
      // Verificar que se muestra el spinner de carga
      PositionsPage.elements.loadingSpinner().should('be.visible')
      
      // Esperar a que se complete la carga
      cy.wait('@getPositionsSlow')
      PositionsPage.elements.loadingSpinner().should('not.exist')
    })
  })

  describe('Navegación y Visualización del Proceso', () => {
    it('debe navegar correctamente al proceso de contratación al hacer clic en "Ver proceso"', () => {
      // Navegar desde la lista de posiciones
      PositionsPage.visit()
      
      // Pausa para captura de video
      cy.wait(2000)
      
      // Verificar que se muestra la lista de posiciones
      cy.wait('@getPositions')
      PositionsPage.shouldShowPositions(2)
      
      // Pausa para mostrar la lista de posiciones
      cy.wait(2000)
      
      // Hacer clic en "Ver proceso" de la primera posición
      PositionsPage.navigateToPositionProcess(1)
      
      // Pausa para mostrar la navegación
      cy.wait(2000)
      
      // Verificar que se navega correctamente a la URL del proceso
      cy.url().should('include', '/positions/1')
      
      // Esperar a que se carguen los datos del proceso
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Pausa para mostrar la pantalla de detalles
      cy.wait(3000)
      
      // Verificar que se muestra el título de la posición
      PositionDetailsPage.shouldShowPositionTitle('Senior Full-Stack Engineer')
      
      // Verificar que se muestran todas las columnas del proceso de contratación
      PositionDetailsPage.shouldShowAllStages([
        'Initial Screening',
        'Technical Interview', 
        'Manager Interview'
      ])
      
      // Pausa para mostrar el tablero Kanban
      cy.wait(3000)
      
      // Verificar que se muestran las tarjetas de candidatos en las columnas correctas
      PositionDetailsPage.shouldShowCandidatesInStage(0, 1) // Initial Screening: 1 candidato
      PositionDetailsPage.shouldShowCandidatesInStage(1, 0) // Technical Interview: 0 candidatos
      PositionDetailsPage.shouldShowCandidatesInStage(2, 2) // Manager Interview: 2 candidatos
      
      // Pausa final para captura completa
      cy.wait(2000)
    })

    it('debe mostrar correctamente la distribución inicial de candidatos en el tablero Kanban', () => {
      // Navegar al proceso de contratación
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Verificar que John Doe está en "Initial Screening"
      PositionDetailsPage.shouldShowCandidateInStage('John Doe', 0)
      
      // Verificar que Jane Smith está en "Manager Interview"
      PositionDetailsPage.shouldShowCandidateInStage('Jane Smith', 2)
      
      // Verificar que Carlos García está en "Manager Interview"
      PositionDetailsPage.shouldShowCandidateInStage('Carlos García', 2)
      
      // Verificar que las otras etapas están vacías
      PositionDetailsPage.shouldShowCandidatesInStage(1, 0) // Technical Interview
      PositionDetailsPage.shouldShowCandidatesInStage(2, 0) // Manager Interview
    })

    it('debe validar la funcionalidad completa del tablero Kanban', () => {
      // Navegar al proceso de contratación
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Verificar estado inicial
      PositionDetailsPage.shouldShowCandidatesInStage(0, 1) // Initial Screening
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1) // Technical Interview
      
      // Simular drag & drop de John Doe de "Initial Screening" a "Manager Interview"
      PositionDetailsPage.dragCandidateToStage('John Doe', 0, 2)
      
      // Verificar que John Doe se movió a "Manager Interview"
      PositionDetailsPage.shouldShowCandidateInStage('John Doe', 2)
      PositionDetailsPage.shouldShowCandidatesInStage(2, 1)
      
      // Verificar que "Initial Screening" ahora está vacía
      PositionDetailsPage.shouldShowCandidatesInStage(0, 0)
      
      // Verificar que "Technical Interview" mantiene a Jane Smith
      PositionDetailsPage.shouldShowCandidateInStage('Jane Smith', 1)
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1)
    })
  })

  describe('Flujo Completo End-to-End', () => {
    it('debe validar el flujo completo desde la lista de posiciones hasta el cambio de fase de un candidato', () => {
      // PASO 1: Cargar la lista de posiciones
      PositionsPage.visit()
      cy.wait('@getPositions')
      PositionsPage.shouldShowPositions(2)
      
      // PASO 2: Navegar al proceso de contratación de la primera posición
      PositionsPage.navigateToPositionProcess(1)
      cy.url().should('include', '/positions/1')
      
      // PASO 3: Verificar que se carga el tablero Kanban correctamente
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      PositionDetailsPage.shouldShowPositionTitle('Senior Full-Stack Engineer')
      PositionDetailsPage.shouldShowAllStages([
        'Initial Screening',
        'Technical Interview', 
        'Manager Interview'
      ])
      
      // PASO 4: Verificar distribución inicial de candidatos
      PositionDetailsPage.shouldShowCandidatesInStage(0, 1) // John Doe en Initial Screening
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1) // Jane Smith en Manager Interview
      PositionDetailsPage.shouldShowCandidatesInStage(2, 1) // Carlos García en Manager Interview
      PositionDetailsPage.shouldShowCandidatesInStage(1, 0) // Technical Interview vacía
      PositionDetailsPage.shouldShowCandidatesInStage(2, 0) // Manager Interview vacía
      
      // PASO 5: Simular cambio de fase de John Doe
      PositionDetailsPage.dragCandidateToStage('John Doe', 0, 2) // Mover a Manager Interview
      
      // PASO 6: Verificar que el cambio se refleja en la UI
      PositionDetailsPage.shouldShowCandidatesInStage(0, 0) // Initial Screening ahora vacía
      PositionDetailsPage.shouldShowCandidatesInStage(2, 2) // Manager Interview ahora tiene 2 candidatos
      PositionDetailsPage.shouldShowCandidateInStage('John Doe', 2) // John Doe en Manager Interview
      
      // PASO 7: Verificar que Jane Smith y Carlos García permanecen en su etapa
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1) // Manager Interview mantiene 2 candidatos
      PositionDetailsPage.shouldShowCandidateInStage('Jane Smith', 1) // Jane Smith en Manager Interview
      PositionDetailsPage.shouldShowCandidateInStage('Carlos García', 2) // Carlos García en Manager Interview
      
      // PASO 8: Verificar que se mantiene la estructura del tablero
      PositionDetailsPage.shouldShowAllStages([
        'Initial Screening',
        'Technical Interview', 
        'Manager Interview'
      ])
    })
  })
})
