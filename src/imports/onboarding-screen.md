#mobile_app

Task: Design the first-time onboarding tutorial shown when a user opens the app for the first time.

Context:
The goal of onboarding is to quickly teach the core concept of the app:
users create and share memory games with their own photos.

The onboarding should be fast and interactive rather than a long tutorial.

------------------------------------------------

SCREEN TYPE

Single interactive onboarding screen.

------------------------------------------------

HEADER

App logo

Optional skip button (top right):
"Omitir"

------------------------------------------------

MAIN CONTENT

Title:
"Crea tus propios juegos de memoria"

Subtitle:
"Usa tus fotos y compártelos con amigos."

------------------------------------------------

INTERACTIVE DEMO

Display a small demo memory board.

Grid layout:
2 × 2 cards

Cards should use the same visual design as the real gameplay cards.

Instruction text:
"Pulsa una carta para empezar."

Interaction flow:

Step 1
User taps a card → card flips and reveals a photo.

Step 2
User taps a second card → card flips and reveals the matching photo.

Step 3
Match animation.

Message appears:
"¡Así funciona!"

------------------------------------------------

CALL TO ACTION

Primary button:
"Crear mi primer juego"

Secondary text link:
"Omitir"

------------------------------------------------

BEHAVIOR

- Onboarding appears only the first time the app is opened.
- If the user taps "Omitir", store a flag so onboarding is not shown again.
- If the user completes onboarding or taps the CTA, navigate to the Create Game screen.

------------------------------------------------

CONSTRAINTS

- mobile-first layout
- minimal text
- playful interaction
- reuse the same card UI from the gameplay screen