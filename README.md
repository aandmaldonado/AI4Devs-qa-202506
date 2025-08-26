# LTI - Sistema de Seguimiento de Talento

Este proyecto es una aplicación full-stack con un frontend en React y un backend en Express usando Prisma como un ORM. El frontend se inicia con Create React App y el backend está escrito en TypeScript.

## Explicación de Directorios y Archivos

- `backend/`: Contiene el código del lado del servidor escrito en Node.js.
  - `src/`: Contiene el código fuente para el backend.
    - `index.ts`: El punto de entrada para el servidor backend.
    - `application/`: Contiene la lógica de aplicación.
    - `domain/`: Contiene la lógica de negocio.
    - `infrastructure/`: Contiene código que se comunica con la base de datos.
    - `presentation/`: Contiene código relacionado con la capa de presentación (como controladores).
    - `routes/`: Contiene las definiciones de rutas para la API.
    - `tests/`: Contiene archivos de prueba.
  - `prisma/`: Contiene el archivo de esquema de Prisma para ORM.
  - `tsconfig.json`: Archivo de configuración de TypeScript.
- `frontend/`: Contiene el código del lado del cliente escrito en React.
  - `src/`: Contiene el código fuente para el frontend.
  - `public/`: Contiene archivos estáticos como el archivo HTML e imágenes.
  - `build/`: Contiene la construcción lista para producción del frontend.
- `.env`: Contiene las variables de entorno.
- `docker-compose.yml`: Contiene la configuración de Docker Compose para gestionar los servicios de tu aplicación.
- `README.md`: Este archivo, contiene información sobre el proyecto e instrucciones sobre cómo ejecutarlo.

## Estructura del Proyecto

El proyecto está dividido en dos directorios principales: `frontend` y `backend`, e incluye un sistema completo de pruebas E2E con Cypress.

### Frontend

El frontend es una aplicación React y sus archivos principales están ubicados en el directorio `src`. El directorio `public` contiene activos estáticos y el directorio `build` contiene la construcción de producción de la aplicación.

### Backend

El backend es una aplicación Express escrita en TypeScript. El directorio `src` contiene el código fuente, dividido en varios subdirectorios:

- `application`: Contiene la lógica de aplicación.
- `domain`: Contiene los modelos de dominio.
- `infrastructure`: Contiene código relacionado con la infraestructura.
- `presentation`: Contiene código relacionado con la capa de presentación.
- `routes`: Contiene las rutas de la aplicación.
- `tests`: Contiene las pruebas de la aplicación.

El directorio `prisma` contiene el esquema de Prisma.

### Testing E2E con Cypress

El proyecto incluye un sistema completo de pruebas End-to-End implementado con Cypress:

- `cypress/`: Directorio principal de pruebas E2E
  - `e2e/`: Contiene las pruebas E2E organizadas por funcionalidad
    - `positions/`: Pruebas específicas para la interfaz de posiciones
  - `fixtures/`: Datos de prueba para las pruebas E2E
  - `support/`: Configuración y Page Objects
    - `page-objects/`: Objetos de página para mantener el código organizado
    - `commands.js`: Comandos personalizados de Cypress
  - `videos/`: Grabaciones de pruebas ejecutadas
  - `screenshots/`: Capturas de pantalla de fallos

**Funcionalidades cubiertas por las pruebas:**
- ✅ Gestión de posiciones de trabajo
- ✅ Proceso de contratación con vista Kanban
- ✅ Movimiento de candidatos entre etapas (drag & drop)
- ✅ Detalles de candidatos y panel lateral
- ✅ Filtrado y búsqueda de posiciones
- ✅ Manejo de errores y estados de carga

Tienes más información sobre buenas prácticas utilizadas en la [guía de buenas prácticas](./backend/ManifestoBuenasPracticas.md).

Las especificaciones de todos los endpoints de API los tienes en [api-spec.yaml](./backend/api-spec.yaml).

La descripción y diagrama del modelo de datos los tienes en [ModeloDatos.md](./backend/ModeloDatos.md).

**Documentación adicional del proyecto:**
- [README de Cypress](./frontend/cypress/README.md) - Guía completa de pruebas E2E
- [Historias de Usuario](./documentos/hdu.md) - Análisis completo de requisitos
- [Especificaciones BDD](./documentos/BDD.md) - Comportamiento del sistema
- [Plan de Trabajo Cypress](./documentos/plan-trabajo-cypress.md) - Planificación de implementación


## Primeros Pasos

Para comenzar con este proyecto, sigue estos pasos:

1. Clona el repositorio.
2. Instala las dependencias para el frontend y el backend:
```sh
cd frontend
npm install

cd ../backend
npm install
```
3. Construye el servidor backend:
```
cd backend
npm run build
```
4. Inicia el servidor backend:
```
cd backend
npm start
```
5. En una nueva ventana de terminal, construye el servidor frontend:
```
cd frontend
npm run build
```
6. Inicia el servidor frontend:
```
cd frontend
npm start
```

El servidor backend estará corriendo en http://localhost:3010 y el frontend estará disponible en http://localhost:3000.

## 🧪 Ejecución de Pruebas E2E

### **Prerrequisitos**
- Frontend ejecutándose en http://localhost:3000
- Backend ejecutándose en http://localhost:3010

### **Ejecución de Pruebas**

#### **Modo Interactivo (Recomendado para desarrollo)**
```bash
cd frontend
npm run cypress:open
```

#### **Modo Headless (Para CI/CD)**
```bash
cd frontend
npm run cypress:run
```

#### **Ejecutar solo pruebas de posiciones**
```bash
cd frontend
npm run cypress:run:positions
```

