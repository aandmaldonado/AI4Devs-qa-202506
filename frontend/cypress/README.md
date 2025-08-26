# 🧪 Pruebas E2E con Cypress - LTI-ATS

Este directorio contiene las pruebas End-to-End (E2E) del sistema LTI-ATS (LTI Applicant Tracking System) implementadas con Cypress.

## 📋 Descripción del Proyecto

El sistema LTI-ATS es una plataforma integral de gestión de candidatos y posiciones que permite a los reclutadores y gerentes de recursos humanos administrar todo el proceso de contratación, desde la publicación de posiciones hasta la selección final de candidatos.

## 🎯 Funcionalidades Cubiertas por las Pruebas

### **Gestión de Posiciones**
- ✅ Lista de posiciones de trabajo
- ✅ Filtrado por estado, manager y fecha
- ✅ Búsqueda por título
- ✅ Navegación al proceso de contratación

### **Proceso de Contratación**
- ✅ Visualización de etapas del proceso
- ✅ Carga de candidatos por etapa
- ✅ Acceso a detalles de candidatos

### **Movimiento de Candidatos**
- ✅ Drag & drop entre etapas
- ✅ Actualización de estado en backend
- ✅ Validación de movimientos

### **Detalles de Candidatos**
- ✅ Panel lateral con información completa
- ✅ Historial educativo y laboral
- ✅ Acceso a CVs
- ✅ Registro de entrevistas

## 🏗️ Estructura del Proyecto

```
cypress/
├── e2e/                    # Pruebas E2E
│   ├── positions/         # Pruebas específicas de posiciones
│   │   ├── position.spec.js           # Prueba principal (requisitos init.md)
│   │   └── positions-management.spec.js # Gestión de posiciones
│   └── common/            # Pruebas comunes del sistema
├── fixtures/              # Datos de prueba
│   ├── positions.json     # Datos de posiciones
│   ├── candidates.json    # Datos de candidatos
│   └── interview-flows.json # Flujos de entrevistas
├── support/               # Configuración y comandos
│   ├── commands.js        # Comandos personalizados
│   ├── e2e.js            # Configuración de soporte
│   └── page-objects/     # Objetos de página
│       ├── PositionsPage.js           # Página de posiciones
│       ├── PositionDetailsPage.js     # Detalles de posición
│       └── CandidateDetailsPanel.js   # Panel de candidatos
├── videos/                # Grabaciones de pruebas (opcional)
└── screenshots/           # Capturas de pantalla de fallos
```

## 🚀 Instalación y Configuración

### **Prerrequisitos**
- Node.js 16+ instalado
- Proyecto frontend configurado y funcionando
- Backend ejecutándose en `http://localhost:3010`

### **Instalación de Cypress**
```bash
# En el directorio frontend
npm install cypress --save-dev
```

### **Configuración**
El proyecto ya incluye:
- `cypress.config.js` - Configuración principal
- `cypress/support/e2e.js` - Configuración de soporte
- `cypress/support/commands.js` - Comandos personalizados

## 🧪 Ejecución de Pruebas

### **Modo Interactivo (Recomendado para desarrollo)**
```bash
# En el directorio frontend
npx cypress open
```

### **Modo Headless (Para CI/CD)**
```bash
# Ejecutar todas las pruebas
npx cypress run

# Ejecutar pruebas específicas
npx cypress run --spec "cypress/e2e/positions/position.spec.js"

# Ejecutar con navegador específico
npx cypress run --browser chrome
```

### **Ejecución con Variables de Entorno**
```bash
# Ejecutar con configuración específica
CYPRESS_baseUrl=http://localhost:3000 npx cypress run
```

## 📝 Comandos Personalizados Disponibles

### **Navegación**
- `cy.visitDashboard()` - Navegar al dashboard principal
- `cy.visitPositions()` - Navegar a la página de posiciones

### **Creación de Datos de Prueba**
- `cy.createTestPosition(positionData)` - Crear posición de prueba
- `cy.createTestCandidate(candidateData)` - Crear candidato de prueba

### **Interacciones**
- `cy.moveCandidateToStage(candidateId, fromStage, toStage)` - Mover candidato entre etapas
- `cy.openCandidateDetails(candidateId)` - Abrir detalles de candidato
- `cy.registerInterview(candidateId, interviewData)` - Registrar entrevista

### **Filtrado y Búsqueda**
- `cy.filterPositions(filters)` - Aplicar filtros a posiciones
- `cy.waitForPageLoad()` - Esperar a que se cargue la página

### **Validaciones**
- `cy.shouldHaveNoErrors()` - Verificar que no hay errores
- `cy.shouldShowSuccessMessage(message)` - Verificar mensaje de éxito
- `cy.shouldShowErrorMessage(message)` - Verificar mensaje de error

## 🏗️ Page Objects

### **PositionsPage**
Maneja la página principal de posiciones con métodos para:
- Navegación y validación de título
- Filtrado y búsqueda
- Interacción con tarjetas de posiciones
- Validación de resultados

