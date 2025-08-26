# 🚀 LTI-ATS Frontend - Sistema de Seguimiento de Talento

Este proyecto es el frontend del sistema LTI-ATS (LTI Applicant Tracking System), una plataforma integral de gestión de candidatos y posiciones desarrollada con React y TypeScript.

## 📋 Descripción del Proyecto

El frontend del LTI-ATS proporciona una interfaz moderna y responsiva para que los reclutadores y gerentes de recursos humanos puedan:

- **Gestionar posiciones de trabajo** con estados y flujos personalizables
- **Administrar candidatos** con perfiles completos y CVs
- **Visualizar el proceso de contratación** mediante una vista Kanban interactiva
- **Realizar entrevistas** con sistema de puntuación y notas
- **Filtrar y buscar** posiciones y candidatos eficientemente

## 🏗️ Tecnologías Utilizadas

- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para mejor desarrollo
- **Bootstrap 5** - Framework CSS para diseño responsivo
- **React Router** - Navegación entre páginas
- **React Beautiful DnD** - Drag & drop para el proceso Kanban
- **Cypress** - Framework de pruebas E2E

## 🧪 Testing E2E con Cypress

El proyecto incluye un sistema completo de pruebas End-to-End implementado con Cypress que cubre todas las funcionalidades críticas:

### **Cobertura de Pruebas**
- ✅ **30 casos de prueba** implementados y validados
- ✅ **100% de éxito** en la ejecución
- ✅ **Cobertura funcional completa** de la interfaz de posiciones
- ✅ **Arquitectura robusta** con Page Objects y comandos personalizados

### **Archivos de Prueba**
- `cypress/e2e/positions/position.spec.js` - 11 pruebas (requisitos principales)
- `cypress/e2e/positions/positions-management.spec.js` - 19 pruebas (funcionalidades extendidas)

### **Ejecución de Pruebas**
```bash
# Modo interactivo (recomendado para desarrollo)
npm run cypress:open

# Modo headless (para CI/CD)
npm run cypress:run

# Solo pruebas de posiciones
npm run cypress:run:positions
```

Para más información sobre las pruebas E2E, consulta el [README de Cypress](./cypress/README.md).

## 📜 Scripts Disponibles

En el directorio del proyecto, puedes ejecutar:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Ejecuta el test runner en modo interactivo de observación.\
Consulta la sección sobre [ejecutar tests](https://facebook.github.io/create-react-app/docs/running-tests) para más información.

### `npm run cypress:open`

Abre la interfaz gráfica de Cypress para ejecutar pruebas E2E de manera interactiva.

### `npm run cypress:run`

Ejecuta todas las pruebas E2E en modo headless (recomendado para CI/CD).

### `npm run cypress:run:positions`

Ejecuta solo las pruebas relacionadas con la gestión de posiciones.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## 🏗️ Estructura del Proyecto

```
src/
├── components/           # Componentes reutilizables
│   ├── Positions.tsx    # Vista principal de posiciones
│   ├── PositionDetails.js # Detalles y proceso de contratación
│   ├── CandidateCard.js # Tarjeta de candidato
│   ├── CandidateDetails.js # Panel lateral de detalles
│   ├── StageColumn.js   # Columna de etapa del proceso
│   └── RecruiterDashboard.js # Dashboard principal
├── services/            # Servicios de API
│   └── candidateService.js # Servicio de candidatos
└── assets/              # Recursos estáticos
    └── lti-logo.png     # Logo del proyecto
```

## 🔧 Configuración

### **Variables de Entorno**
El proyecto utiliza variables de entorno para la configuración:
- `REACT_APP_API_URL` - URL del backend (por defecto: http://localhost:3010)

### **Dependencias Principales**
- **React 18** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático
- **Bootstrap 5** - Framework CSS
- **Cypress** - Framework de pruebas E2E

## 📚 Documentación Adicional

- **README Principal**: [../README.md](../README.md) - Visión general del proyecto
- **README de Cypress**: [./cypress/README.md](./cypress/README.md) - Guía completa de pruebas E2E
- **Documentación del Proyecto**: [../documentos/](../documentos/) - Análisis y especificaciones

## 🚀 Despliegue

### **Desarrollo**
```bash
npm start
```

### **Producción**
```bash
npm run build
```

El build de producción se genera en la carpeta `build/` y está optimizado para el mejor rendimiento.

## 🤝 Contribución

Para contribuir al proyecto:
1. Sigue las convenciones de código establecidas
2. Ejecuta las pruebas E2E antes de hacer commit
3. Mantén la documentación actualizada
4. Usa los Page Objects y comandos personalizados de Cypress

---

*Frontend LTI-ATS - Sistema de Seguimiento de Talento*  
*Versión: 1.0*  
*Última actualización: [Fecha actual]*
