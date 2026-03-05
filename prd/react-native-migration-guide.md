# Memory Match React Native Migration Guide

## 1. What Was Reviewed
This guide is based on the full `/prd` set:
- `screens-index.md` (69-screen inventory)
- `section-auth-and-account.md`
- `section-creator-and-game-library.md`
- `section-gameplay-and-results.md`
- `section-analytics-and-leaderboard.md`
- `section-support-and-help.md`
- `section-legal-and-privacy.md`
- `section-error-and-empty-states.md`
- `section-onboarding-and-public-game-entry.md`
- `section-account-settings-and-security.md`
- `section-admin-dashboard.md`

## 2. Migration Objectives
- Preserve functional parity with all required PRD behaviors.
- Replace web-only UI/runtime dependencies with React Native equivalents.
- Move from local boolean-based screen toggles to structured navigation.
- Keep feature rollout incremental so web can remain a reference during migration.

## 3. Current State Snapshot (Impact on Migration)
- App is a Vite React web prototype with Tailwind/Radix UI patterns.
- Main app flow is centralized in `src/app/App.tsx` using `useState` toggles for screen changes.
- No backend integration yet (mock/demo flows dominate).
- Heavy web-only dependency footprint (Radix primitives, MUI, Sonner, CSS utilities).

Implication: this is a UI/architecture migration plus feature-porting effort, not a direct code copy.

## 4. Recommended Target Stack
- Runtime: Expo (managed workflow) + TypeScript.
- Navigation: `@react-navigation/native` (stack + tabs + modal groups).
- State:
  - Server state: TanStack Query.
  - Local app state: Zustand or Redux Toolkit.
  - Forms: `react-hook-form` + Zod.
- UI:
  - Base components in RN primitives (`View`, `Text`, `Pressable`, `TextInput`, `ScrollView`, `FlatList`, `Modal`).
  - Design tokens in a shared theme module (colors, spacing, typography, radius).
- Device APIs:
  - Storage: `@react-native-async-storage/async-storage`.
  - Secure secrets: `expo-secure-store`.
  - Clipboard: `expo-clipboard`.
  - Share: RN `Share` API (+ clipboard fallback).
  - Media upload/pick: `expo-image-picker`.
- Feedback and motion:
  - Toasts: `react-native-toast-message` (or equivalent).
  - Animations/gestures: `react-native-reanimated` + `react-native-gesture-handler`.
- Testing:
  - Unit/component: Jest + React Native Testing Library.
  - E2E: Detox.

## 5. Web-to-RN Dependency Mapping
| Current Web Pattern | React Native Replacement |
|---|---|
| Radix UI primitives/dialogs/sheets/menus | Native modal/sheet patterns with custom components + gesture handler |
| Tailwind class styling | Theme token objects + StyleSheet/utility layer |
| `sonner` toast | RN toast library |
| `localStorage` for onboarding/cookies | AsyncStorage |
| Browser clipboard APIs | `expo-clipboard` |
| Web share fallback logic | RN `Share` + clipboard fallback |
| `window.scrollTo` state resets | Navigation lifecycle + scroll refs |
| Single-file state routing (`App.tsx`) | Navigation containers and typed route params |

## 6. Navigation Blueprint
Suggested route tree:
- `AuthStack`
  - SignIn, SignUp, EmailVerification, ForgotPassword, ResetPassword
- `OnboardingStack`
  - OnboardingTutorial
- `MainTabs`
  - CreateGame
  - MyGames
  - Settings/Account
- `CreatorStack` modals/screens
  - PreviewModal, Gameplay, Completion, GameDetails, Leaderboard
- `SupportStack`
  - SupportHub, HelpCenter, BugReport, ContactSupport
- `LegalStack`
  - Terms, PrivacyPolicy, DataPrivacy
- `ErrorStateRoutes`
  - NotFound, ServerError, GameNotFound, GamePrivate, NoGames, LeaderboardEmpty
- `PublicGameStack`
  - GameLanding, PublicLeaderboard
- `AdminStack` (if shipped in mobile)
  - Overview, Users, Games, Media, Activity

## 7. Phased Implementation Plan

### Phase 0: Foundation (Week 1-2)
- Bootstrap Expo app and TypeScript config.
- Set up navigation container, typed routes, theme tokens, shared UI primitives.
- Add lint/test tooling and CI for RN.
- Define mock data + API adapter interfaces (even before backend exists).

Exit criteria:
- App boots with route skeletons for all PRD sections.
- Theme and base components are stable.

### Phase 1: Auth + Onboarding + Legal + Error/Empty + Support (Week 3-5)
- Port all Auth/Recovery flows with validation and loading/error states.
- Port onboarding interactive demo with guarded progression and persistence flag.
- Port legal/privacy long-form screens and cookie consent behavior sequencing.
- Port shared EmptyState framework and all six error/empty variants.
- Port Support hub, help search, bug report, and contact forms.

