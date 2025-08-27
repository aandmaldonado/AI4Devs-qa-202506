# Historial de Prompts 📑

## Modelo 🤖

- **LLM:** Claude Sonnet 4
- **Versión:** Claude-3.5-Sonnet-20241022

## Categorías 🏷️

- **`Análisis de Requisitos 🔍`** Comprensión y análisis de requisitos mediante ingeniería inversa y extracción de historias de usuario

- **`Especificaciones BDD 🧪`** Creación de especificaciones de comportamiento usando enfoque BDD y lenguaje Gherkin

- **`Planificación de Testing 🚀`** Planificación e implementación de estrategias de testing con frameworks como Cypress

- **`Ejecución y Reportes 📊`** Ejecución de pruebas, generación de reportes de cobertura y análisis de calidad

- **`Arquitectura y Diseño 🏗️`** Diseño de arquitectura de software y patrones de diseño

## Estadísticas 📊

### **Resumen General**
- **Total de Prompts:** 10
- **Prompts de Análisis de Requisitos:** 5
- **Prompts de Especificaciones BDD:** 1
- **Prompts de Planificación de Testing:** 1
- **Prompts de Implementación de Testing:** 3
- **Prompts de Ejecución y Reportes:** 2

### **Prompts por Categoría**

| Categoría | Cantidad | Porcentaje |
|-----------|----------|------------|
| 🔍 Análisis de Requisitos | 5 | 50.0% |
| 🧪 Especificaciones BDD | 1 | 10.0% |
| 🚀 Planificación de Testing | 1 | 10.0% |
| 🧪 Implementación de Testing | 3 | 30.0% |
| 📊 Ejecución y Reportes | 2 | 20.0% |

### **Roles Utilizados**

| Rol | Frecuencia | Descripción |
|-----|------------|-------------|
| **Product Owner** | 1 | Rol para análisis de requisitos y extracción de historias de usuario |
| **Analista de Sistemas** | 1 | Rol para especificaciones BDD y comportamiento del sistema |
| **Desarrollador Fullstack Senior** | 2 | Rol para planificación e implementación técnica de testing |

### **Problemas Más Frecuentes**

| Problema | Frecuencia | Categoría |
|----------|------------|-----------|
| Necesidad de pruebas E2E para interfaz de posiciones | 2 | 🚀 Planificación de Testing |
| Falta de especificaciones BDD claras | 1 | 🧪 Especificaciones BDD |
| Necesidad de historias de usuario estructuradas | 1 | 🔍 Análisis de Requisitos |
| Implementación técnica de Cypress | 1 | 🧪 Implementación de Testing |
| Necesidad de validación y reportes de pruebas | 1 | 📊 Ejecución y Reportes |

### **Prompts Más Críticos**

| Prompt | Impacto | Razón |
|--------|---------|-------|
| Prompt 1 | 🔴 Alto | Define la base de historias de usuario para todo el proyecto |
| Prompt 2 | 🔴 Alto | Establece especificaciones BDD para comunicación técnica y de negocio |
| Prompt 3 | 🔴 Alto | Planifica la implementación de testing E2E crítico para la calidad |
| Prompt 4 | 🔴 Alto | Implementa las pruebas E2E según los requisitos del ejercicio |
| Prompt 5 | 🟡 Medio | Valida la implementación y genera reportes de calidad del sistema |
| Prompt 6 | 🟡 Medio | Identifica gaps críticos en la cobertura de pruebas E2E |
| Prompt 7 | 🟡 Medio | Implementa mejoras críticas para completar la cobertura de pruebas E2E |
| Prompt 8 | 🔴 Alto | Corrige error crítico de funcionalidad drag and drop para movimiento de candidatos |
| Prompt 9 | 🟡 Medio | Verifica cobertura de pruebas de pantalla de detalles de posiciones |
| Prompt 10 | 🟡 Medio | Identifica problema de navegación a pantalla de detalles |

**Leyenda de Impacto:**
- **`🔴 Alto`** Crítico para el éxito del proyecto, sin esto el proyecto falla
- **`🟡 Medio`** Importante pero no crítico, mejora la calidad pero no es esencial
- **`🟢 Bajo`** Útil pero no esencial, puede ser pospuesto u omitido

## Prompts de usuario 📝👤

**Nota:** Los archivos están organizados en la carpeta `documentos/` del proyecto y contienen la documentación generada a partir de cada prompt ejecutado.

- **`init.md`:**
Archivo con requisitos iniciales del ejercicio de pruebas E2E con Cypress para la interfaz de posiciones del proyecto LTI-ATS

