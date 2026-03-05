# PRD Section - Account Settings, Profile & Security

## Screens in this section
1. Account settings hub
2. Edit profile
3. Change password
4. Change email
5. Privacy and data (account variant)
6. Delete account confirmation dialog (from account hub)

## A) Account Settings Hub - Required Functionality
1. Must provide back navigation and `Cuenta` title.
2. Must include profile summary row with:
- Avatar
- Name
- Email
- Entry point to `Editar perfil`
3. Must include preferences group:
- Language row with current value
- Notifications toggle row
4. Must include security group:
- Change password row
- Change email row
5. Must include data/privacy group:
- Privacy and data row
- Delete account row (destructive style)
6. Must include logout action (`Cerrar sesión`).
7. Must group settings logically and use list-row UI consistency.
8. Destructive actions must be visually differentiated.
9. Must include delete confirmation before account deletion.

## B) Edit Profile Screen - Required Functionality
1. Must allow editing display name.
2. Must show current email as read-only.
3. Must provide avatar change affordance (or placeholder flow).
4. Must validate non-empty name before submit.
5. Must show loading state while saving.
6. Must show success feedback and return to settings after completion.
7. Must preserve accessible form labeling and mobile spacing.

## C) Change Password Screen - Required Functionality
1. Must include fields:
- Current password
- New password
- Confirm new password
2. Must support show/hide toggles for all password fields.
3. Must enforce minimum password length of 8 characters.
4. Must require new password and confirm password to match.
5. Must prevent reusing current password as new password.
6. Must show inline/adjacent validation indicators.
7. Must provide requirements helper content.
8. Must show loading state while updating.
9. Must show success confirmation and return flow.

## D) Change Email Screen - Required Functionality
1. Must show current email as read-only reference.
2. Must capture new email with format validation.
3. Must require current password confirmation.
4. Must prevent submitting if new email equals current email.
5. Must show validation feedback for invalid email format.
6. Must show loading state while updating.
7. Must show success feedback indicating email confirmation step.
8. Must support return to settings after completion.

## E) Privacy and Data (Account Variant) - Required Functionality
1. Must provide account-level privacy overview and controls.
2. Must include data export/download request action.
3. Must include navigations to:
- Privacy policy
- Terms of service
4. Must explain what user data is collected in readable summary form.
5. Must include support/contact entrypoint for privacy questions.
6. Must provide feedback after export request initiation.

## F) Delete Account Confirmation (Account Hub) - Required Functionality
1. Must require explicit confirmation step before deletion.
2. Must present irreversible consequence warning.
3. Must provide clear cancel and confirm actions.
4. Must enforce destructive visual treatment for confirm action.
5. Must route user to safe post-deletion state (logout/exit) after success.

## G) Integration Requirements
1. Account settings must be accessible from global settings menu.
2. Sub-screens must return to account hub cleanly.
3. Account privacy flow must interoperate with global legal screens.
4. Logout action from account hub must terminate authenticated session.
