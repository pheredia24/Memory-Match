# PRD Section - Authentication & Account Recovery

## Screens in this section
1. Sign In
2. Sign Up
3. Email Verification (Waiting)
4. Email Verification (Verified)
5. Forgot Password (Request)
6. Forgot Password (Email Sent)
7. Reset Password (Form)
8. Reset Password (Success)

## A) Sign In Screen - Required Functionality
1. Must provide email input with format validation (`name@domain.tld`).
2. Must provide password input with show/hide toggle.
3. Must prevent submission when required fields are empty.
4. Must show inline validation errors near each field.
5. Must show loading state while authentication request is in progress.
6. Must allow simulated third-party sign-in (`Continue with Google`).
7. Must expose clear path to password recovery (`Forgot password?`).
8. Must include terms/privacy acknowledgment links in the footer.
9. Must preserve accessibility for keyboard and touch interactions.
10. Must keep mobile-first layout while supporting desktop split panel.

## B) Sign Up Screen - Required Functionality
1. Must reuse same form structure as Sign In for visual consistency.
2. Must validate email format before submission.
3. Must enforce password minimum length of 8 characters.
4. Must show sign-up-specific helper copy/value bullets.
5. Must show loading state (`Creating account...`).
6. Must route successful sign-up to Email Verification screen.
7. Must keep mode toggle (`Sign In` / `Sign Up`) stateful and immediate.

## C) Email Verification (Waiting State) - Required Functionality
1. Must be shown automatically after successful sign-up.
2. Must display destination email address for user confirmation.
3. Must communicate verification instructions clearly:
- Check email inbox
- Open magic link
- Continue in app
4. Must provide resend action (`Reenviar email`).
5. Must rate-limit resend action with temporary disabled state and countdown.
6. Must provide fallback action to change email address.
7. Must show helper guidance for spam folder checks.
8. Must support detection of verification completion from magic-link flow.

## D) Email Verification (Success State) - Required Functionality
1. Must show successful verification confirmation UI.
2. Must provide primary CTA (`Continuar`) to enter authenticated app state.
3. Must ensure transition from waiting state to success state can be triggered by auth verification event.
4. Must preserve same visual hierarchy and spacing as waiting state.

## E) Forgot Password (Request State) - Required Functionality
1. Must be reachable from Sign In screen.
2. Must require valid email before sending reset request.
3. Must show inline validation error for empty/invalid email.
4. Must show loading state while sending reset link.
5. Must preserve brand/auth layout consistency.
6. Must provide direct path back to Sign In.

## F) Forgot Password (Email Sent State) - Required Functionality
1. Must confirm that reset email was sent.
2. Must display target email address.
3. Must provide resend action with cooldown protection.
4. Must display resend countdown while disabled.
5. Must provide back-to-sign-in action.

## G) Reset Password (Form State) - Required Functionality
1. Must accept password reset token context (URL or auth state in real implementation).
2. Must provide `New password` and `Confirm password` fields.
3. Must support show/hide toggle on both password fields.
4. Must enforce minimum password length (8+ characters).
5. Must verify `Confirm password` matches `New password`.
6. Must display clear inline validation messages.
7. Must show loading state while applying password update.
8. Must expose helper text (`Minimum 8 characters`).
9. Must provide password strength feedback (weak/good/strong).
10. Must keep security-first behavior for token validation and expiration handling.

## H) Reset Password (Success State) - Required Functionality
1. Must show clear success confirmation after update.
2. Must provide primary CTA (`Sign In`) to return to auth entry point.
3. Must ensure form state is cleared to avoid stale sensitive data.

## Cross-Screen Functional Requirements (Auth Domain)
1. State transitions must be deterministic and recoverable (no dead-end screens).
2. All async actions must expose visible progress and error feedback.
3. All action buttons must have mobile-safe tap sizes.
4. Error text must be human-readable and actionable.
5. Auth screens must remain usable on small phones and desktop breakpoints.
6. Terms and privacy links must stay reachable from auth context.
7. Email-based actions (verification and reset) must include resend throttling.
8. First successful authentication for a new/local user must trigger first-time onboarding before normal creator navigation.
