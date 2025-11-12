# Best Practices

## 1. Template Composition
- Prefer small partials (`components/atoms/*`) and pass data via `with context` to keep templates declarative.
- Use `body_content` or `caller()` slots for larger organisms (e.g., modals) to avoid deeply nested conditionals.
- Keep Tailwind class decisions close to the component so consumers only flip semantic props such as `variant` or `status`.

## 2. htmx Patterns
- **Explicit targets**: every `hx-get`/`hx-post` must declare `hx-target`/`hx-swap` to avoid unexpected DOM replacements.
- **Indicators**: pair requests with `hx-indicator="#loading-id"` and reuse `components/organisms/loading-indicator.html` for consistent UX.
- **Confirm + delete**: set `hx-confirm` on destructive actions and aim responses at the same region (`hx-target="#task-panel"`).
- **Error codes matter**: return 4xx for validation errors, 5xx for server issues—htmx exposes status codes for `hx-on:error` hooks if needed.

## 3. Flask Responses
- Return HTML fragments, not JSON, unless the client explicitly expects data transformation.
- Keep response templates under `templates/use_cases/partials/` (or similar) for easy server-side testing.
- Use helper functions (e.g., `render_task_panel`) to centralize repeated markup + flash messaging logic.

## 4. Accessibility & UX
- Labels must reference inputs via `for`/`id` attributes; the `form-group` molecule already wires this up.
- When feeding modals, dispatch `open-modal`/`close-modal` events via Alpine so focus trapping stays intact.
- Provide textual alternatives for indicators (`text` prop) and always describe success/error states with color + text.

## 5. State Management
- Treat server-side lists (`USE_CASE_TASKS`) as the source of truth; do not mutate them from the client without a round-trip.
- For optimistic UI, return the updated snippet immediately so the user sees confirmation without a full reload.

## 6. Deployment Notes
- Behind a production web server, set `FLASK_ENV=production` and ensure `SECRET_KEY` is configured.
- Consider extracting component metadata (for `/catalog`) into JSON/Markdown if non-developers need to contribute.

Following these practices keeps the htmx + Flask flow predictable while maintaining a design-system mindset.
