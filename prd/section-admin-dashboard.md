# PRD Section - Admin Dashboard (Superadmin)

## Screens in this section
1. Admin shell layout
2. Overview
3. Users
4. User action confirmation dialog
5. Games
6. Game action confirmation dialog
7. Media (grid view)
8. Media (table view)
9. Media preview dialog
10. Media deletion confirmation dialog
11. Activity log

## A) Admin Shell Layout - Required Functionality
1. Must gate entry behind authenticated session and admin mode toggle.
2. Must provide persistent sidebar navigation:
- Overview
- Users
- Games
- Media
- Activity
3. Must visually indicate current page.
4. Must provide top header action buttons:
- Sync
- Workspace
- Logout
5. Must support page-level scrolling without losing navigation context.
6. Must keep desktop-first layout while preserving responsiveness.

## B) Overview Screen - Required Functionality
1. Must display KPI cards for platform health:
- Total users
- Total games
- Published ratio
- Total images
- Recent events
2. KPI cards for users/games must support navigation drill-down.
3. Must show recent activity feed grouped by date.
4. Must show quick insights block (top creator, draft ratio, avg images/game).
5. Must include quick admin actions (test user, export data, view logs).
6. Must support clear distinction between metrics and actions.

## C) Users Screen - Required Functionality
1. Must support search by email and user tag.
2. Must support role filter tabs (`All`, `User`, `Superadmin`).
3. Must render tabular user data with:
- User identity
- Role
- Game count
- Created date
4. Must show role badges with clear semantic styling.
5. Must provide per-row action menu:
- Promote to superadmin
- Demote to user
- Delete user
6. Must show empty-state message when filter yields no users.

## D) User Confirmation Dialog - Required Functionality
1. Must open before promote/demote/delete actions.
2. Must display action-specific confirmation copy with target user.
3. Must provide cancel and confirm actions.
4. Must style destructive confirmation distinctly for delete.
5. Must provide success feedback after confirmed action.

## E) Games Screen - Required Functionality
1. Must support search by title and slug.
2. Must support owner filter.
3. Must support status filter (`All`, `Published`, `Draft`).
4. Must render tabular game data including:
- Title/slug
- Owner
- Status
- Players (24h)
- Total plays
- Scores
- Image count
- Updated date
5. Must format large numeric values in compact notation (`1.2k`).
6. Must provide per-game action menu:
- Open game
- Publish/Unpublish (contextual)
- Delete game
7. Must show no-results empty state for filtered results.

## F) Game Confirmation Dialog - Required Functionality
1. Must confirm publish/unpublish/delete actions before execution.
2. Must show action-specific copy including game title.
3. Must provide cancel and confirm actions.
4. Must visually emphasize destructive delete confirmation.
5. Must show success feedback after confirmation.

## G) Media Screen - Required Functionality
1. Must support two view modes:
- Grid view
- Table view
2. Must support search by filename or game slug.
3. Must support advanced filters:
- Game
- Uploader
- Date
4. Grid view requirements:
- Thumbnail cards
- Filename and game context
- Uploader badge
- Row action menu
5. Table view requirements:
- Thumbnail + filename cell
- Game/slug metadata
- Uploader
- Uploaded date
- Actions column
6. Must support image preview open from both views.
7. Must support navigation from media item to related game.
8. Must support delete-image action path from card/table/preview.
9. Must show no-results state when filtered list is empty.

## H) Media Preview Dialog - Required Functionality
1. Must display selected image preview panel.
2. Must show contextual metadata:
- Game
- Uploader
- Upload date
- Game slug
3. Must include quick actions:
- View game
- Delete image
4. Delete from preview must hand off to confirmation dialog.

## I) Media Deletion Confirmation - Required Functionality
1. Must require explicit confirmation before deleting asset.
2. Must include filename in warning copy.
3. Must provide cancel and delete actions.
4. Must mark delete action as destructive.

## J) Activity Log Screen - Required Functionality
1. Must support multi-dimensional filters:
- Free-text search
- Event type
- User
- Game
- Date from/to
2. Must provide clear-all-filters action.
3. Must group events by date heading.
4. Must render timeline-style event rows with:
- Event-type icon
- Event-type badge
- Timestamp
- User reference
- Optional game reference
5. User and game references must be clickable for drill-down.
6. Must show no-activity state when no events match filters.
7. Must include pagination controls (current + next/prev affordances).

## K) Cross-Admin Requirements
1. All mutating operations must be explicit and reversible where possible.
2. All destructive operations must require explicit confirmation.
3. All table/list screens must remain operable with large datasets.
4. Filter combinations must compose correctly (AND semantics).
5. Admin feedback must be immediate and unambiguous (toast/dialog state updates).
