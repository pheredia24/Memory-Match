#mobile_app

Task: Create the Forgot Password screen based on the existing authentication UI layout.

Context:
Users who forgot their password can request a password reset email.

Reuse the same structure used in the Sign In screen.

Layout:

Top section
App logo + "MemoryGame"

Title
"Reset your password"

Subtitle
"Enter your email address and we'll send you a reset link."

Form section

Input field
Label: "Email address"
Placeholder: "you@example.com"

Primary button
"Send reset link"

Secondary link
"Back to Sign In"

Divider
Reuse the existing "Or continue with" divider style.

State after submission:

Icon
Email with checkmark

Title
"Check your email"

Description
"We've sent a password reset link to your email."

Secondary button
"Resend email"

Behavior
- Validate email format
- Show success state after submission
- Prevent rapid resend attempts

Constraints
- Maintain same spacing and typography as auth screens
- Use same input and button components
- Mobile-first