Exit criteria:
- All requirements from:
  - `section-auth-and-account.md`
  - `section-onboarding-and-public-game-entry.md` (onboarding parts)
  - `section-legal-and-privacy.md`
  - `section-error-and-empty-states.md`
  - `section-support-and-help.md`
  are implemented and tested on iOS + Android simulators.

### Phase 2: Creator Flow + Game Library (Week 6-8)
- Port creator shell, stepper, photo limits, mode activation logic, and CTA guards.
- Port preview modal and create-progress/success flow.
- Port My Games list + action sheet behavior.
- Implement deep-link-safe game URL generation model for sharing.

Exit criteria:
- Full parity for `section-creator-and-game-library.md`.
- No invalid configuration can proceed to gameplay.

### Phase 3: Gameplay + Results (Week 9-10)
- Port board generation, shuffle, tap guards, match evaluation, timer/attempt tracking.
- Port completion modal variants (preview vs standard).
- Port save-score flow (validation, skip, success state, rank feedback placeholder).
- Ensure layout scaling for 8/12/16/20 card modes.

Exit criteria:
- Full parity for `section-gameplay-and-results.md`.
- Rapid-tap stability and no card-state race issues.

### Phase 4: Analytics + Leaderboard + Public Game Entry (Week 11-12)
- Port game details analytics, top-player summaries, recent games, share/copy actions.
- Port leaderboard tabs, top-3 emphasis, pagination/load-more behavior, empty state.
- Port public game landing screen and not-found path integration.

Exit criteria:
- Full parity for:
  - `section-analytics-and-leaderboard.md`
  - `section-onboarding-and-public-game-entry.md` (public landing parts)

### Phase 5: Account Settings + Security (Week 13)
- Port account hub, edit profile, change password/email, privacy/data, delete account confirmation.
- Enforce destructive action semantics and post-deletion safe routing.

Exit criteria:
- Full parity for `section-account-settings-and-security.md`.

### Phase 6: Admin Dashboard Decision (Week 14+)
Decision gate:
- Option A: Keep admin on web only for v1 mobile release.
- Option B: Build full mobile admin stack (overview/users/games/media/activity).

Recommendation:
- Default to Option A unless mobile admin is a hard launch requirement.
- If Option B is required, implement `section-admin-dashboard.md` as a separate milestone with dedicated tablet-first layouts.

## 8. Data Contracts to Define Early
Define shared TypeScript contracts before feature porting:
- `User`, `Session`, `AuthState`
- `Game`, `GamePhoto`, `GameMode`, `GameOptions`
- `GameplayState`, `ScoreSubmission`, `LeaderboardEntry`
- `SupportTicket`, `BugReport`
- `PrivacyExportRequest`, `DeleteAccountRequest`
- `AdminUser`, `AdminGame`, `AdminMediaAsset`, `AdminActivityEvent`

This prevents rework when moving from mocks to real backend APIs.

## 9. High-Risk Areas and Mitigation
- Gameplay interaction race conditions:
  - Mitigation: explicit state machine + deterministic tap guards + timer cleanup.
- Modal-heavy flows (preview/success/confirmations):
  - Mitigation: route-based modals, avoid ad-hoc boolean modal stacking.
- Long legal/support content on small screens:
  - Mitigation: standardized scroll container and typography tokens.
- Share/copy differences across platforms:
  - Mitigation: abstract into one `shareGameLink()` utility with tested fallbacks.
- Large admin data tables on mobile:
  - Mitigation: keep web-admin or redesign with card/list patterns for mobile.

## 10. Parity Checklist by PRD Domain
- Authentication & recovery: 8 screen states + resend throttling + deterministic transitions.
- Creator flow & game library: 8 core screens/states + strict photo/mode guards.
- Gameplay/results: board logic parity, score-save flow, preview/standard completion variants.
- Analytics/leaderboard: tab logic, top-3 treatment, empty handling, share/copy behavior.
- Support/help: searchable help center, form validation/loading/success flows.
- Legal/privacy: policy readability, cookie consent persistence/deferral, deletion confirmation.
- Error/empty system: single reusable framework with deterministic recovery actions.
- Onboarding/public entry: first-time gating, interactive tutorial quality, landing CTA hierarchy.
- Account settings/security: grouped settings, validations, destructive safeguards.
- Admin dashboard: explicit product decision for mobile scope.

## 11. Definition of Done for Migration
- Every required behavior in each `/prd/section-*.md` is implemented or explicitly deferred with sign-off.
- iOS and Android pass regression checks for all priority flows.
- Shared navigation, state, and UI architecture is modular (no new `App.tsx` monolith).
- Web prototype and RN app can be compared screen-by-screen during QA.
- Release checklist includes onboarding/cookie/legal/privacy edge cases and gameplay stress cases.