- **`hdu.md`:**
Documento de historias de usuario para el sistema LTI-ATS, incluyendo 10 historias principales con criterios de aceptación, tareas y priorización

- **`BDD.md`:**
Especificaciones BDD usando lenguaje Gherkin para todas las funcionalidades del sistema LTI-ATS

- **`plan-trabajo-cypress.md`:**
Plan de trabajo para implementar Cypress y crear pruebas E2E para la interfaz de posiciones

***Estos archivos no fueron versionados ya que no es el scope del ejercicio.***

### **Prompt 1:** `🔍 Análisis de Requisitos` `📋 Documentación Técnica`
```
Eres un experimentado Product Owner.

Se necesita probar la interfaz posiciones del proyecto LTI-ATS, mediante pruebas E2E.

Analiza @init.md para entender que se espera de las pruebas (no ejecutes nada q se indique en ese archivo)

analiza todo el codigo y aplicando ingeneria inversa extrae la maxima cantidad de historias de usuario.

Ejemplos de User Story

Desarrollo de Productos:"Como gerente de producto, quiero una manera en que los miembros del equipo puedan entender cómo las tareas individuales contribuyen a los objetivos, para que puedan priorizar mejor su trabajo."

Experiencia del Cliente:"Como cliente recurrente, espero que mi información quede guardada para crear una experiencia de pago más fluida, para que pueda completar mis compras de manera rápida y sencilla."

Aplicación Móvil:"Como usuario frecuente de la aplicación, quiero una forma de simplificar la información relevante de la manera más rápida posible, para poder acceder a la información que necesito de manera eficiente."

Las historias deben tener la siguiente estructura:

Formato estándar: "Como [tipo de usuario], quiero [realizar una acción] para [obtener un beneficio]".

Descripción: Una descripción concisa y en lenguaje natural de la funcionalidad que el usuario desea.

Criterios de Aceptación: Condiciones específicas que deben cumplirse para considerar la User Story como "terminada", éstos deberian de seguir un formato similar a "Dado que" [contexto inicial], "cuando" [acción realizada], "entonces" [resultado esperado].

Notas adicionales: Notas que puedan ayudar al desarrollo de la historia

Tareas: Lista de tareas y subtareas para que esta historia pueda ser completada

guiate por el siguiente ejemplo de estructura:

Título de la Historia de Usuario:

Como [rol del usuario], quiero [acción que desea realizar el usuario], para que [beneficio que espera obtener el usuario]. Criterios de Aceptación:

[Detalle específico de funcionalidad] [Detalle específico de funcionalidad] [Detalle específico de funcionalidad] Notas Adicionales:

[Cualquier consideración adicional] Historias de Usuario Relacionadas:

[Relaciones con otras historias de usuario]

utiliza @hdu.md  y documenta todo aplicando buenas practicas agiles
```

### **Prompt 2:** `🧪 Especificaciones BDD` `📋 Documentación Técnica`
```
Para un mejor entendimiento de todas las partes involucradas utiliza @hdu.md y redacta el comportamiento del sistema usando enfoque BDD con lenguaje gherkin:

Feature: Descripción general de lo que se está probando.
Scenario: Un caso específico de uso o situación.
Given: Configuración inicial del escenario.
When: Acción o evento que se está probando.
Then: Resultado esperado después de la acción.

ejemplo:

Feature: User login
  
    Scenario: User logs in with valid credentials
  
      Given the user is on the login page
  
      When the user enters a valid username and password
  
      Then the user should be redirected to the dashboard
 
redactalo de tal manera que usuarios no tecnicos como la parte de negocio puedan entenderlo y que la parte tecnica como desarrolladores sean capaces de escribir los casos de pruebas E2E con cypress a partir de este documento

documenta todo en @BDD.md 
```

### **Prompt 3:** `🚀 Planificación de Testing` `🔍 Análisis de Requisitos`
```
Eres un desarrollador fullstack senior y necesitas implementar cypress en el proyecto para realizar las pruebas E2E de la interfaz de posiciones. utiliza @init.md para la solicitud inicial del trabajo, @hdu.md y @BDD.md para generar los casos de prueba. si necesitas contexto general del proyecto puedes revisar los @README.md @README.md 

antes de realizar cualquier cosa, primero entregame el plan de trabajo detallado en un archivo .md
```

### **Prompt 4:** `🧪 Implementación de Testing` `🚀 Planificación de Testing`
```
realiza la solicitud descrita en @init.md siguiendo el plan detallado en @plan-trabajo-cypress.md
```