### **PositionDetailsPage**
Maneja la vista del proceso de contratación con métodos para:
- Validación de etapas del proceso
- Drag & drop de candidatos
- Validación de movimientos
- Manejo de estados de carga

### **CandidateDetailsPanel**
Maneja el panel lateral de detalles de candidatos con métodos para:
- Validación de información personal
- Validación de educación y experiencia laboral
- Acceso a CVs
- Registro de entrevistas

## 🔧 Configuración de Mocks

Las pruebas utilizan mocks de API para garantizar consistencia:

### **APIs Mockeadas**
- `GET /positions` - Lista de posiciones
- `GET /positions/:id/interviewFlow` - Flujo de entrevistas
- `GET /positions/:id/candidates` - Candidatos por posición
- `GET /candidates/:id` - Detalles de candidato
- `PUT /candidates/:id` - Actualización de etapa

### **Ejemplo de Mock**
```javascript
cy.intercept('GET', `${Cypress.env('apiUrl')}/positions`, {
  statusCode: 200,
  body: [
    {
      id: 1,
      title: 'Desarrollador Full Stack Senior',
      status: 'Open',
      contactInfo: 'John Doe'
    }
  ]
}).as('getPositions')
```

## 📊 Cobertura de Pruebas

### **Escenarios Cubiertos**
- ✅ Carga de página de posiciones
- ✅ Visualización de etapas del proceso
- ✅ Posicionamiento de candidatos por etapa
- ✅ Drag & drop entre etapas
- ✅ Actualización en backend
- ✅ Filtrado y búsqueda
- ✅ Navegación y acciones
- ✅ Manejo de errores y estados de carga

### **Casos de Prueba por Archivo**
- `position.spec.js`: 8 casos de prueba (requisitos principales)
- `positions-management.spec.js`: 15 casos de prueba (funcionalidades extendidas)

## 🚨 Solución de Problemas

### **Problemas Comunes**

#### **1. Error de Conexión al Backend**
```bash
# Verificar que el backend esté ejecutándose
curl http://localhost:3010/positions

# Verificar configuración en cypress.config.js
baseUrl: 'http://localhost:3000'
apiUrl: 'http://localhost:3010'
```

#### **2. Elementos No Encontrados**
- Verificar que los `data-testid` estén presentes en el frontend
- Verificar que la página se haya cargado completamente
- Usar `cy.wait()` para esperar a que se completen las operaciones

#### **3. Pruebas Fallando Intermitentemente**
- Aumentar timeouts en `cypress.config.js`
- Verificar que los mocks de API estén configurados correctamente
- Usar `cy.wait('@alias')` para esperar respuestas de API

### **Debugging**
```bash
# Ejecutar con logs detallados
DEBUG=cypress:* npx cypress run

# Ejecutar en modo debug
npx cypress open --config-file cypress.config.js
```

## 🔄 Mantenimiento

### **Actualización de Selectores**
Cuando se cambien los `data-testid` en el frontend:
1. Actualizar los Page Objects correspondientes
2. Verificar que las pruebas sigan funcionando
3. Actualizar la documentación si es necesario

### **Nuevas Funcionalidades**
Para agregar pruebas de nuevas funcionalidades:
1. Crear nuevos Page Objects si es necesario
2. Agregar comandos personalizados relevantes
3. Crear archivos de prueba específicos
4. Actualizar este README

### **Actualización de Dependencias**
```bash
# Actualizar Cypress
npm update cypress

# Verificar compatibilidad
npx cypress verify
```

## 📚 Recursos Adicionales

### **Documentación Oficial**
- [Cypress Documentation](https://docs.cypress.io/)
- [Cypress Best Practices](https://docs.cypress.io/guides/references/best-practices)
- [Cypress API Reference](https://docs.cypress.io/api/api/table-of-contents)

### **Patrones de Testing**
- [Page Object Model](https://docs.cypress.io/guides/references/best-practices#Organizing-Tests-Login-Controls-Custom-Commands)
- [Custom Commands](https://docs.cypress.io/api/cypress-api/custom-commands)
- [API Mocking](https://docs.cypress.io/api/commands/intercept)

## 🤝 Contribución

### **Estándares de Código**
- Usar Page Objects para todas las interacciones
- Implementar comandos personalizados para operaciones comunes
- Mantener las pruebas independientes y reutilizables
- Documentar nuevos comandos y Page Objects

### **Flujo de Trabajo**
1. Crear rama para nueva funcionalidad
2. Implementar pruebas siguiendo los patrones establecidos
3. Verificar que todas las pruebas pasen
4. Actualizar documentación si es necesario
5. Crear Pull Request

---

## 📞 Soporte

Para preguntas o problemas relacionados con las pruebas E2E:
- Revisar este README
- Consultar la documentación oficial de Cypress
- Revisar los logs de ejecución
- Contactar al equipo de desarrollo

---

*Última actualización: [Fecha actual]*
*Versión: 1.0*
