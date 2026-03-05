#mobile_app

Task: Design the Account Settings area where logged-in users manage their account.

Context:
Users need a central place to manage profile details, language preferences, notifications, and security settings.

------------------------------------------------

SCREEN 1 — ACCOUNT SETTINGS HUB

Header:
Back button

Title:
"Cuenta"

------------------------------------------------

PROFILE SECTION

Row item:

Avatar placeholder
Username
Email address

Tap action:
"Editar perfil"

------------------------------------------------

PREFERENCES SECTION

Row:
"Idioma"
Shows current language (example: Español)

Row:
"Notificaciones"
Toggle switch

------------------------------------------------

SECURITY SECTION

Row:
"Cambiar contraseña"

Row:
"Cambiar email"

------------------------------------------------

DATA & PRIVACY SECTION

Row:
"Privacidad y datos"

Row:
"Eliminar cuenta"
Style: destructive

------------------------------------------------

FOOTER

Button:
"Cerrar sesión"

------------------------------------------------

SCREEN 2 — CHANGE PASSWORD

Header:
Back button

Title:
"Cambiar contraseña"

Form fields:

Current password

New password

Confirm new password

Helper text:
"Mínimo 8 caracteres"

Primary button:
"Actualizar contraseña"

Success state:
"Contraseña actualizada"

------------------------------------------------

CONSTRAINTS

- mobile-first
- use list rows consistent with the rest of the app
- group settings logically
- destructive actions require confirmation