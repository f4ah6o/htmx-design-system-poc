# htmx Design System PoC

Server-rendered design system playground that combines Flask, Tailwind CSS, Alpine.js, and htmx. The project demonstrates how to structure reusable HTML components (Atoms → Molecules → Organisms), expose them through an interactive catalog, and showcase practical htmx-powered workflows.

## Features
- **Component catalogs**: Dedicated pages for Atoms, Molecules, Organisms, and an aggregated `/catalog` explorer that streams live snippets into the detail panel via `hx-get`/`hx-swap`.
- **Practical use cases**: `/use-cases` illustrates backlog management, modal details, form validation, and error-handling flows driven by htmx.
- **Reusable partials**: Components live under `components/` and can be included across templates with a consistent API.
- **API demos**: Flask endpoints under `/api/*` respond with HTML fragments optimized for htmx swaps.

## Stack
- Python 3.11+
- Flask 3.0
- htmx 2.0.3 (CDN)
- Alpine.js 3.14 (CDN)
- Tailwind CSS (CDN)

## Getting Started
1. **Install dependencies** (recommended: virtual environment)
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   pip install -r requirements.txt
   ```
2. **Run the development server**
   ```bash
   flask --app app.py run --debug
   ```
3. Visit `http://127.0.0.1:5000` and browse the catalog/use-case pages.

### Helpful Commands
- `python3 -m py_compile app.py` – quick syntax check
- `FLASK_DEBUG=1 flask --app app.py run` – auto-reload on template/code changes

## Project Layout
```
htmx-design-system-poc/
├── app.py                     # Flask routes + demo APIs
├── components/                # Reusable Jinja partials (atoms/molecules/organisms)
├── templates/                 # Page templates + catalog/use-case partials
├── static/                    # (Optional) assets bucket
├── docs/                      # Guides (component usage, best practices, architecture)
├── requirements.txt
└── PLAN.md                    # Original exploration notes
```

Key pages:
- `/` – landing page with quick links
- `/atoms`, `/molecules`, `/organisms` – catalog by layer
- `/catalog` – single-screen explorer with code snippets
- `/use-cases` – realistic workflows (task CRUD, form validation, error responses)

## Documentation
Additional guides live under `docs/`:
- [`docs/component-guide.md`](docs/component-guide.md) – how to compose atoms/molecules/organisms
- [`docs/best-practices.md`](docs/best-practices.md) – recommended patterns for htmx + Flask
- [`docs/architecture.md`](docs/architecture.md) – route topology and data flow diagram

## Contributing
1. Create a feature branch per GitHub Issue.
2. Follow conventional commits (`feat:`, `fix:`, `docs:` ...).
3. Open a PR via `gh pr create` and link the issue (e.g., `Closes #8`).

## License
[MIT](LICENSE)
