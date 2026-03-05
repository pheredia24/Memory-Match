
# Memory Match

Front-end prototype for creating and playing custom memory games, including a creator flow, gameplay preview, and a mock admin dashboard.

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS 4
- Radix UI / shadcn-style UI components

## Features

- Auth screen with sign-in/sign-up UI (simulated flow).
- 2-step game creation flow (basic info + game settings).
- Automatic difficulty mode based on uploaded photo count:
  - Easy: 4 photos / 8 cards
  - Normal: 6 photos / 12 cards
  - Hard: 8 photos / 16 cards
  - Expert: 10 photos / 20 cards
- Gameplay preview with timer, attempts, restart, and match progress.
- "Mis juegos" list with mocked game entries.
- Admin dashboard sections: overview, users, games, media, and activity.

## Getting Started

### Prerequisites

- Node.js 18+ (recommended: latest LTS)
- npm

### Install

```bash
npm install
```

### Run locally

```bash
npm run dev
```

Vite will print the local URL in the terminal (typically `http://localhost:5173`).

### Production build

```bash
npm run build
```

## Demo Usage

1. Open the app and sign in with any valid email format and any password.
2. In the creator flow, add/remove photos to change the active game mode.
3. Go to step 2 to enable/disable HUD elements and preview gameplay.
4. Open the top-right settings menu and choose `Admin Dashboard` to explore admin pages.

## Project Structure

- `src/app/App.tsx`: Main app shell, auth gate, user/admin routing logic.
- `src/app/components/AuthPage.tsx`: Authentication UI.
- `src/app/components/GameplayScreen.tsx`: Memory board gameplay.
- `src/app/components/admin/*`: Admin dashboard pages.
- `src/styles/*`: Global theme and styling.

## Current Limitations

- Uses mocked data (games/users/activity).
- No backend/API integration.
- Authentication is simulated for UX/demo purposes.

## Attributions

See [ATTRIBUTIONS.md](./ATTRIBUTIONS.md).
  
