import { html, raw } from 'hono/html';
import type { FC } from 'hono/jsx';

// ベースレイアウト
export const Layout: FC<{ title?: string; children?: any }> = ({ title = 'htmx Design System PoC', children }) => {
  return (
    <html lang="ja">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>{title}</title>

        <script src="https://cdn.tailwindcss.com"></script>
        <script src="https://unpkg.com/htmx.org@2.0.3"></script>
        <script defer src="https://cdn.jsdelivr.net/npm/alpinejs@3.14.1/dist/cdn.min.js"></script>
      </head>
      <body class="bg-gray-50">
        <div class="min-h-screen">
          {children}
        </div>
      </body>
    </html>
  );
};

// インデックスページ
export const IndexPage: FC = () => {
  return (
    <Layout>
      <div class="max-w-6xl mx-auto px-4 py-12">
        <header class="text-center mb-16">
          <h1 class="text-5xl font-bold text-gray-900 mb-4">
            htmx Design System PoC
          </h1>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            Server-rendered design system playground with Hono, Tailwind CSS, Alpine.js, and htmx
          </p>
        </header>

        <div class="grid md:grid-cols-2 gap-6 mb-12">
          <a href="/catalog" class="block p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-3">📦 Component Catalog</h2>
            <p class="text-gray-600 mb-4">
              Explore Atoms, Molecules, and Organisms with live code snippets
            </p>
            <span class="text-blue-600 font-semibold">Browse catalog →</span>
          </a>

          <a href="/use-cases" class="block p-8 bg-white rounded-xl shadow-sm hover:shadow-md transition border border-gray-100">
            <h2 class="text-2xl font-bold text-gray-900 mb-3">⚡️ Use Cases</h2>
            <p class="text-gray-600 mb-4">
              Practical htmx-powered workflows: task CRUD, forms, validation
            </p>
            <span class="text-blue-600 font-semibold">View demos →</span>
          </a>
        </div>

        <div class="grid md:grid-cols-3 gap-6">
          <a href="/atoms" class="block p-6 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg hover:shadow-md transition">
            <h3 class="text-lg font-bold text-blue-900 mb-2">Atoms</h3>
            <p class="text-sm text-blue-700">Basic building blocks</p>
          </a>

          <a href="/molecules" class="block p-6 bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg hover:shadow-md transition">
            <h3 class="text-lg font-bold text-purple-900 mb-2">Molecules</h3>
            <p class="text-sm text-purple-700">Simple component groups</p>
          </a>

          <a href="/organisms" class="block p-6 bg-gradient-to-br from-green-50 to-green-100 rounded-lg hover:shadow-md transition">
            <h3 class="text-lg font-bold text-green-900 mb-2">Organisms</h3>
            <p class="text-sm text-green-700">Complex UI sections</p>
          </a>
        </div>

        <div class="mt-12 p-6 bg-blue-50 rounded-lg border border-blue-200">
          <h3 class="text-lg font-semibold text-gray-900 mb-2">🚀 Quick Test</h3>
          <p class="text-gray-700 mb-4">Click to test htmx functionality:</p>
          <button
            hx-get="/api/demo/message"
            hx-swap="innerHTML"
            hx-target="#demo-response"
            class="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition">
            Test htmx
          </button>
          <div id="demo-response" class="mt-4"></div>
        </div>
      </div>
    </Layout>
  );
};

// タスクパネルのHTMLを生成
export function renderTaskPanel(message?: string, level: 'info' | 'success' | 'error' = 'info', tasks: any[] = [], statusMeta: any = {}) {
  const flash = message ? { message, level } : null;
  const levelColors = {
    info: 'bg-blue-50 text-blue-700 border-blue-200',
    success: 'bg-green-50 text-green-700 border-green-200',
    error: 'bg-red-50 text-red-700 border-red-200',
  };

  return html`
    <div id="task-panel" class="space-y-4">
      ${flash ? html`
        <div class="p-4 rounded-lg border ${levelColors[flash.level]}">
          ${flash.message}
        </div>
      ` : ''}

      ${tasks.map(task => html`
        <div class="p-4 bg-white rounded-lg shadow-sm border border-gray-200">
          <div class="flex items-start justify-between">
            <div class="flex-1">
              <h3 class="font-semibold text-gray-900">${task.title}</h3>
              <p class="text-sm text-gray-600 mt-1">${task.summary}</p>
              <div class="flex items-center gap-3 mt-2">
                <span class="text-xs px-2 py-1 rounded ${statusMeta[task.status]?.badge_class || 'bg-gray-100'}">
                  ${statusMeta[task.status]?.label || task.status}
                </span>
                <span class="text-xs text-gray-500">${task.owner}</span>
              </div>
            </div>
            <button
              hx-delete="/api/use-cases/tasks/${task.id}"
              hx-target="#task-panel"
              hx-swap="outerHTML"
              class="text-red-600 hover:text-red-800 text-sm">
              削除
            </button>
          </div>
        </div>
      `).join('')}
    </div>
  `;
}
