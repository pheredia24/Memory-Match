# PRD Section - Onboarding & Public Game Entry

## Screens in this section
1. First-time onboarding tutorial
2. Public game landing (shared link)
3. Shared-link not-found route (reuses Game Not Found)

## A) First-Time Onboarding Tutorial - Required Functionality
1. Must appear only for first-time authenticated users.
2. Must persist completion/skip flag in local storage (`onboardingCompleted`).
3. Must provide top-right skip action (`Omitir`).
4. Must include clear value proposition copy:
- Title: create memory games
- Subtitle: use own photos and share
5. Must include interactive 2x2 memory-board demo.
6. Demo cards must visually match gameplay card language (flip + reveal + match).
7. Must guide user with stepwise instruction text:
- Start tap prompt
- Second-card prompt
- Retry prompt if mismatch
8. Must animate card flips and successful match feedback.
9. Must show explicit success message (`¡Así funciona!`) after matching.
10. Must provide primary CTA (`Crear mi primer juego`).
11. Primary CTA and skip action must both complete onboarding and route into creator flow.
12. Must keep onboarding text short and interaction-first.
13. Must remain mobile-first and avoid dense instructional content.

## B) Onboarding State/Flow Requirements
1. Must block interactions during card resolution windows to prevent race conditions.
2. Must allow retry path if wrong second card is selected.
3. Must preserve smooth animation timing for tutorial quality.
4. Must not reappear once completion flag exists unless manually launched in demo mode.
5. Must coexist correctly with cookie consent flow:
- Cookie modal should not interrupt onboarding
- Cookie modal can appear after onboarding completion/skip if consent missing

## C) Public Game Landing Screen - Required Functionality
1. Must be usable as the first screen for shared game links.
2. Must show game identity content:
- Game title
- Photo count
- Creator name
3. Must provide photo preview thumbnails that communicate game content.
4. Must prioritize primary CTA (`Jugar`) visually and positionally.
5. Must provide secondary CTA (`Ver leaderboard`).
6. Must provide optional tertiary CTA (`Crear tu propio juego`).
7. Must support share action with native share sheet when available.
8. Must provide clipboard fallback share behavior when native share is unavailable.
9. Must show temporary feedback state after share-copy fallback.
10. Must support optional close action for in-app demo contexts.
11. Must optionally display social proof metrics (total plays, best time).

## D) Public Game Landing - UX Requirements
1. Screen should feel inviting and lightweight.
2. Preview should build curiosity while preserving action focus.
3. CTA stack must remain fully visible and tappable on small screens.
4. Metadata should remain scannable at a glance.

## E) Shared-Link Not Found Handling
1. If target game is missing/invalid, flow must route to `Juego no encontrado` state.
2. Recovery CTAs from not-found screen must remain available:
- Explore games
- Create game
