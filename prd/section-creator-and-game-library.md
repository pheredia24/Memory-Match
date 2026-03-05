# PRD Section - Creator Flow & Game Library

## Screens in this section
1. Creator shell (header, settings menu, segmented control)
2. Create Game - Step 1 (Basic setup)
3. Create Game - Step 2 (Game options)
4. Full-screen preview modal
5. Game creation loading + success modal
6. My Games list
7. Game card action sheet

## A) Creator Shell - Required Functionality
1. Must expose top navigation with current context title (`Crear juego` / `Mis juegos`).
2. Must include settings menu with entry points to:
- Account settings
- Support center
- Leaderboard demo
- Admin dashboard
- Onboarding demo launcher
- Game landing demo launcher
- Error state demos
- Legal/privacy screens
- Sign out
3. Must provide segmented control to switch between:
- `Crear`
- `Mis juegos`
4. Must persist and react to active tab state.
5. Must keep footer CTA fixed only in `Crear` flow.
6. Must handle view switching without stale modal states.

## B) Create Game - Step 1 (Basic Setup) - Required Functionality
1. Must include required title input.
2. Must include language selector trigger and current language display.
3. Must include photo management card with:
- Current photo count
- Next target count
- Dynamic progress feedback
4. Must support adding photos up to maximum 10.
5. Must prevent adding beyond max and show feedback (`Máximo 10 fotos`).
6. Must support removing individual photos.
7. Must calculate active mode automatically from exact photo counts.
8. Must support fixed game modes:
- Fácil: 4 photos, 8 cards, 2x4
- Normal: 6 photos, 12 cards, 3x4
- Difícil: 8 photos, 16 cards, 4x4
- Experto: 10 photos, 20 cards, 4x5
9. Must render mode cards with mini-grid previews.
10. Must show per-mode state labels:
- Locked (`Añade X fotos más`)
- Active (`Modo activo`)
- Passed/available states with clear visual distinction
11. Must enforce valid photo counts for mode activation.
12. Must keep CTA disabled until title exists and mode is valid.
13. Must provide dynamic CTA helper text for invalid counts (add/remove guidance).

## C) Create Game - Step 2 (Game Options) - Required Functionality
1. Must provide game summary preview card:
- Title
- Language
- Photo count
- Thumbnail preview grid
2. Must include action to test gameplay (`Probar juego`).
3. Must expose configurable gameplay elements with toggles:
- Show time
- Show attempts
- Enable leaderboard
4. Must support row-level tap and direct switch interaction for toggles.
5. Must keep state synchronized with actual gameplay HUD behavior.
6. Must provide `Atrás` and `Crear juego` CTAs.

## D) Preview Modal - Required Functionality
1. Must display fullscreen preview with close action.
2. Must show game title and subtitle context.
3. Must render preview grid using selected photos.
4. Must conditionally show HUD sample indicators (time/attempts) based on toggles.
5. Must allow exiting preview without losing creator form state.

## E) Create Game Submission + Success - Required Functionality
1. Must show staged creation progress when user taps `Crear juego`:
- `Creando juego...`
- `Generando tablero...`
- `Preparando imágenes...`
2. Must disable duplicate submissions while creation is in progress.
3. Must show success modal with clear next actions:
- `Jugar ahora`
- `Compartir`
4. `Jugar ahora` must open gameplay in preview creator mode.
5. `Compartir` must route to `Mis juegos` and provide copy/share confirmation feedback.

## F) My Games List - Required Functionality
1. Must display total created games count.
2. Must render each game card with title, publication status, and quick link action.
3. Must support both published and draft visual states.
4. Must keep list scrollable and mobile-friendly.

## G) Game Card & Action Sheet - Required Functionality
1. Must provide per-game quick action (`Copiar enlace`).
2. Must copy canonical game URL to clipboard and confirm with toast.
3. Must provide bottom sheet action menu with options:
- Open
- Edit
- Duplicate
- Unpublish
- View details
- Delete
4. Must route `View details` into analytics/details screen.
5. Must close action sheet after any action.
6. Destructive actions must be visually distinct.

## Creator Flow Validation/State Requirements
1. Creator flow must enforce 2-step progression (cannot skip from invalid step 1).
2. Must scroll to top when changing step/tab/view to maintain context.
3. Must preserve form state during temporary modal transitions.
4. Must prevent invalid gameplay setup from being published.
5. Must keep visual consistency with iOS-inspired mobile card/form structure.
