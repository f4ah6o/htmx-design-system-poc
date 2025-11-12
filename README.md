# htmx Design System PoC

Flask-based playground that demonstrates how to compose Atoms → Molecules → Organisms, power them with htmx, and document real-world workflows (dynamic lists, form validation, modal details, error handling).

## Stack
- Python 3.11+
- Flask 3
- Tailwind CSS / Alpine.js / htmx via CDN

## Getting Started (uv-first)
1. **Install [uv](https://docs.astral.sh/uv/)**
   ```bash
   curl -Ls https://astral.sh/uv/install.sh | sh
   ```
2. **Sync dependencies** (creates `.venv/` automatically)
   ```bash
   uv sync
   ```
3. **Run the dev server**
   ```bash
   uv run flask --app app.py run --debug
   ```
4. Visit `http://127.0.0.1:5000` and explore `/atoms`, `/molecules`, `/organisms`, `/catalog`, `/use-cases`.

> Need a legacy `requirements.txt`? Regenerate it with `uv export --format requirements.txt --no-hashes -o requirements.txt`.

## Helpful Commands
- `uv run python -m py_compile app.py` – syntax check
- `FLASK_DEBUG=1 uv run flask --app app.py run` – auto reload during development
- `uv sync --dev` – include optional dev dependencies (none yet, but hooks are ready)

## Project Layout
```
.
├── app.py                  # Flask routes + htmx demo endpoints
├── components/             # Atoms / Molecules / Organisms Jinja partials
├── templates/              # Page templates (catalog, use-cases, etc.)
├── pyproject.toml          # uv/PEP 621 project definition
├── uv.lock                 # Locked dependency graph
└── requirements.txt        # Auto-exported for compatibility
```
