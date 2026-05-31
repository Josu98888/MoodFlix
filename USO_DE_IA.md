# Informe de uso de IA

## 1. ¿Qué herramientas de IA utilizaron?

Se utilizaron dos herramientas principales de IA:
- **GitHub Copilot**: Asistente de programación basado en IA que proporcionaba sugerencias de código contextuales y explicaciones sobre patrones de desarrollo.
- **GitHub Copilot Chat (Codex)**: Modelo de lenguaje especializado que permitía conversaciones más naturales para obtener orientación técnica y respuestas a consultas conceptuales.

Estas herramientas permitieron a cada integrante del equipo recibir sugerencias de código contextuales, explicaciones sobre patrones de desarrollo, y orientación técnica durante diferentes fases del proyecto.

## 2. ¿Para qué las utilizaron?

La IA se empleó principalmente para:
- Acelerar la escritura de código respetando nuestras especificaciones y restricciones técnicas.
- Obtener explicaciones sobre patrones de manejo de eventos y buenas prácticas (localStorage, APIs, formularios, estilos responsivos).
- Investigar cómo estructurar llamadas a APIs públicas y coordinarlas con la lógica del proyecto.
- Generar ejemplos de código que luego eran validados y ajustados por cada integrante.
- Documentar funcionalidades y apoyar la redacción del README.

## 3. ¿Qué partes del proyecto fueron asistidas por IA?

- **Módulo de Favoritos**: Octavio utilizó IA para desarrollar `favorite-handler.js` y `favorite.js`, consultando sobre patrones de manejo de eventos y persistencia de datos en `localStorage`.
- **APIs e Integración**: Josué y Octavio consultaron a la IA sobre cómo estructurar las llamadas a las APIs de Studio Ghibli e iTunes en `api.js`, y cómo coordinarlas con el motor de recomendaciones en `recommendation.js`.
- **Módulo de Usuario**: Emmanuel usó IA para desarrollar `user.html`, `user.css` y `user.js`, consultando sobre patrones de formularios interactivos y estilos responsivos.
- **Página Principal y Audio**: Josué empleó IA para organizar `index.html` y gestionar la reproducción de sonido.
- **Documentación**: Se utilizó IA para estructurar y mejorar el README del proyecto.

## 4. ¿Qué prompts o consultas les resultaron más útiles?

- **Octavio**: "¿Cómo implementar un manejador de eventos que guarde favoritos en localStorage y los recupere al recargar la página?" y "¿Cuáles son los mejores patrones para manejar errores en operaciones de localStorage?"
- **Josué**: "¿Cómo estructurar llamadas a múltiples APIs y combinar sus respuestas de manera eficiente?" y "¿Cuál es la forma más simple de reproducir audio en HTML5 sin librerías externas?"
- **Emmanuel**: "¿Cómo crear un formulario responsivo con validación de datos en JavaScript vanilla?" y "¿Qué mejores prácticas existen para gestionar estados de usuario en una aplicación sin frameworks?"

Las consultas más efectivas fueron aquellas donde describimos claramente nuestras restricciones (HTML, CSS y JavaScript vanilla) y el contexto específico del proyecto.

## 5. ¿Qué respuestas de la IA tuvieron que corregir?

- **Octavio** tuvo que corregir ejemplos de código que usaban métodos modernos de JavaScript que no se soportaban bien en navegadores antiguos, y ajustar el manejo de errores en localStorage.
- **Josué** ajustó las sugerencias de manejo de APIs que asumían que todas las respuestas tenían la misma estructura, cuando en realidad Studio Ghibli e iTunes devuelven formatos diferentes. También corrigió ejemplos de reproducción de audio que eran innecesariamente complejos.
- **Emmanuel** corrigió ejemplos de formularios que asumían el uso de librerías CSS, adaptándolos a estilos personalizados puros. Simplificó la lógica de validación que la IA había propuesto.
- En general, la IA tendía a sugerir soluciones más complejas de lo necesario; el equipo siempre simplificaba las respuestas para mantener el código legible y mantenible.