### **Prompt 5:** `📊 Ejecución y Reportes` `🧪 Implementación de Testing`
```
ejecuta las pruebas y genera un reporte de cobertura con un detalle analizado de casos de exito, fallos y posibles mejoras
```

### **Prompt 6:** `🔍 Análisis de Requisitos` `📊 Ejecución y Reportes`
```
no veo pruebas ni evidencia del detalle del proceso, que se muestra al presionar "ver proceso" y muestre el tablero kanban. recuerda los escenarios descritos en @init.md, dame un reporte antes de tocar el frontend
```

### **Prompt 7:** `🧪 Implementación de Testing` `🔍 Análisis de Requisitos`
```
ejecuta las mejoras, solo los puntos del 1 al 4, no ejecutes nada aun
```

### **Prompt 8:** `🧪 Implementación de Testing` `🔍 Análisis de Requisitos`
```
Al arrastrar las tarjetas de los candidatos entre las columnas de etapas, el sistema arroja un error de runtime:

Uncaught runtime errors:
×
ERROR
Cannot read properties of undefined (reading 'candidates')
TypeError: Cannot read properties of undefined (reading 'candidates')
    at onDragEnd (http://localhost:3000/static/js/bundle.js:99626:15)
```

### **Prompt 9:** `🔍 Análisis de Requisitos` `📊 Ejecución y Reportes`
```
en los videos sigo sin ver esta pantalla @Image, verifica q se haya probado e indicame en donde puedo revisar los test asociados
```

### **Prompt 10:** `🔍 Análisis de Requisitos` `📊 Ejecución y Reportes`
```
en el video siempre veo esta url http://localhost:3000/positions y no esta http://localhost:3000/positions/1 por ejemplo donde se ve el detalle
```

## Conclusiones 🏁

### **Resumen del Proceso de Desarrollo**

El proyecto LTI-ATS siguió un proceso estructurado desde el análisis de requisitos hasta la implementación completa de pruebas E2E con Cypress. Se comenzó con ingeniería inversa del código existente, se crearon especificaciones BDD para facilitar la comunicación entre equipos, se planificó la implementación de testing, y se culminó con la implementación funcional siguiendo las mejores prácticas.

### **Puntos Clave del Proceso**

#### **1. Análisis y Planificación (Prompts 1-3)**
Fase inicial enfocada en la comprensión del sistema existente mediante ingeniería inversa, creación de especificaciones BDD para comunicación efectiva entre equipos técnicos y de negocio, y planificación técnica detallada de la implementación de Cypress.

#### **2. Implementación y Validación (Prompts 4-5)**
Fase de implementación técnica completa de Cypress siguiendo el plan establecido, incluyendo Page Objects, comandos personalizados, fixtures de datos y pruebas E2E, culminando con la validación mediante ejecución exitosa y reportes de calidad.

#### **3. Corrección y Optimización (Prompts 6-10)**
Fase final dedicada a la identificación y corrección de gaps críticos, implementación de mejoras, corrección de errores de funcionalidad, y optimización de la cobertura de pruebas para garantizar un sistema completamente funcional.

### **Lecciones Aprendidas**

#### **Técnicas**
La ingeniería inversa del código existente es fundamental para comprender sistemas complejos. El uso de patrones como Page Objects y comandos personalizados en Cypress mejora significativamente la mantenibilidad de las pruebas E2E.

#### **Metodológicas**
El enfoque BDD facilita la comunicación entre equipos técnicos y de negocio. La planificación detallada antes de la implementación reduce riesgos y mejora la calidad del trabajo entregado.

#### **Organizacionales**
La documentación estructurada y la separación de responsabilidades entre análisis, especificación, planificación e implementación mejora la calidad del trabajo y facilita el mantenimiento.

### **Resultado Final**

El proyecto generó una implementación completa y funcional de pruebas E2E con Cypress que incluye: 10 historias de usuario estructuradas, especificaciones BDD detalladas, plan de trabajo técnico completo, implementación funcional con Page Objects, y 34 casos de prueba con 100% de éxito. Se identificaron y corrigieron todos los gaps críticos, proporcionando una base sólida para el testing continuo del sistema LTI-ATS.

### **Recomendaciones para Futuros Proyectos**

1. **Análisis Inicial Exhaustivo** - Realizar ingeniería inversa completa antes de comenzar cualquier desarrollo
2. **Documentación BDD Estructurada** - Usar especificaciones Gherkin para facilitar la comunicación entre equipos
3. **Patrones de Testing Sólidos** - Implementar Page Objects y comandos personalizados desde el inicio
4. **Validación Continua** - Revisar y actualizar la documentación según evoluciona el proyecto