# Historial de Prompts 📑

## Modelo 🤖

- **LLM:** Claude Sonnet 4
- **Versión:** Claude-3.5-Sonnet-20241022

## Categorías 🏷️

**Nota:** Los emojis de las categorías pueden variar según el proyecto. Cada categoría debe tener un emoji único que represente su propósito.

### **Análisis de Requisitos** 🔍
Prompts relacionados con la comprensión y análisis de requisitos del proyecto, incluyendo ingeniería inversa y extracción de historias de usuario]

### **Especificaciones BDD** 🧪
Prompts para la creación de especificaciones de comportamiento usando enfoque BDD y lenguaje Gherkin]

### **Planificación de Testing** 🚀
Prompts para la planificación e implementación de estrategias de testing, incluyendo frameworks como Cypress

### **Ejecución y Reportes** 📊
Prompts para la ejecución de pruebas, generación de reportes de cobertura y análisis de calidad del sistema

### **Documentación Técnica** 📋
Prompts para la creación y mantenimiento de documentación técnica del proyecto]

### **Gestión de Proyectos** 📊
Prompts relacionados con la gestión y planificación de proyectos de desarrollo]

### **Arquitectura y Diseño** 🏗️
Prompts para el diseño de arquitectura de software y patrones de diseño]

**Nota:** Pueden existir más o menos categorías según las necesidades del proyecto. Cada una debe tener un emoji único.

## Estadísticas 📊

### **Resumen General**
- **Total de Prompts:** 5
- **Prompts de Análisis de Requisitos:** 1
- **Prompts de Especificaciones BDD:** 1
- **Prompts de Planificación de Testing:** 1
- **Prompts de Implementación de Testing:** 1
- **Prompts de Ejecución y Reportes:** 1
- **Prompts de Documentación Técnica:** 0

**Nota:** El número de categorías y prompts puede variar según el proyecto. Ajustar según sea necesario.

### **Prompts por Categoría**

| Categoría | Cantidad | Porcentaje |
|-----------|----------|------------|
| 🔍 Análisis de Requisitos | 1 | 20.0% |
| 🧪 Especificaciones BDD | 1 | 20.0% |
| 🚀 Planificación de Testing | 1 | 20.0% |
| 🧪 Implementación de Testing | 1 | 20.0% |
| 📊 Ejecución y Reportes | 1 | 20.0% |
| 📋 Documentación Técnica | 0 | 0.0% |
| 📊 Gestión de Proyectos | 0 | 0.0% |

**Nota:** Ajustar el número de filas según la cantidad de categorías del proyecto.

### **Roles Utilizados**

| Rol | Frecuencia | Descripción |
|-----|------------|-------------|
| **Product Owner** | 1 | Rol para análisis de requisitos y extracción de historias de usuario |
| **Analista de Sistemas** | 1 | Rol para especificaciones BDD y comportamiento del sistema |
| **Desarrollador Fullstack Senior** | 2 | Rol para planificación e implementación técnica de testing |

**Nota:** Ajustar el número de filas según los roles identificados en el proyecto.

### **Problemas Más Frecuentes**

| Problema | Frecuencia | Categoría |
|----------|------------|-----------|
| Necesidad de pruebas E2E para interfaz de posiciones | 2 | 🚀 Planificación de Testing |
| Falta de especificaciones BDD claras | 1 | 🧪 Especificaciones BDD |
| Necesidad de historias de usuario estructuradas | 1 | 🔍 Análisis de Requisitos |
| Implementación técnica de Cypress | 1 | 🧪 Implementación de Testing |
| Necesidad de validación y reportes de pruebas | 1 | 📊 Ejecución y Reportes |

**Nota:** Ajustar el número de filas según los problemas identificados en el proyecto.

### **Prompts Más Críticos**

