# PRD Section - Game Analytics & Leaderboard

## Screens in this section
1. Game Details / Analytics
2. Leaderboard (Today / All Time / Friends)
3. Leaderboard empty state

## A) Game Details / Analytics - Required Functionality
1. Must include sticky header with:
- Back navigation
- Game title
- Secondary action (`Editar`)
2. Must show compact photo preview thumbnails for the game.
3. Must display metrics in dense, scannable format:
- Jugadas
- Usuarios únicos
- Tasa de finalización
- Intentos promedio
- Tiempo promedio
4. Must keep metrics arranged in compact 2-column layout with final full-width metric.
5. Must include top-player summary block (top 3) with medals and quick stats.
6. Must expose navigation to full leaderboard (`Ver leaderboard completo`).
7. Must include `Últimas partidas` section with recent play rows.
8. Must support reduced row count in summary view and optional `Ver todas` action.
9. Must include share controls:
- `Compartir juego`
- `Copiar enlace`
10. Copy-link action must place canonical game URL in clipboard and confirm success.
11. Must handle empty recent games gracefully.
12. Must preserve mobile-first readability with tight vertical spacing.

## B) Leaderboard - Core Screen Requirements
1. Must include back navigation and game title context.
2. Must include segmented filter tabs:
- Hoy
- Todo el tiempo
- Amigos
3. Must update displayed rows when tab changes.
4. Must highlight top 3 with premium visual treatment (medals/cards).
5. Must show standard rows for remaining ranked entries.
6. Each row must display:
- Rank
- Avatar (or initials fallback)
- Username
- Attempts
- Completion time
7. Must keep ranking hierarchy visually obvious (large top placements, compact rest).
8. Must support scroll for long lists.
9. Must support progressive reveal (`Cargar más`) in all-time tab.
10. Must preserve stable sorting by rank.

## C) Leaderboard Empty State - Required Functionality
1. Must show friendly empty-state when no scores exist.
2. Must include clear title and explanatory copy.
3. Must keep same leaderboard shell and context (title, header).
4. Must offer clear next action path (play/compete context).

## D) Data & Behavior Rules
1. Must support player avatars with robust fallback initials generation.
2. Must handle missing optional fields without layout breaks.
3. Must maintain correct tab state and pagination state boundaries.
4. Must support return flow to source screen (direct leaderboard vs from details).
5. Must keep metric values and leaderboard values localized/format-consistent.

## E) Navigation/Integration Requirements
1. `Game card -> View details` must open analytics screen.
2. `Game details -> Ver leaderboard completo` must open leaderboard.
3. Leaderboard back action must restore prior context (especially when opened from details).
4. Share and copy-link actions must be available from analytics without leaving screen.
