#mobile_app

Task: Create the Reset Password screen accessed from the password reset email link.

Context:
User opens a secure link and must set a new password.

Layout consistent with auth screens.

Top section
App logo + "MemoryGame"

Title
"Create a new password"

Subtitle
"Choose a new password for your account."

Form section

Field 1
Label: "New password"

Field 2
Label: "Confirm password"

Helper text
"Minimum 8 characters"

Primary button
"Update password"

Success state

Icon
Success checkmark

Title
"Password updated"

Description
"You can now sign in with your new password."

Primary button
"Sign In"

Behavior
- Validate password strength
- Confirm passwords match
- Secure token validation

Constraints
- Use same auth UI components
- Maintain visual consistency with Sign In / Sign Up screens
- Mobile-first layout