| Prompt | Impacto | Razón |
|--------|---------|-------|
| Prompt 1 | 🔴 Alto | Define la base de historias de usuario para todo el proyecto |
| Prompt 2 | 🔴 Alto | Establece especificaciones BDD para comunicación técnica y de negocio |
| Prompt 3 | 🔴 Alto | Planifica la implementación de testing E2E crítico para la calidad |
| Prompt 4 | 🔴 Alto | Implementa las pruebas E2E según los requisitos del ejercicio |
| Prompt 5 | 🔴 Alto | Valida la implementación y genera reportes de calidad del sistema |

## Prompts de usuario 📝👤

**Nota:** Los archivos están organizados en la carpeta `documentos/` del proyecto y contienen la documentación generada a partir de cada prompt ejecutado.

- **`init.md`:**
Archivo que contiene los requisitos iniciales del ejercicio de pruebas E2E con Cypress para la interfaz de posiciones del proyecto LTI-ATS. Incluye contexto, requisitos del ejercicio y criterios de entrega

- **`hdu.md`:**
Documento completo de historias de usuario para el sistema LTI-ATS, incluyendo 10 historias principales con criterios de aceptación, tareas y priorización. Sigue las mejores prácticas ágiles

- **`BDD.md`:**
Especificaciones BDD completas usando lenguaje Gherkin para todas las funcionalidades del sistema LTI-ATS. Incluye escenarios para gestión de posiciones, proceso de contratación, movimiento de candidatos y más

- **`plan-trabajo-cypress.md`:**
Plan de trabajo detallado para implementar Cypress y crear pruebas E2E para la interfaz de posiciones. Incluye 6 fases de implementación, cronograma, herramientas y métricas de éxito

***Estos archivos no fueron versionados ya que no es el scope del ejercicio.***

**Nota:** El número de prompts puede variar según el proyecto. Cada prompt debe incluir las categorías relevantes (máximo 3) y una descripción clara del contexto y solicitud.

### **Prompt 1:** `🔍 Análisis de Requisitos` `📋 Documentación Técnica`
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

### **Prompt 2:** `🧪 Especificaciones BDD` `📋 Documentación Técnica`
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

### **Prompt 3:** `🚀 Planificación de Testing` `🔍 Análisis de Requisitos`
Eres un desarrollador fullstack senior y necesitas implementar cypress en el proyecto para realizar las pruebas E2E de la interfaz de posiciones. utiliza @init.md para la solicitud inicial del trabajo, @hdu.md y @BDD.md para generar los casos de prueba. si necesitas contexto general del proyecto puedes revisar los @README.md @README.md 

antes de realizar cualquier cosa, primero entregame el plan de trabajo detallado en un archivo .md

### **Prompt 4:** `🧪 Implementación de Testing` `🚀 Planificación de Testing`
realiza la solicitud descrita en @init.md siguiendo el plan detallado en @plan-trabajo-cypress.md

### **Prompt 5:** `📊 Ejecución y Reportes` `🧪 Implementación de Testing`
ejecuta las pruebas y genera un reporte de cobertura con un detalle analizado de casos de exito, fallos y posibles mejoras 

## Conclusiones 🏁

### **Resumen del Proceso de Desarrollo**

El proyecto LTI-ATS ha seguido un proceso de desarrollo estructurado que comenzó con el análisis de requisitos mediante ingeniería inversa del código existente, continuó con la creación de especificaciones BDD para facilitar la comunicación entre equipos técnicos y de negocio, siguió con la planificación detallada de la implementación de pruebas E2E usando Cypress, y culminó con la implementación completa de las pruebas siguiendo las mejores prácticas de testing.

### **Puntos Clave del Proceso**

**Nota:** El número de fases puede variar según el proyecto. Cada fase debe representar un período o enfoque específico del desarrollo.

#### **1. Análisis de Requisitos (Prompts 1)**
Primera fase del proyecto enfocada en la comprensión profunda del sistema existente mediante ingeniería inversa. Se extrajeron 10 historias de usuario completas con criterios de aceptación, tareas y priorización, estableciendo la base para todo el desarrollo posterior]