## 6. ¿Qué problemas tuvieron al trabajar con IA?

- La IA ocasionalmente generaba código que no respetaba nuestro stack (vanilla JavaScript), sugiriendo librerías o frameworks que habíamos descartado.
- Algunas sugerencias no consideraban las limitaciones específicas de las APIs públicas y sus diferentes formatos de respuesta.
- La IA no siempre reconocía cuándo una solución era innecesariamente compleja para nuestro caso de uso.
- Fue necesario invertir tiempo considerable en explicar el contexto del proyecto para obtener respuestas realmente útiles.
- Ocasionalmente, la IA generaba código sintácticamente correcto pero que no se integraba bien con la lógica existente del proyecto.

## 7. ¿Qué aprendieron durante el proceso?

- La IA es una herramienta aceleradora más potente cuando tienes especificaciones claras y sabes exactamente qué preguntar.
- Cada respuesta de la IA requiere validación humana; no se puede asumir que es correcta solo porque proviene de una IA.
- El proceso de "decir que no" a las sugerencias de la IA fue tan importante como adoptarlas: nos obligó a entender nuestras decisiones y reforzó nuestro conocimiento técnico.
- La combinación de especificaciones claras con validación constante aceleró significativamente el desarrollo sin comprometer la calidad del código.
- La comunicación clara de restricciones y requisitos al interactuar con la IA mejora dramáticamente la calidad de las respuestas.

## 8. ¿Qué partes del código puede explicar cada integrante?

- **Octavio**: Puede explicar la lógica de `favorite-handler.js` y `favorite.js`, incluyendo cómo se usa `localStorage` para persistencia de datos, el manejo de eventos de click, la validación de datos guardados, y la coordinación con el renderizado de la interfaz. Además, puede explicar la estructura de las llamadas a APIs en `api.js` y cómo se validan sus respuestas.
- **Josué**: Puede explicar la organización de `index.html`, el motor de recomendaciones en `recommendation.js`, la integración de múltiples APIs en `api.js`, cómo se implementó la reproducción de audio, y cómo se coordinan todos estos componentes para crear la experiencia de usuario final.
- **Emmanuel**: Puede explicar el módulo de usuario (`user.html`, `user.css`, `user.js`), incluyendo la gestión de formularios interactivos, estilos responsivos, validación de datos en el lado del cliente, y la persistencia de información de perfil.

## 9. ¿Qué decisiones tomó el grupo sin depender de la IA?

- La idea del proyecto: una aplicación colaborativa para registrar y visualizar estados de ánimo combinados con recomendaciones de contenido.
- La selección de APIs públicas (Studio Ghibli para películas e iTunes para música).
- La arquitectura general del proyecto (estructura de carpetas, separación de módulos, flujo de datos).
- Las funcionalidades principales: sistema de favoritos, motor de recomendaciones, perfil de usuario, y reproducción de audio.
- La decisión de usar un enfoque de validación constante y Spec-Driven Development sobre las sugerencias de IA.
- El diseño y la experiencia de usuario de la aplicación.

## 10. ¿Hubo código sugerido por IA que descartaron? ¿Por qué?

Sí, se descartaron varios tipos de sugerencias:

- **APIs y formatos incompatibles**: Código que asumía una única estructura de API cuando teníamos múltiples fuentes con formatos diferentes (Studio Ghibli y iTunes).
- **Complejidad innecesaria**: Ejemplos complejos de formularios y validaciones que no se ajustaban a nuestro diseño minimalista y requerimientos específicos.
- **Manejo de errores incompleto**: Implementaciones de `localStorage` que no consideraban casos de error, datos corruptos, o límites de almacenamiento.
- **Documentación incorrecta**: Código autogenerado que describía funcionalidades que no existían realmente en el proyecto o que especificaba APIs incorrectamente.

En todos los casos, la razón fue que el código no coincidía con la realidad del proyecto, no respetaba nuestras restricciones técnicas establecidas, o simplemente era más complicado de lo necesario para resolver el problema.
