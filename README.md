# MoodFlix

MoodFlix es una app web que recomienda películas y música según tu estado de ánimo y el tiempo disponible. El sitio ofrece una experiencia interactiva para descubrir contenido relevante y guardar favoritos en el navegador.

## Integrantes
- Emmanuel Britez
- Josué Aquino
- Octavio Britez

## Idea elegida
MoodFlix — recomendador de contenido basado en estado de ánimo y tiempo disponible.

## Tecnologías utilizadas
- HTML5
- CSS3
- JavaScript vanilla
- APIs externas: Studio Ghibli y iTunes Search
- localStorage para persistencia

## Funcionalidades principales
- Generación dinámica de recomendaciones combinando estado de ánimo y duración.
- Filtro por tiempo disponible para mostrar contenido adecuado.
- Motor de búsqueda integrado para títulos y contenidos.
- Sistema de favoritos almacenado en `localStorage`.
- Sistema de historial emocional.
- Sistema de racha de uso.
- Navegación responsive con menú móvil y versiones para desktop.
- Interfaz accesible con etiquetas semánticas, labels y buena estructura.

## Estructura del proyecto
- `index.html`: página principal con generador de recomendaciones.
- `pages/search.html`: resultados de búsqueda.
- `pages/favorites.html`: vista de favoritos guardados.
- `pages/user.html`: perfil de usuario e historial emocional.
- `assets/css/`: estilos y diseño responsive.
- `assets/js/`: lógica de búsqueda, recomendaciones, favoritos y renderizado.
- `assets/data/`: recursos de datos y configuraciones.

## Cómo usar el proyecto
1. Abrir `index.html` en el navegador.
2. Elegir un estado de ánimo.
3. Seleccionar el tiempo disponible.
4. Presionar "¡Generar Recomendación!".
5. Guardar elementos como favoritos desde las tarjetas.
6. Revisar favoritos en la página "Favoritos".
7. En el perfil, ademas, podes registrar tu estado diario en un historial con racha semanal.

## Enlaces
- Repositorio: https://github.com/Josu98888/MoodFlix
- Deploy: https://mood-flix-peach.vercel.app/



