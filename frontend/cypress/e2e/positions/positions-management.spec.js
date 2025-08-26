import PositionsPage from '../../support/page-objects/PositionsPage'

describe('Gestión de Posiciones - LTI-ATS', () => {
  beforeEach(() => {
    // Mock de datos de posiciones para diferentes escenarios
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
        },
        {
          id: 3,
          title: 'DevOps Engineer',
          status: 'Draft',
          contactInfo: 'Alex Jones',
          applicationDeadline: '2025-01-15',
          isVisible: false
        },
        {
          id: 4,
          title: 'Product Manager',
          status: 'Closed',
          contactInfo: 'Sarah Wilson',
          applicationDeadline: '2024-10-15',
          isVisible: false
        }
      ]
    }).as('getPositions')
  })

  describe('Lista de Posiciones', () => {
    it('debe cargar la lista de posiciones correctamente', () => {
      PositionsPage.visit()
      
      // Verificar título de la página
      PositionsPage.shouldShowTitle('Posiciones')
      
      // Verificar que se cargan las posiciones
      cy.wait('@getPositions')
      PositionsPage.shouldShowPositions(4)
      
      // Verificar que solo las posiciones visibles se muestran
      PositionsPage.shouldShowPositionWithTitle('Desarrollador Full Stack Senior')
      PositionsPage.shouldShowPositionWithTitle('UX/UI Designer')
      PositionsPage.shouldNotShowPositionWithTitle('DevOps Engineer')
      PositionsPage.shouldNotShowPositionWithTitle('Product Manager')
    })

    it('debe mostrar información completa de cada posición', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Verificar información de la primera posición
      PositionsPage.validatePositionCard(1, {
        title: 'Desarrollador Full Stack Senior',
        status: 'Open',
        contactInfo: 'John Doe',
        applicationDeadline: '31/12/2024'
      })
      
      // Verificar información de la segunda posición
      PositionsPage.validatePositionCard(2, {
        title: 'UX/UI Designer',
        status: 'Open',
        contactInfo: 'Jane Smith',
        applicationDeadline: '30/11/2024'
      })
    })

    it('debe mostrar botón de navegación al dashboard', () => {
      PositionsPage.visit()
      
      // Verificar que existe el botón de volver
      PositionsPage.elements.backToDashboardBtn().should('be.visible')
      PositionsPage.elements.backToDashboardBtn().should('contain', 'Volver al Dashboard')
    })
  })

  describe('Filtrado de Posiciones', () => {
    it('debe permitir filtrar posiciones por estado', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Filtrar por estado "Open"
      PositionsPage.filterByStatus('Open')
      PositionsPage.shouldShowFilteredResults(2)
      PositionsPage.shouldShowPositionWithStatus('Open')
      
      // Limpiar filtros
      PositionsPage.clearAllFilters()
      PositionsPage.shouldShowPositions(4)
    })

    it('debe permitir filtrar posiciones por manager', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Filtrar por manager "John Doe"
      PositionsPage.filterByManager('John Doe')
      PositionsPage.shouldShowFilteredResults(1)
      PositionsPage.shouldShowPositionWithTitle('Desarrollador Full Stack Senior')
    })

    it('debe permitir filtrar posiciones por fecha límite', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Filtrar por fecha específica
      const filterDate = '2024-12-31'
      PositionsPage.filterByDate(filterDate)
      
      // Verificar que se aplica el filtro
      PositionsPage.elements.dateFilter().should('have.value', filterDate)
    })

    it('debe permitir combinar múltiples filtros', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Aplicar múltiples filtros
      PositionsPage.filterByStatus('Open')
      PositionsPage.filterByManager('John Doe')
      PositionsPage.searchByTitle('Desarrollador')
      
      // Verificar que se aplican todos los filtros
      PositionsPage.shouldShowActiveFilters()
      PositionsPage.shouldShowFilteredResults(1)
    })
  })

  describe('Búsqueda de Posiciones', () => {
    it('debe permitir buscar posiciones por título', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Buscar por título parcial
      PositionsPage.searchByTitle('Desarrollador')
      PositionsPage.shouldShowPositionWithTitle('Desarrollador Full Stack Senior')
      PositionsPage.shouldNotShowPositionWithTitle('UX/UI Designer')
      
      // Buscar por otro término
      PositionsPage.searchByTitle('Designer')
      PositionsPage.shouldShowPositionWithTitle('UX/UI Designer')
      PositionsPage.shouldNotShowPositionWithTitle('Desarrollador Full Stack Senior')
    })

    it('debe realizar búsqueda en tiempo real', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Escribir en el campo de búsqueda
      PositionsPage.elements.searchInput().type('Engineer')
      
      // Verificar que se filtran los resultados inmediatamente
      PositionsPage.shouldShowPositionWithTitle('DevOps Engineer')
    })

    it('debe ser case-insensitive', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Buscar con mayúsculas y minúsculas
      PositionsPage.searchByTitle('desarrollador')
      PositionsPage.shouldShowPositionWithTitle('Desarrollador Full Stack Senior')
      
      PositionsPage.searchByTitle('DESARROLLADOR')
      PositionsPage.shouldShowPositionWithTitle('Desarrollador Full Stack Senior')
    })
  })

  describe('Navegación y Acciones', () => {
    it('debe permitir navegar al proceso de contratación de una posición', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Hacer clic en "Ver Proceso"
      PositionsPage.clickViewProcess(1)
      
      // Verificar que se navega a la página correcta
      cy.url().should('include', '/positions/1')
    })

    it('debe permitir editar una posición', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Hacer clic en "Editar"
      PositionsPage.clickEditPosition(1)
      
      // Verificar que se navega a la página de edición
      cy.url().should('include', '/positions/1/edit')
    })

    it('debe permitir volver al dashboard', () => {
      PositionsPage.visit()
      
      // Hacer clic en el botón de volver
      PositionsPage.goBackToDashboard()
      
      // Verificar que se navega al dashboard
      cy.url().should('eq', Cypress.config().baseUrl + '/')
      cy.get('h1').should('contain', 'Dashboard del Reclutador')
    })
  })

  describe('Estados de Carga y Error', () => {
    it('debe mostrar estado de carga mientras se obtienen los datos', () => {
      // Mock de respuesta lenta
      cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, (req) => {
        req.reply({
          statusCode: 200,
          body: [],
          delay: 2000
        })
      }).as('getPositionsSlow')
      
      PositionsPage.visit()
      
      // Verificar que se muestra el spinner de carga
      PositionsPage.elements.loadingSpinner().should('be.visible')
      
      // Esperar a que se complete la carga
      cy.wait('@getPositionsSlow')
      PositionsPage.elements.loadingSpinner().should('not.exist')
    })

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

    it('debe manejar errores de red', () => {
      // Mock de error de red
      cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, {
        forceNetworkError: true
      }).as('getPositionsNetworkError')
      
      PositionsPage.visit()
      
      // Verificar que se maneja el error de red
      cy.wait('@getPositionsNetworkError')
      PositionsPage.shouldShowErrorMessage('Error')
    })
  })

  describe('Validaciones de UI', () => {
    it('debe mostrar mensajes cuando no hay posiciones', () => {
      // Mock de lista vacía
      cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, {
        statusCode: 200,
        body: []
      }).as('getPositionsEmpty')
      
      PositionsPage.visit()
      cy.wait('@getPositionsEmpty')
      
      // Verificar mensaje de no hay posiciones
      PositionsPage.shouldShowNoPositions()
    })

    it('debe validar que los filtros funcionan correctamente', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Verificar que los filtros están habilitados
      PositionsPage.elements.statusFilter().should('not.be.disabled')
      PositionsPage.elements.dateFilter().should('not.be.disabled')
      PositionsPage.elements.managerFilter().should('not.be.disabled')
      PositionsPage.elements.searchInput().should('not.be.disabled')
    })

    it('debe mostrar indicadores visuales de filtros activos', () => {
      PositionsPage.visit()
      cy.wait('@getPositions')
      
      // Aplicar filtros
      PositionsPage.filterByStatus('Open')
      PositionsPage.searchByTitle('Desarrollador')
      
      // Verificar que se muestran los filtros activos
      PositionsPage.shouldShowActiveFilters()
    })
  })
})
