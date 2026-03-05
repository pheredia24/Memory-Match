# Napkin

## Corrections
| Date | Source | What Went Wrong | What To Do Instead |
|------|--------|----------------|-------------------|
| 2026-03-05 | self | Ran `rg --files` at repo root and flooded output with `node_modules` paths | Scope file discovery to app folders (e.g., `src/`) or exclude deps with `-g '!node_modules/**'` |
| 2026-03-05 | user | Committed `node_modules` to git history during a bulk "commit all changes" request | Always pause and enforce a `.gitignore` baseline (at minimum `node_modules/`) before bulk commits, even when asked to commit everything |

## User Preferences
- When asked to run an app on a specific localhost port, bind explicitly with the framework CLI flags (e.g., `--port 3030`).
- When requesting product docs, user expects exhaustive, sectioned markdown deliverables in `/prd` with no missing functionality.

## Patterns That Work
- For Vite projects, `npm run dev -- --host localhost --port <port>` reliably binds the requested local URL.
- Verifying server readiness with `curl -I http://localhost:<port>` is a fast smoke check.
- In this repo, `git pull --ff-only` worked while `node_modules/` and local `package-lock.json` were untracked.
- In this repo, `git pull --ff-only` also succeeded with a locally modified `README.md` plus untracked files, as long as the pulled changes did not touch those local paths.
- In this Codex environment, launching Vite with a TTY session is more reliable than a detached `nohup` launch for keeping the dev server alive.
- For README updates in this repo, inspecting `src/app/App.tsx` and `src/app/components/AuthPage.tsx` gives the most accurate feature/flow documentation.
- For full screen inventories in this repo, combine `App.tsx` conditional renders with all `src/app/components/*.tsx` screens and `src/imports/*.md` design briefs.
- `src/imports/*.md` contains functional requirements that are stricter/more complete than current UI wiring; include both implemented behavior and intended design behavior in PRD output.
- For React Native migration planning in this repo, start from `prd/screens-index.md` for full scope and then map each `prd/section-*.md` domain to implementation phases.

## Patterns That Don't Work
- Assuming a detached `nohup npm run dev ...` launch is ready after a fixed 2s delay; it may exit silently here, so verify process/logs and retry with TTY if needed.

## Domain Notes
- `Mobilefirstdesignupdate` is a Vite React project with `npm run dev` script and default `vite` config.
- `origin/main` advanced from `023cd31` to `cdceae3` and introduced major new admin/auth component files.
- `origin/main` later advanced from `a61eb71` to `5e81234`, adding support/legal screens and reusable error-state components.
- `origin/main` advanced from `5e81234` to `5f0de22`, adding onboarding, game landing, and account settings/security/privacy screen set (`AccountSettings`, `EditProfile`, `ChangePassword`, `ChangeEmail`, `PrivacyData`).
- The current app is a front-end prototype with simulated auth and mock game/admin data (no backend integration yet).
- `src/app/App.tsx` currently centralizes navigation via boolean/state toggles instead of route-based navigation; React Native migration should prioritize introducing a navigator early.
- `npm run build` succeeds, but Vite reports a large JS chunk (`dist/assets/index-*.js` > 500 kB); code-splitting is a likely next optimization.