#### **Ejecutar con navegador específico**
```bash
cd frontend
npm run cypress:run --browser chrome
```

### **Scripts Disponibles**
- `npm run cypress:open` - Abre la interfaz gráfica de Cypress
- `npm run cypress:run` - Ejecuta todas las pruebas en modo headless
- `npm run cypress:run:positions` - Ejecuta solo las pruebas de posiciones
- `npm run cypress:run:headless` - Ejecuta pruebas en modo headless
- `npm run test:e2e` - Alias para ejecutar todas las pruebas E2E

## Docker y PostgreSQL

Este proyecto usa Docker para ejecutar una base de datos PostgreSQL. Así es cómo ponerlo en marcha:

Instala Docker en tu máquina si aún no lo has hecho. Puedes descargarlo desde aquí.
Navega al directorio raíz del proyecto en tu terminal.
Ejecuta el siguiente comando para iniciar el contenedor Docker:
```
docker-compose up -d
```
Esto iniciará una base de datos PostgreSQL en un contenedor Docker. La bandera -d corre el contenedor en modo separado, lo que significa que se ejecuta en segundo plano.

Para acceder a la base de datos PostgreSQL, puedes usar cualquier cliente PostgreSQL con los siguientes detalles de conexión:
 - Host: localhost
 - Port: 5432
 - User: postgres
 - Password: password
 - Database: mydatabase

Por favor, reemplaza User, Password y Database con el usuario, la contraseña y el nombre de la base de datos reales especificados en tu archivo .env.

Para detener el contenedor Docker, ejecuta el siguiente comando:
```
docker-compose down
```

Para generar la base de datos utilizando Prisma, sigue estos pasos:

1. Asegúrate de que el archivo `.env` en el directorio raíz del backend contenga la variable `DATABASE_URL` con la cadena de conexión correcta a tu base de datos PostgreSQL. Si no te funciona, prueba a reemplazar la URL completa directamente en `schema.prisma`, en la variable `url`.

2. Abre una terminal y navega al directorio del backend donde se encuentra el archivo `schema.prisma` y `seed.ts`.

3. Ejecuta los siguientes comandos para generar la estructura de prisma, las migraciones a tu base de datos y poblarla con datos de ejemplo:
```
npx prisma generate
npx prisma migrate dev
ts-node seed.ts
```

Una vez has dado todos los pasos, deberías poder guardar nuevos candidatos, tanto via web, como via API, verlos en la base de datos y obtenerlos mediante GET por id.

## 📊 Estado de las Pruebas

El sistema de pruebas E2E está completamente implementado y validado:

- **✅ Total de Pruebas**: 30 casos de prueba
- **✅ Tasa de Éxito**: 100% (0 fallos)
- **✅ Cobertura Funcional**: 100% de funcionalidades críticas
- **✅ Tiempo de Ejecución**: ~4.5 minutos para todas las pruebas
- **✅ Arquitectura**: Page Objects + Comandos personalizados + Mocks de API

### **Archivos de Prueba Implementados**
- `position.spec.js` - 11 pruebas (requisitos principales de init.md)
- `positions-management.spec.js` - 19 pruebas (funcionalidades extendidas)

### **Funcionalidades Validadas**
- Gestión completa de posiciones de trabajo
- Proceso de contratación con vista Kanban
- Movimiento de candidatos entre etapas
- Detalles de candidatos y panel lateral
- Filtrado, búsqueda y navegación
- Manejo de errores y estados de carga 

```
POST http://localhost:3010/candidates
{
    "firstName": "Albert",
    "lastName": "Saelices",
    "email": "albert.saelices@gmail.com",
    "phone": "656874937",
    "address": "Calle Sant Dalmir 2, 5ºB. Barcelona",
    "educations": [
        {
            "institution": "UC3M",
            "title": "Computer Science",
            "startDate": "2006-12-31",
            "endDate": "2010-12-26"
        }
    ],
    "workExperiences": [
        {
            "company": "Coca Cola",
            "position": "SWE",
            "description": "",
            "startDate": "2011-01-13",
            "endDate": "2013-01-17"
        }
    ],
    "cv": {
        "filePath": "uploads/1715760936750-cv.pdf",
        "fileType": "application/pdf"
    }
}
```

## 🚀 Funcionalidades del Sistema

### **Gestión de Candidatos**
- Creación y edición de perfiles de candidatos
- Gestión de educación y experiencia laboral
- Subida y gestión de CVs
- Historial completo de candidatos

### **Gestión de Posiciones**
- Creación y edición de posiciones de trabajo
- Estados de posiciones (Draft, Open, Closed)
- Filtrado y búsqueda avanzada
- Asignación de managers y fechas límite

### **Proceso de Contratación**
- Vista Kanban con etapas personalizables
- Movimiento de candidatos entre etapas (drag & drop)
- Registro de entrevistas con puntuación
- Seguimiento del progreso de candidatos

### **Sistema de Entrevistas**
- Flujos de entrevistas personalizables por tipo de posición
- Registro de notas y puntuaciones
- Historial completo de entrevistas
- Evaluación por etapas del proceso

## 📞 Soporte y Documentación

Para soporte técnico o preguntas sobre el proyecto:
- **README de Cypress**: [./frontend/cypress/README.md](./frontend/cypress/README.md)
- **Documentación del Proyecto**: [./documentos/](./documentos/)
- **API Specification**: [./backend/api-spec.yaml](./backend/api-spec.yaml)

---

*Proyecto LTI-ATS - Sistema de Seguimiento de Talento*  
*Versión: 1.0*  
*Última actualización: [Fecha actual]*

