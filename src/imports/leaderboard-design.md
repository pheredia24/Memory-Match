#mobile_app

Task: Design the full Leaderboard screen for a memory game.

Context:
Users can see rankings for a specific game.

Layout should emphasize rankings and player performance.

Header

Back button
Game title

Segmented control

Tabs:
"Hoy"
"Todo el tiempo"
"Amigos"

Leaderboard list

Each row contains:

Rank number
Player avatar
Player name
Attempts
Completion time

Example row:

#1
Avatar
Username
Attempts: 8
Time: 00:35

Top 3 visual highlight

Positions 1–3 displayed as cards:

🥇 First place
🥈 Second place
🥉 Third place

Show:
avatar
name
score

Rest of leaderboard

Scrollable list

Pagination

Button:
"Cargar más"

Empty state

If no scores yet:

Icon
Title: "Aún no hay puntuaciones"
Description: "Sé el primero en completar este juego."

Constraints
- clear ranking hierarchy
- large readable numbers
- mobile-first layout