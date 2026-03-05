# Memory Match - Complete Screen Inventory

This inventory is derived from:
- `src/app/App.tsx` (all top-level screen routing and modal toggles)
- `src/app/components/**/*.tsx` (all concrete screen components)
- `src/imports/*.md` (design requirements that define expected functionality)

## 1) Authentication & Account Entry Screens
1. Sign In (`AuthPage`, mode `signin`)
2. Sign Up (`AuthPage`, mode `signup`)
3. Email Verification - Waiting for verification (`EmailVerificationScreen`, state `!isVerified`)
4. Email Verification - Success (`EmailVerificationScreen`, state `isVerified`)
5. Forgot Password - Request reset link (`ForgotPasswordScreen`, state `!emailSent`)
6. Forgot Password - Check email state (`ForgotPasswordScreen`, state `emailSent`)
7. Reset Password - New password form (`ResetPasswordScreen`, state `!passwordUpdated`)
8. Reset Password - Success (`ResetPasswordScreen`, state `passwordUpdated`)

## 2) Creator Flow & Game Library Screens
9. Creator shell with top nav + segmented control (`App.tsx`, user mode)
10. Create Game - Step 1 (title, language, photos, auto game mode)
11. Create Game - Step 2 (game preview + gameplay options)
12. Full-screen game preview modal (`showPreviewModal`)
13. Game creation in-progress state (`isCreating` + staged labels)
14. Game created success modal (`showSuccessModal`)
15. My Games list (`activeTab = 'mis-juegos'`)
16. Game card action sheet (open/edit/duplicate/unpublish/details/delete)

## 3) Gameplay & Completion Screens
17. Gameplay board (`GameplayScreen`)
18. Completion modal - Preview mode variant (`isPreviewMode = true`)
19. Completion modal - Player mode variant (`isPreviewMode = false`)
20. Save score sub-state (name input + save/skip)
21. Score saved confirmation sub-state (rank feedback)

## 4) Analytics & Leaderboard Screens
22. Game Details / Analytics (`GameDetailsScreen`)
23. Leaderboard - Main list (`LeaderboardScreen`)
24. Leaderboard tab state: Today
25. Leaderboard tab state: All Time
26. Leaderboard tab state: Friends
27. Leaderboard empty state (within `LeaderboardScreen` when entries are empty)

## 5) Support & Help Screens
28. Support hub (`SupportScreen`)
29. Help Center - Browse by category (`HelpArticles`, no query)
30. Help Center - Search results (`HelpArticles`, with query)
31. Help Center - No results state
32. Bug report form (`BugReportForm`)
33. Contact support form (`ContactSupportForm`)

## 6) Legal & Privacy Screens (General App)
34. Terms of Service (`TermsOfService`)
35. Privacy Policy (`PrivacyPolicy`)
36. Data Privacy (legacy legal/data management view, `DataPrivacy`)
37. DataPrivacy delete account confirmation modal (`DataPrivacy`, `showDeleteConfirm`)
38. Cookie consent modal (`CookieConsent`)

## 7) Error & Empty-State Screens
39. 404 Page Not Found (`NotFoundScreen`)
40. 500 Server Error (`ServerErrorScreen`)
41. Game Not Found (`GameNotFoundScreen`)
42. Game Private (`GamePrivateScreen`)
43. No Games Yet (`NoGamesYetScreen`)
44. Leaderboard Empty (`LeaderboardEmptyScreen`)

## 8) Admin Dashboard Screens
45. Admin shell with sidebar + top actions (`AdminLayout`)
46. Admin Overview (`OverviewPage`)
47. Admin Users (`UsersPage`)
48. Users action confirmation dialog (promote/demote/delete)
49. Admin Games (`GamesPage`)
50. Games action confirmation dialog (publish/unpublish/delete)
51. Admin Media - Grid view (`MediaPage`, `viewMode='grid'`)
52. Admin Media - Table view (`MediaPage`, `viewMode='table'`)
53. Media preview dialog
54. Media delete confirmation dialog
55. Admin Activity Log (`ActivityPage`)

## 9) Onboarding & Public Game Entry Screens
56. First-time onboarding tutorial (`OnboardingScreen`)
57. Onboarding interactive demo - instruction states (start, second tap, retry)
58. Onboarding interactive demo - success/match state (`¡Así funciona!`)
59. Public game landing screen (`GameLandingScreen`)
60. Public game landing share feedback state (copied/check state)
61. Shared-link not-found path (routes to existing `GameNotFoundScreen`)

## 10) Account Settings & Security Screens
62. Account settings hub (`AccountSettings`)
63. Edit profile (`EditProfileScreen`)
64. Change password (`ChangePasswordScreen`)
65. Change email (`ChangeEmailScreen`)
66. Privacy and data (account settings variant, `PrivacyDataScreen`)
67. Account settings delete-account confirmation dialog (`AccountSettings`, `showDeleteDialog`)

## 11) Reusable State System Used Across Screens
68. Unified EmptyState template (`EmptyState`) used by all error/empty states
69. Global toast feedback system (`sonner`) for action confirmations, errors, and info
