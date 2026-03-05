# PRD Section - Gameplay & Completion Results

## Screens in this section
1. Gameplay board (live memory game)
2. Completion modal (preview variant)
3. Completion modal (standard variant)
4. Save score flow (name input + submit + skip)
5. Score saved confirmation state

## A) Gameplay Board - Required Functionality
1. Must build card deck as paired duplicates for each uploaded photo.
2. Must randomize/shuffle card order at game start.
3. Must prevent invalid taps:
- During match-processing delay
- On already matched cards
- On already flipped cards
- When two cards are already flipped
4. Must support card flip animation and matched-state highlighting.
5. Must detect matches by shared `photoId`.
6. Must increment attempt counter only when two cards are evaluated.
7. Must flip unmatched cards back after delay.
8. Must mark matched pairs permanently and increment match count.
9. Must detect game completion when matched pairs equals uploaded photos count.
10. Must support restart action that resets:
- Board order (reshuffle)
- Timer
- Attempts
- Matches
- Completion state
- Save-score state
11. Must render HUD with conditional metrics:
- Time (if enabled)
- Attempts (if enabled)
- Matched pairs (always)
12. Must provide close action to return to prior flow.
13. Must choose responsive board dimensions by total card count:
- 8 cards -> 2x4
- 12 cards -> 3x4
- 16 cards -> 4x4
- 20 cards -> 4x5
14. Must dynamically calculate square card size to fit viewport.
15. Must recalculate layout on viewport resize.

## B) Timer/Scoring Logic - Required Functionality
1. Must start timer on gameplay start and tick every second.
2. Must stop timer when game is complete.
3. Must format elapsed time as `mm:ss`.
4. Must keep attempt count and time available for result display.
5. Must support accurate score-saving payload generation (name, attempts, time, game id).

## C) Completion Modal (Preview Variant) - Required Functionality
1. Must open automatically on completion.
2. Must show celebratory confirmation and performance summary.
3. Must include preview-specific actions:
- `Volver a la creación`
- `Probar otra vez`
4. Must not show score-saving section in preview variant.

## D) Completion Modal (Standard Variant) - Required Functionality
1. Must display final metrics card:
- Time (if enabled)
- Attempts (if enabled)
- Pairs completed
2. Must show primary post-game actions:
- `Jugar otra vez`
- `Compartir`
3. Must include creator conversion CTA block (`Create Your Game`) when configured.

## E) Save Score Flow - Required Functionality
1. Must insert dedicated section below metrics and above final action stack.
2. Must include:
- Section title `Guardar puntuación`
- Supporting description text
- Name input field
- Primary action `Guardar puntuación`
- Optional skip action `Omitir`
3. Name input constraints:
- Max length 20 chars
- Trim-based non-empty validation before submit
4. Must allow Enter key submit when valid.
5. Must disable save button when input is empty.
6. Must allow continue-without-save via `Omitir`.

## F) Score Saved Confirmation - Required Functionality
1. After save, must replace input form with confirmation state.
2. Must show success message (`¡Puntuación guardada!`).
3. Must optionally display leaderboard rank feedback (`posición #N`).
4. Must keep downstream actions available after save.

## Gameplay UX/Quality Requirements
1. Must preserve smooth visual transitions for card flipping and modal entry.
2. Must keep interactions predictable under rapid taps.
3. Must avoid board overflow/clipping on small screens.
4. Must keep completion modal scrollable when content grows.
5. Must support both demo/preview mode and real player mode without branching bugs.
