#mobile_app

Task: Design a unified system for all Error and Empty-State screens used throughout the app.

Context:
The app requires several error and empty states. These screens must share a consistent layout and visual language to maintain UI cohesion.

All states should reuse the same structural component pattern so the screens feel consistent and easy to implement.

Reusable layout structure:

Header
- Back button when applicable
- App title or logo

Main content (centered vertically)

1. Illustration
Friendly illustration or icon representing the state

2. Title
Short clear headline

3. Description
One sentence explaining the situation

4. Primary action button

5. Optional secondary action

Design rules:

- Content vertically centered
- Illustration displayed at the top
- Title uses same typography scale as other app screens
- Description uses secondary text color
- Buttons follow the existing primary and secondary styles
- Maintain consistent spacing and hierarchy
- Mobile-first layout

States to implement:

404 — Page Not Found

Title:
"Página no encontrada"

Description:
"La página que buscas no existe o fue movida."

Primary button:
"Volver al inicio"

Secondary button:
"Ver mis juegos"


500 — Server Error

Title:
"Algo salió mal"

Description:
"No pudimos cargar esta página. Inténtalo de nuevo."

Primary button:
"Reintentar"

Secondary button:
"Volver al inicio"


Game Not Found

Title:
"Juego no encontrado"

Description:
"Este juego no existe o fue eliminado."

Primary button:
"Explorar juegos"

Secondary button:
"Crear un juego"


Game Private

Title:
"Juego privado"

Description:
"Este juego solo puede ser visto por su creador."

Primary button:
"Volver al inicio"

Secondary button:
"Crear tu propio juego"


No Games Yet

Title:
"Aún no tienes juegos"

Description:
"Crea tu primer memory game en menos de un minuto."

Primary button:
"Crear juego"

Secondary button:
"Explorar ejemplos"


Leaderboard Empty

Title:
"Aún no hay puntuaciones"

Description:
"Nadie ha completado este juego todavía."

Helper text:
"¡Sé el primero en lograr la mejor puntuación!"

Primary button:
"Jugar ahora"

Secondary button:
"Compartir juego"


Constraints:

- All states must reuse the same layout component
- Maintain visual consistency across screens
- Avoid redesigning the structure for each state
- Ensure buttons are clearly visible and tappable
- Mobile-first design