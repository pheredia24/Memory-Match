#mobile_app

Task: Update the "Crear juego" screen to support predefined memory game board sizes instead of allowing arbitrary numbers of photos.

Context: The memory game now uses fixed board layouts to guarantee clean grids and consistent gameplay. Each uploaded image appears exactly twice to form a pair, so the number of photos determines the board size. The UI must guide users to select a game mode before uploading photos.

Changes required:

Add a "Modo de juego" selector above the photo uploader.

Game modes:
  - Fácil
      - 4 fotos
      - 8 cartas
      - Grid 2×4
  - Normal
      - 6 fotos
      - 12 cartas
      - Grid 3×4
  - Difícil
      - 8 fotos
      - 16 cartas
      - Grid 4×4
  - Experto
      - 10 fotos
      - 20 cartas
      - Grid 4×5

UI behavior:
  - The user selects a mode before uploading photos.
  - The photo uploader adapts to the selected mode.
  - The uploader shows progress toward the required number of photos.
  - Example: "3 / 6 fotos".
  - Once the required number of photos is reached, the add button becomes disabled.

Photo grid:
  - Keep the existing photo preview grid.
  - Maintain square previews with rounded corners.
  - Preserve the delete button on each photo.

Uploader text:
  - Replace "Mínimo 2 fotos · Máximo 10" with:
    "Añade las fotos necesarias para completar el modo seleccionado."

Layout:
  - Keep the current layout and visual style.
  - Insert the mode selector as a segmented control or card group above the photo uploader.
  - Each mode should clearly display the number of photos and grid size.

Constraints:
  - Mobile-first iPhone layout
  - Maintain consistent spacing and typography
  - Do not redesign the entire screen, only integrate the mode selection and enforce the photo count logic.