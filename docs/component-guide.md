# Component Usage Guide

This project treats each HTML partial as a reusable building block. Compose them like LEGO bricks using Jinja’s `include`/`with` statements.

## Atoms
Location: `components/atoms/`

| Component | Purpose | Key Params |
|-----------|---------|------------|
| `button.html` | Tailwind-styled button with htmx hooks | `text`, `variant`, `size`, `hx-*` |
| `input.html` | Accessible input with error state | `name`, `type`, `placeholder`, `error`, `hx-*` |
| `label.html` | Form label with optional required mark | `text`, `for`, `required` |
| `text.html` | Typographic token (heading, caption, status) | `content`, `variant` |

Example:
```jinja
{% with text='Save', variant='primary', hx_post='/api/save', hx_target='#result' %}
  {% include 'atoms/button.html' %}
{% endwith %}
```

## Molecules
Location: `components/molecules/`

- `form-group.html` wraps `atoms/label` + `atoms/input`, handling help/error messaging automatically.
- `card.html` renders media, copy, and optional footer actions. Add `variant='clickable'` plus `hx-get` to stream detail panes.

Example form section:
```jinja
{% with label='ユーザー名', name='username', placeholder='山田太郎', required=true %}
  {% include 'molecules/form-group.html' %}
{% endwith %}
```

## Organisms
Location: `components/organisms/`

| Component | Highlights |
|-----------|------------|
| `navbar.html` | Responsive navigation with Alpine-powered mobile menu. Pass `current_page` to highlight tabs. |
| `modal.html` | Alpine-driven modal shell. Provide `id`, `title`, and `body_content` or a `caller()` block. Use `hx-target` inside the modal body to stream content. |
| `loading-indicator.html` | Reusable `hx-indicator` companion (`spinner`, `dots`, or `bar`). |

Modal usage:
```jinja
{% set modal_body %}
  <div id="detail-body">ロード待ち...</div>
{% endset %}
{% with id='detail-modal', title='詳細', size='lg', body_content=modal_body %}
  {% include 'organisms/modal.html' %}
{% endwith %}
```
Then trigger from any element:
```html
<button hx-get="/api/tasks/42" hx-target="#detail-body" @click="$dispatch('open-modal', { id: 'detail-modal' })">
  詳細を見る
</button>
```

## Catalog Integration
`/catalog` uses `app.py`’s `CATALOG_COMPONENTS` metadata to load partials dynamically. To add a new component preview:
1. Create a template under `templates/catalog/components/<name>.html`.
2. Register its metadata in `CATALOG_COMPONENTS` with `slug`, `title`, `category`, `summary`, and template path.
3. The detail pane will automatically fetch `/api/catalog/<slug>`.

## Use Case Components
The `/use-cases` page relies on:
- `use_cases/partials/task_panel.html` for backlog management.
- `use_cases/partials/task_detail.html` for modal content.
- `use_cases/partials/feedback_response.html` and `error_message.html` for form/error feedback.

Reuse these partials whenever you need consistent UI for CRUD lists, modals, or flash messaging.
