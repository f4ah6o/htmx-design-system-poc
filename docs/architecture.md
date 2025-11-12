# Architecture Overview

## High-Level Flow
```mermaid
flowchart LR
    Browser((Browser)) -->|htmx requests| Flask[Flask Routes]
    Flask --> Templates[Jinja Templates]
    Templates --> Components[Atoms / Molecules / Organisms]
    Flask --> APIs[/API Endpoints (/api/*)/]
    APIs --> Templates
    Browser -->|Alpine events| Components
```

- **Browser**: renders server-sent HTML, triggers htmx attributes for partial updates, and dispatches Alpine events (`open-modal`).
- **Flask Routes**: `/`, `/atoms`, `/molecules`, `/organisms`, `/catalog`, `/use-cases` deliver full pages.
- **API Endpoints**: `/api/catalog/<slug>`, `/api/use-cases/*`, `/api/demo/*`, etc., return HTML fragments that slot back into the DOM.
- **Templates & Components**: Jinja renders `components/` partials, keeping the design system consistent.

## Key Modules
| Module | Responsibility |
|--------|----------------|
| `app.py` | Routing layer, htmx-friendly endpoints, metadata registries (`CATALOG_COMPONENTS`, `USE_CASE_TASKS`). |
| `components/` | Atomic HTML snippets parameterized via Jinja. |
| `templates/catalog/components/` | Showcase snippets loaded dynamically by `/catalog`. |
| `templates/use_cases/partials/` | Server-rendered fragments for backlog, modals, feedback, and error states. |

## Request Examples
1. **Catalog Detail**
   - User clicks a component → button issues `hx-get="/api/catalog/atoms-button"`.
   - Flask renders `templates/catalog/components/atoms-button.html`.
   - htmx swaps the detail panel with the returned HTML; indicator hides automatically.

2. **Use-Case Task Add/Delete**
   - Form posts to `/api/use-cases/tasks` → server mutates `USE_CASE_TASKS` and rerenders `task_panel.html`.
   - Delete button issues `hx-delete` to the same endpoint and replaces the panel with the updated snippet.

3. **Modal Detail**
   - `hx-get="/api/use-cases/tasks/<id>/detail"` targets `#use-case-modal-body` inside an open modal.
   - Alpine keeps the modal visible while only the body content changes.

## Deployment Considerations
- Serve via Gunicorn/uwsgi behind Nginx for production.
- Cache static assets (`static/`) and consider extracting CDN scripts if operating offline.
- External services are unnecessary; all data is in-memory for PoC purposes, but replacing collections with a database only requires adapting helper functions such as `find_task`.
