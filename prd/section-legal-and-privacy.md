# PRD Section - Legal, Privacy & Compliance

## Screens in this section
1. Terms of Service
2. Privacy Policy
3. Cookie Consent modal
4. Data Privacy
5. Delete Account confirmation modal

## A) Terms of Service Screen - Required Functionality
1. Must include back navigation and clear page title.
2. Must provide long-form, scrollable legal content.
3. Must organize content into clearly labeled sections, including:
- Introducción
- Uso del servicio
- Responsabilidad del usuario
- Propiedad del contenido
- Limitación de responsabilidad
- Contacto
4. Must maintain readable typography, spacing, and section separation.
5. Must include last-updated footer metadata.
6. Must support internal/external legal contact links.

## B) Privacy Policy Screen - Required Functionality
1. Must include back navigation and clear page title.
2. Must provide structured, scrollable policy content.
3. Must include core privacy domains:
- Datos recopilados
- Uso de datos
- Cookies
- Servicios de terceros
- Compartir datos
- Derechos del usuario
- Seguridad
- Menores
- Contacto
4. Must include explicit rights language for access/export/deletion/correction.
5. Must include last-updated footer metadata.
6. Must preserve readability for long legal text on mobile screens.

## C) Cookie Consent Modal - Required Functionality
1. Must appear for first-time users when no prior consent exists.
2. Must overlay current screen with background dim/backdrop.
3. Must present:
- Title (`Usamos cookies`)
- Short explanation
- Primary action (`Aceptar todas`)
- Secondary action (`Solo necesarias`)
- Text link (`Más información`)
4. Must persist consent choice locally for future sessions.
5. Must close after consent selection.
6. `Más información` must route user to privacy policy context.
7. Must be mobile-safe and non-blocking after selection.
8. If onboarding is active, cookie modal must be deferred until onboarding completes or is skipped.

## D) Data Privacy Screen - Required Functionality
1. Must include back navigation and title `Privacidad y datos`.
2. Must provide export-data section with clear description.
3. Must provide export action (`Solicitar exportación`).
4. Must show loading/progress state while processing export request.
5. Must confirm export request submission.
6. Must provide account deletion section with warning emphasis.
7. Must communicate irreversible deletion consequences.
8. Must provide explicit destructive action entrypoint (`Eliminar cuenta`).
9. Must include contextual link to Privacy Policy.

## E) Delete Account Confirmation Modal - Required Functionality
1. Must require explicit confirmation before deletion.
2. Must present high-clarity warning copy.
3. Must offer two choices:
- Confirm deletion
- Cancel
4. Must block accidental dismissal by clear affordances.
5. Must show completion feedback after confirmed deletion.
6. Must return user to safe post-deletion state (logout/back flow).

## F) Compliance & UX Requirements
1. Legal/privacy content must remain accessible from support/settings flows.
2. Legal screens must keep consistent typography with app design language.
3. Consent/deletion/export actions must provide audit-friendly, explicit outcomes.
4. Destructive actions must always be separated visually from neutral actions.
5. All legal flows must be mobile-first and keyboard/touch accessible.
6. Legal policy screens must be reachable from both support flows and the account-level privacy screen.
