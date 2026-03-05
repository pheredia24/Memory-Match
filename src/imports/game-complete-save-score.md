#mobile_app

Task: Improve the existing "Game Completed" results screen by adding a score saving flow for players who are not logged in.

Important:
Do NOT redesign the entire screen. Keep the current layout, visual style, and components. Only add a new section for saving the score.

Context:
Players currently finish the game and see their results but cannot save their score to the leaderboard unless they have an account.

To improve engagement and leaderboard participation, allow players to save their score by entering a username after finishing the game.

Screen modifications:

1. Insert a new section below the score metrics card (Tiempo, Intentos, Parejas).

Section title:
"Guardar puntuación"

Description text:
"Guarda tu resultado en el leaderboard."

2. Add a text input field

Label:
"Nombre"

Placeholder:
"Tu nombre"

Input rules:
- max length ~20 characters
- simple text username
- no account required

3. Add a primary action button under the input

Button label:
"Guardar puntuación"

Button style:
Primary style consistent with the app.

4. Optional skip option

Below the button add a subtle text link:

"Omitir"

Behavior:
User can continue without saving their score.

5. Leaderboard ranking feedback (important UX improvement)

After the user enters a name and taps "Guardar puntuación":

Display a confirmation message:

"¡Puntuación guardada!"

Optionally show ranking feedback:

"Estás en la posición #3 del leaderboard"

This message should appear below the save button or replace the save section.

6. Maintain the existing actions below this section

Do NOT modify these elements:

- Jugar otra vez
- Compartir
- Create your own game
- Create Your Game button

The new save score section should appear ABOVE those actions.

Design constraints:

- Mobile-first layout
- Keep spacing consistent with existing cards
- Use the same card style as the score summary
- Ensure the new section feels like a natural extension of the current screen
- Avoid making the screen feel crowded

Goal:

Allow players to save their score with minimal friction while preserving the current celebratory completion screen.