#### **2. Especificaciones BDD (Prompts 2)**
Segunda fase del proyecto dedicada a la creación de especificaciones de comportamiento usando lenguaje Gherkin. Se documentaron 8 features principales con escenarios detallados que facilitan la comunicación entre usuarios de negocio y desarrolladores técnicos]

#### **3. Planificación de Testing (Prompts 3)**
Tercera fase del proyecto enfocada en la planificación técnica de la implementación de Cypress. Se creó un plan de trabajo detallado con 6 fases de implementación, cronograma, herramientas y métricas de éxito para las pruebas E2E]

#### **4. Implementación de Testing (Prompts 4)**
Cuarta fase del proyecto dedicada a la implementación técnica completa de Cypress siguiendo el plan establecido. Se implementaron Page Objects, comandos personalizados, fixtures de datos y pruebas E2E que cubren todos los requisitos del ejercicio

#### **5. Ejecución y Validación (Prompts 5)**
Quinta fase del proyecto enfocada en la validación de la implementación mediante la ejecución de todas las pruebas y la generación de reportes detallados de cobertura, rendimiento y calidad del sistema de testing implementado

**Nota:** Continuar agregando fases según sea necesario. Cada fase debe tener un número secuencial y describir un período específico del desarrollo.

### **Lecciones Aprendidas**

#### **Técnicas**
La ingeniería inversa del código existente es fundamental para comprender sistemas complejos y extraer requisitos funcionales. El uso de patrones como Page Objects y comandos personalizados en Cypress mejora significativamente la mantenibilidad de las pruebas E2E. La implementación de mocks de API garantiza consistencia en las pruebas.

#### **Metodológicas**
El enfoque BDD facilita la comunicación entre equipos técnicos y de negocio, asegurando que las especificaciones sean comprensibles para ambas audiencias. La priorización de historias de usuario ayuda a enfocar el desarrollo en las funcionalidades más críticas. La planificación detallada antes de la implementación reduce riesgos y mejora la calidad.

#### **Organizacionales**
La documentación estructurada y la planificación detallada son esenciales para proyectos de testing complejos. La separación de responsabilidades entre análisis, especificación, planificación e implementación mejora la calidad del trabajo entregado. El uso de patrones establecidos facilita el mantenimiento y la escalabilidad.

### **Resultado Final**

El proyecto ha generado una implementación completa de pruebas E2E con Cypress que incluye: 10 historias de usuario estructuradas, especificaciones BDD detalladas para 8 features principales, un plan de trabajo técnico completo, una implementación funcional con Page Objects, comandos personalizados, fixtures de datos y 30 casos de prueba que cubren todos los requisitos del ejercicio, y validación completa mediante ejecución exitosa con reportes detallados de cobertura y calidad. Esta implementación proporciona una base sólida para el testing continuo y la calidad del sistema LTI-ATS.

### **Recomendaciones para Futuros Proyectos**

1. **Análisis Inicial Exhaustivo** [Realizar ingeniería inversa completa del código existente antes de comenzar cualquier desarrollo]
2. **Documentación BDD Estructurada** [Usar especificaciones Gherkin para facilitar la comunicación entre equipos]
3. **Planificación Técnica Detallada** [Crear planes de trabajo con fases claras y entregables específicos]
4. **Patrones de Testing Sólidos** [Implementar Page Objects y comandos personalizados desde el inicio]
5. **Implementación Iterativa** [Seguir un plan estructurado y validar cada fase antes de continuar]
6. **Documentación Completa** [Mantener README actualizado y documentar todos los componentes]
7. **Validación Continua** [Revisar y actualizar la documentación según evoluciona el proyecto]
8. **Ejecución y Reportes** [Implementar ejecución automática y generación de reportes de calidad]
9. **Monitoreo de Rendimiento** [Establecer métricas continuas de rendimiento y estabilidad de pruebas]

**Nota:** Ajustar el número de recomendaciones según sea necesario.