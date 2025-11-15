# htmx Design System PoC

Flask-based playground that demonstrates how to compose Atoms → Molecules → Organisms, power them with htmx, and document real-world workflows (dynamic lists, form validation, modal details, error handling).

## Stack
- Node.js 18+
- Hono (Edge-friendly web server) + Nunjucks templating
- Tailwind CSS tokens compiled into a single CSS asset
- Alpine.js / htmx via CDN

## Getting Started
1. Install dependencies
   ```bash
   npm install
   ```
2. Build the token-driven stylesheet (run again after editing `templates/`, `components/` or `static/src/tokens.css`)
   ```bash
   npm run build:css
   ```
3. Start the Hono dev server (auto-reloads on file save)
   ```bash
   npm run dev
   ```
4. Visit `http://localhost:5173` to browse `/`, `/atoms`, `/molecules`, and trigger the htmx demos.

### Production start

```bash
npm run start
```

Set `PORT` if you need a different bind port.

## Styling (Tailwind Tokens)
Design tokens live in `tailwind.config.js` and are compiled from `static/src/tokens.css` into `static/css/app.css`. Run the Tailwind CLI locally whenever you change markup or tokens:

```bash
npm install          # once
npm run build:css    # single build
npm run watch:css    # rebuild on save
```

`ds-*` classes (buttons, inputs, cards, panels, etc.) are defined via `@layer components` so HTML can stay compact while htmx swaps only attributes/classes.

## Helpful Commands
- `npm run watch:css` – Tailwind watch mode
- `npm run typecheck` – TypeScript compilation check
- `npm run dev` – Start Hono server with auto-reload via `tsx`

## Project Layout
```
.
├── src/server.ts           # Hono entry point + htmx API endpoints
├── components/             # Atoms / Molecules partials rendered via Nunjucks
├── templates/              # Page templates (catalog, use-cases, etc.)
├── static/src/tokens.css   # Tailwind token definitions + ds-* classes
└── static/css/app.css      # Compiled stylesheet (generated)
```
