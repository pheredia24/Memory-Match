# PRD Section - Error & Empty-State System

## Screens in this section
1. 404 Page Not Found
2. 500 Server Error
3. Game Not Found
4. Game Private
5. No Games Yet
6. Leaderboard Empty

## A) Shared EmptyState Framework - Required Functionality
1. All error/empty screens must reuse one structural component pattern.
2. Shared layout must include:
- Optional header with back button/title
- Top illustration or icon
- Short title
- One-line explanatory description
- Primary CTA
- Optional secondary CTA
- Optional helper text
3. Must keep content vertically centered for strong state clarity.
4. Must preserve consistent typography, spacing, and button hierarchy.
5. Must support mobile-first layout and clear tap targets.
6. Must permit icon or custom illustration variants without breaking layout.

## B) 404 - Page Not Found - Required Functionality
1. Must show message: page not found/moved context.
2. Must provide primary CTA: return to home/creator.
3. Must provide secondary CTA: view game library.
4. Must recover to valid app state on both actions.

## C) 500 - Server Error - Required Functionality
1. Must communicate failure to load content.
2. Must provide retry action as primary CTA.
3. Must provide fallback home action as secondary CTA.
4. Must allow safe recovery even if retry fails repeatedly.

## D) Game Not Found - Required Functionality
1. Must communicate game does not exist/was removed.
2. Must support optional back button in header.
3. Must provide primary CTA: explore games.
4. Must provide secondary CTA: create a game.

## E) Game Private - Required Functionality
1. Must communicate restricted access clearly.
2. Must support optional back button.
3. Must provide primary CTA: go home.
4. Must provide secondary CTA: create own game.

## F) No Games Yet - Required Functionality
1. Must communicate empty personal library state.
2. Must include primary CTA: create first game.
3. Must include secondary CTA: explore examples.
4. Must support branded header title where back nav is not applicable.

## G) Leaderboard Empty - Required Functionality
1. Must communicate no scores available.
2. Must include helper motivational text.
3. Must support optional back button.
4. Must provide primary CTA: play now.
5. Must provide secondary CTA: share game.

## H) Navigation & Recovery Requirements
1. Every state must provide at least one deterministic recovery action.
2. No state may trap the user without a route back to normal flow.
3. CTA labels must be action-oriented and context-specific.
4. Error-state transitions must clear transient error toggles to avoid state loops.
