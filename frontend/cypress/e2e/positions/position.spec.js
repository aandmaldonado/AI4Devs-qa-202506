import PositionsPage from '../../support/page-objects/PositionsPage'
import PositionDetailsPage from '../../support/page-objects/PositionDetailsPage'
import CandidateDetailsPanel from '../../support/page-objects/CandidateDetailsPanel'

describe('Interfaz de Posiciones - LTI-ATS', () => {
  beforeEach(() => {
    // Mock de las APIs para pruebas consistentes
    cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, {
      statusCode: 200,
      body: [
        {
          id: 1,
          title: 'Desarrollador Full Stack Senior',
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

    cy.intercept('GET', `${Cypress.env('apiUrl')}/positions/1/interviewFlow`, {
      statusCode: 200,
      body: {
        interviewFlow: {
          positionName: 'Desarrollador Full Stack Senior',
          interviewFlow: {
            id: 1,
            description: 'Flujo estándar para posiciones técnicas',
            interviewSteps: [
              {
                id: 1,
                name: 'Primera Entrevista',
                orderIndex: 1
              },
              {
                id: 2,
                name: 'Prueba Técnica',
                orderIndex: 2
              },
              {
                id: 3,
                name: 'Segunda Entrevista',
                orderIndex: 3
              },
              {
                id: 4,
                name: 'Entrevista Final',
                orderIndex: 4
              }
            ]
          }
        }
      }
    }).as('getInterviewFlow')

    cy.intercept('GET', `${Cypress.env('apiUrl')}/positions/1/candidates`, {
      statusCode: 200,
      body: [
        {
          fullName: 'Juan Pérez',
          currentInterviewStep: 'Primera Entrevista',
          candidateId: 1,
          applicationId: 1,
          averageScore: 4.2
        },
        {
          fullName: 'María García',
          currentInterviewStep: 'Prueba Técnica',
          candidateId: 2,
          applicationId: 2,
          averageScore: 4.8
        }
      ]
    }).as('getCandidates')

    cy.intercept('GET', `${Cypress.env('apiUrl')}/candidates/1`, {
      statusCode: 200,
      body: {
        id: 1,
        firstName: 'Juan',
        lastName: 'Pérez',
        email: 'juan.perez@example.com',
        phone: '123456789',
        address: 'Calle Test 123, Madrid',
        educations: [
          {
            id: 1,
            institution: 'Universidad Complutense de Madrid',
            title: 'Ingeniería Informática',
            startDate: '2015-09-01',
            endDate: '2019-06-30'
          }
        ],
        workExperiences: [
          {
            id: 1,
            company: 'TechCorp',
            position: 'Desarrollador Frontend',
            description: 'Desarrollo de aplicaciones React',
            startDate: '2019-09-01',
            endDate: '2023-06-30'
          }
        ],
        resumes: [
          {
            id: 1,
            filePath: '/uploads/cv-juan-perez.pdf',
            fileType: 'application/pdf'
          }
        ],
        applications: [
          {
            id: 1,
            position: { title: 'Desarrollador Full Stack Senior' },
            applicationDate: '2024-01-15',
            interviews: [
              {
                interviewDate: '2024-01-20',
                interviewStep: { name: 'Primera Entrevista' },
                notes: 'Candidato prometedor',
                score: 4
              }
            ]
          }
        ]
      }
    }).as('getCandidateDetails')
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
      PositionsPage.shouldShowPositionWithTitle('Desarrollador Full Stack Senior')
      PositionsPage.shouldShowPositionWithTitle('UX/UI Designer')
      PositionsPage.shouldShowPositionWithStatus('Open')
    })

    it('debe mostrar las columnas correspondientes a cada fase del proceso de contratación', () => {
      // Navegar a la vista del proceso de una posición
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Verificar que se cargan las etapas del proceso
      cy.wait('@getInterviewFlow')
      PositionDetailsPage.shouldShowStageColumns(4)
      
      // Verificar títulos de las etapas
      PositionDetailsPage.shouldShowStageTitle(0, 'Primera Entrevista')
      PositionDetailsPage.shouldShowStageTitle(1, 'Prueba Técnica')
      PositionDetailsPage.shouldShowStageTitle(2, 'Segunda Entrevista')
      PositionDetailsPage.shouldShowStageTitle(3, 'Entrevista Final')
    })

    it('debe mostrar las tarjetas de los candidatos en la columna correcta según su fase actual', () => {
      // Navegar a la vista del proceso
      PositionsPage.visit()
      PositionsPage.navigateToPositionProcess(1)
      
      // Esperar a que se carguen los datos
      cy.wait('@getInterviewFlow')
      cy.wait('@getCandidates')
      
      // Verificar que los candidatos aparecen en las columnas correctas
      PositionDetailsPage.shouldShowCandidatesInStage(0, 1) // Primera Entrevista
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1) // Prueba Técnica
      PositionDetailsPage.shouldShowCandidatesInStage(2, 0) // Segunda Entrevista
      PositionDetailsPage.shouldShowCandidatesInStage(3, 0) // Entrevista Final
      
      // Verificar nombres de candidatos en cada etapa
      PositionDetailsPage.shouldShowCandidateName(1, 'Juan Pérez')
      PositionDetailsPage.shouldShowCandidateName(2, 'María García')
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
      PositionDetailsPage.shouldShowCandidatesInStage(0, 1) // Primera Entrevista
      PositionDetailsPage.shouldShowCandidatesInStage(1, 1) // Prueba Técnica
      
      // Mover candidato de "Primera Entrevista" a "Segunda Entrevista"
      PositionDetailsPage.dragCandidateToStage(1, 0, 2)
      
      // Verificar que el candidato se movió correctamente
      PositionDetailsPage.shouldMoveCandidateToStage(1, 2)
      PositionDetailsPage.shouldRemoveCandidateFromStage(1, 0)
      
      // Verificar que se mantiene el candidato en "Prueba Técnica"
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
            currentInterviewStep: 3 // Segunda Entrevista
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
      CandidateDetailsPanel.shouldShowCandidateName('Juan Pérez')
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
      PositionsPage.searchByTitle('Desarrollador')
      
      // Verificar que solo se muestran posiciones que contengan "Desarrollador"
      PositionsPage.shouldShowPositionWithTitle('Desarrollador Full Stack Senior')
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
})
