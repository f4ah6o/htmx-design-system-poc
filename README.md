# htmx Design System PoC

Server-rendered design system playground that combines Hono, Cloudflare Workers, Tailwind CSS, Alpine.js, and htmx. The project demonstrates how to structure reusable HTML components (Atoms → Molecules → Organisms), expose them through an interactive catalog, and showcase practical htmx-powered workflows.

## Features
- **Component catalogs**: Dedicated pages for Atoms, Molecules, Organisms, and an aggregated `/catalog` explorer that streams live snippets into the detail panel via `hx-get`/`hx-swap`.
- **Practical use cases**: `/use-cases` illustrates backlog management, modal details, form validation, and error-handling flows driven by htmx.
- **Edge-first architecture**: Powered by Hono and Cloudflare Workers for fast, globally distributed responses.
- **API demos**: Hono endpoints under `/api/*` respond with HTML fragments optimized for htmx swaps.

## Stack
- **Hono** 4.6+ - Fast, lightweight web framework for the Edge
- **Cloudflare Workers** - Serverless edge computing platform
- **TypeScript** 5.7+ - Type-safe development
- **htmx** 2.0.3 (CDN) - High-power tools for HTML
- **Alpine.js** 3.14 (CDN) - Minimal JavaScript framework
- **Tailwind CSS** (CDN) - Utility-first CSS framework

## Getting Started
1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Run the development server**
   ```bash
   npm run dev
   ```

3. Visit `http://localhost:8787` and browse the catalog/use-case pages.

### Helpful Commands
- `npm run dev` – start local development server with hot reload
- `npm run deploy` – deploy to Cloudflare Workers
- `wrangler dev` – alternative way to start dev server

## Project Layout
```
htmx-design-system-poc/
├── src/
│   ├── index.tsx              # Hono app with routes + API endpoints
│   ├── templates.tsx          # JSX components for page layouts
│   └── data.ts                # Data models and constants
├── components/                # Legacy HTML component files (reference)
├── templates/                 # Legacy Jinja templates (reference)
├── docs/                      # Guides (component usage, best practices, architecture)
├── package.json
├── tsconfig.json
├── wrangler.toml              # Cloudflare Workers configuration
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
