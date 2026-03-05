#mobile_app

Task: Design the Email Verification + Magic Link confirmation screen used after signup.

Context:
After a user creates an account, they must verify their email. The user receives a magic link by email. When they click the link, the app confirms verification and logs them in.

This screen must support two states:
1) Waiting for verification
2) Email verified successfully

Keep visual consistency with the existing app style:
- iOS style layout
- large title header
- soft card containers
- primary green CTA buttons

Elements:

Header
- Title: "Verificar email"

State 1: Waiting for verification

Main card:
Icon:
- large email icon or envelope illustration

Title:
"Revisa tu correo"

Description:
"Te hemos enviado un enlace para verificar tu cuenta."

Secondary text:
"Abre el enlace desde tu email para continuar."

Primary button:
"Reenviar email"

Secondary text button:
"Cambiar dirección de correo"

Footer helper text:
"No recibiste el email? Revisa tu carpeta de spam."

State 2: Email verified

Icon:
- success checkmark

Title:
"Email verificado"

Description:
"Tu cuenta ha sido verificada correctamente."

Primary button:
"Continuar"

Behavior:
- Screen automatically appears after signup
- If magic link is opened inside the app, switch to success state
- Re-send email rate limited
- Button disabled briefly after resend

Constraints:
- mobile-first layout
- center content vertically
- clear visual hierarchy
- accessible tap targets