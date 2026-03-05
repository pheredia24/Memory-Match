# PRD Section - Support, Help Center & User Contact

## Screens in this section
1. Support hub
2. Help Center (browse mode)
3. Help Center (search mode + no results)
4. Bug report form
5. Contact support form

## A) Support Hub - Required Functionality
1. Must provide back navigation to prior screen.
2. Must present three primary support cards:
- Centro de ayuda
- Reportar un problema
- Contactar soporte
3. Each card must include:
- Clear title
- Brief explanatory description
- Primary action button
4. Contact card must communicate expected response time (24-48h).
5. Must include expandable FAQ/common-questions list with accordion behavior.
6. FAQ items must toggle open/closed and keep readable answers.
7. Must include footer links to:
- Política de privacidad
- Términos de servicio
8. Must preserve mobile-first card spacing and trust-oriented layout.

## B) Help Center - Browse Mode - Required Functionality
1. Must include search bar with immediate filtering.
2. Must show categorized article groups when search is empty.
3. Must show article cards with:
- Icon
- Title
- Summary
- Category context
4. Must support article click callback for article detail handling.
5. Must keep fast scanning and clear tap targets.

## C) Help Center - Search Mode - Required Functionality
1. Must filter by title, summary, and category text.
2. Must display result count for active query.
3. Must show filtered article list with same interaction behavior.
4. Must show explicit empty state when no articles match.
5. Must allow quick query edits and live result updates.

## D) Bug Report Form - Required Functionality
1. Must include required fields:
- Problem title
- Category
- Description
2. Must include optional reproduction steps field.
3. Must validate required fields before submission.
4. Must show form-level feedback when required fields are missing.
5. Must include submission loading state.
6. Must show success confirmation after successful submit.
7. Must include cancel/back action.
8. Must capture contextual device info for diagnostics.
9. Must provide category taxonomy relevant to app domains.
10. Must include character count visibility for long text fields.

## E) Contact Support Form - Required Functionality
1. Must include required fields:
- Contact email
- Contact reason/category
- Subject
- Message
2. Must validate email format before submission.
3. Must validate all required fields before submission.
4. Must show submission loading state.
5. Must show success confirmation with response-time expectation.
6. Must include cancel/back action.
7. Must include privacy notice and policy link near submit area.
8. Must expose category options for routing support requests.

## F) Cross-Flow Requirements
1. Support flows must be reachable from primary app settings.
2. Returning from sub-screens must restore support context cleanly.
3. All forms must protect against duplicate submissions while loading.
4. Success/error feedback must use consistent toast or inline patterns.
5. Navigation to legal screens from support must be direct and reversible.
