#mobile_app

Task: Simplify the "Modo de juego" cards to make them more visual and easier to scan.

Context:
The current cards contain too much text. Since a mini grid preview will visually communicate the board size, we can remove most of the text and keep the cards minimal.

Important:
Do NOT redesign the screen. Only simplify the card structure.

Card structure changes:

Current structure:
Fácil
4 fotos
8 cartas
Grid 2×4
Añade 4 fotos más

New simplified structure:

Fácil
[mini grid preview]
Añade 4 fotos más

Remove the following lines:
- "4 fotos"
- "8 cartas"
- "Grid 2×4"

The mini grid preview now visually represents the board layout.

Mini grid previews:

Fácil → 2×4 grid  
Normal → 3×4 grid  
Difícil → 4×4 grid  
Experto → 4×5 grid  

Grid design:
- small rounded squares
- size: ~6–8px
- spacing: 3–4px
- neutral gray color
- centered inside the card

Card states:

Locked card:
Title
Mini grid
"Añade X fotos más"

Active card:
Title
Mini grid
"Modo activo"

Active visual style:
- subtle highlight
- slightly stronger border
- very light background tint

Constraints:
- keep current layout
- do not move sections
- only simplify card content
- maintain the current visual style