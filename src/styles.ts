// カスタムCSSスタイル - 単一ファイルで管理
export const CSS_STYLES = `
/* Reset and Base Styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

html {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  background-color: #f9fafb;
  color: #111827;
  line-height: 1.5;
}

/* Container */
.container {
  max-width: 1280px;
  margin: 0 auto;
  padding: 0 1rem;
}

.max-w-4xl {
  max-width: 56rem;
  margin: 0 auto;
}

.max-w-6xl {
  max-width: 72rem;
  margin: 0 auto;
}

.max-w-7xl {
  max-width: 80rem;
  margin: 0 auto;
}

.max-w-2xl {
  max-width: 42rem;
  margin: 0 auto;
}

/* Spacing */
.px-4 { padding-left: 1rem; padding-right: 1rem; }
.px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
.px-6 { padding-left: 1.5rem; padding-right: 1.5rem; }
.py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
.py-3 { padding-top: 0.75rem; padding-bottom: 0.75rem; }
.py-4 { padding-top: 1rem; padding-bottom: 1rem; }
.py-6 { padding-top: 1.5rem; padding-bottom: 1.5rem; }
.py-8 { padding-top: 2rem; padding-bottom: 2rem; }
.py-12 { padding-top: 3rem; padding-bottom: 3rem; }
.p-4 { padding: 1rem; }
.p-6 { padding: 1.5rem; }
.p-8 { padding: 2rem; }

.mb-1 { margin-bottom: 0.25rem; }
.mb-2 { margin-bottom: 0.5rem; }
.mb-3 { margin-bottom: 0.75rem; }
.mb-4 { margin-bottom: 1rem; }
.mb-8 { margin-bottom: 2rem; }
.mb-12 { margin-bottom: 3rem; }
.mb-16 { margin-bottom: 4rem; }
.mt-1 { margin-top: 0.25rem; }
.mt-2 { margin-top: 0.5rem; }
.mt-4 { margin-top: 1rem; }
.mt-6 { margin-top: 1.5rem; }
.mt-8 { margin-top: 2rem; }
.mt-12 { margin-top: 3rem; }

.mx-auto { margin-left: auto; margin-right: auto; }

/* Layout */
.min-h-screen {
  min-height: 100vh;
}

.flex {
  display: flex;
}

.inline-flex {
  display: inline-flex;
}

.block {
  display: block;
}

.hidden {
  display: none;
}

.items-center {
  align-items: center;
}

.items-start {
  align-items: flex-start;
}

.justify-between {
  justify-content: space-between;
}

.justify-center {
  justify-content: center;
}

.flex-1 {
  flex: 1;
}

.flex-shrink-0 {
  flex-shrink: 0;
}

.flex-wrap {
  flex-wrap: wrap;
}

.space-x-4 > * + * {
  margin-left: 1rem;
}

.space-y-1 > * + * {
  margin-top: 0.25rem;
}

.space-y-2 > * + * {
  margin-top: 0.5rem;
}

.space-y-4 > * + * {
  margin-top: 1rem;
}

.space-y-6 > * + * {
  margin-top: 1.5rem;
}

.gap-3 {
  gap: 0.75rem;
}

.gap-4 {
  gap: 1rem;
}

.gap-6 {
  gap: 1.5rem;
}

/* Grid */
.grid {
  display: grid;
}

.grid-cols-3 {
  grid-template-columns: repeat(3, 1fr);
}

@media (min-width: 768px) {
  .md\\:grid-cols-2 {
    grid-template-columns: repeat(2, 1fr);
  }

  .md\\:grid-cols-3 {
    grid-template-columns: repeat(3, 1fr);
  }

  .md\\:col-span-2 {
    grid-column: span 2;
  }

  .md\\:block {
    display: block;
  }

  .md\\:hidden {
    display: none;
  }
}

/* Typography */
.text-4xl {
  font-size: 2.25rem;
  line-height: 2.5rem;
}

.text-5xl {
  font-size: 3rem;
  line-height: 1;
}

.text-3xl {
  font-size: 1.875rem;
  line-height: 2.25rem;
}

.text-2xl {
  font-size: 1.5rem;
  line-height: 2rem;
}

.text-xl {
  font-size: 1.25rem;
  line-height: 1.75rem;
}

.text-lg {
  font-size: 1.125rem;
  line-height: 1.75rem;
}

.text-base {
  font-size: 1rem;
  line-height: 1.5rem;
}

.text-sm {
  font-size: 0.875rem;
  line-height: 1.25rem;
}

.text-xs {
  font-size: 0.75rem;
  line-height: 1rem;
}

.font-bold {
  font-weight: 700;
}

.font-semibold {
  font-weight: 600;
}

.font-medium {
  font-weight: 500;
}

.text-center {
  text-align: center;
}

.text-left {
  text-align: left;
}

/* Colors */
.text-gray-500 { color: #6b7280; }
.text-gray-600 { color: #4b5563; }
.text-gray-700 { color: #374151; }
.text-gray-800 { color: #1f2937; }
.text-gray-900 { color: #111827; }
.text-blue-600 { color: #2563eb; }
.text-blue-700 { color: #1d4ed8; }
.text-blue-900 { color: #1e3a8a; }
.text-purple-700 { color: #7e22ce; }
.text-purple-900 { color: #581c87; }
.text-green-600 { color: #16a34a; }
.text-green-700 { color: #15803d; }
.text-green-900 { color: #14532d; }
.text-red-600 { color: #dc2626; }
.text-red-700 { color: #b91c1c; }
.text-red-800 { color: #991b1b; }
.text-red-900 { color: #7f1d1d; }
.text-yellow-700 { color: #a16207; }
.text-yellow-900 { color: #713f12; }
.text-white { color: #ffffff; }

.bg-gray-50 { background-color: #f9fafb; }
.bg-gray-100 { background-color: #f3f4f6; }
.bg-gray-200 { background-color: #e5e7eb; }
.bg-gray-900 { background-color: #111827; }
.bg-white { background-color: #ffffff; }
.bg-blue-50 { background-color: #eff6ff; }
.bg-blue-100 { background-color: #dbeafe; }
.bg-blue-600 { background-color: #2563eb; }
.bg-blue-700 { background-color: #1d4ed8; }
.bg-purple-50 { background-color: #faf5ff; }
.bg-purple-100 { background-color: #f3e8ff; }
.bg-green-50 { background-color: #f0fdf4; }
.bg-green-100 { background-color: #dcfce7; }
.bg-red-50 { background-color: #fef2f2; }
.bg-yellow-50 { background-color: #fefce8; }

/* Gradients */
.bg-gradient-to-r {
  background-image: linear-gradient(to right, var(--tw-gradient-stops));
}

.bg-gradient-to-br {
  background-image: linear-gradient(to bottom right, var(--tw-gradient-stops));
}

.from-blue-50 { --tw-gradient-from: #eff6ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-blue-100 { --tw-gradient-to: #dbeafe; }
.from-blue-600 { --tw-gradient-from: #2563eb; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-blue-700 { --tw-gradient-to: #1d4ed8; }
.from-blue-700 { --tw-gradient-from: #1d4ed8; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-blue-800 { --tw-gradient-to: #1e40af; }
.from-purple-50 { --tw-gradient-from: #faf5ff; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-purple-100 { --tw-gradient-to: #f3e8ff; }
.from-purple-600 { --tw-gradient-from: #9333ea; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-purple-700 { --tw-gradient-to: #7e22ce; }
.from-purple-700 { --tw-gradient-from: #7e22ce; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-purple-800 { --tw-gradient-to: #6b21a8; }
.from-green-50 { --tw-gradient-from: #f0fdf4; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-green-100 { --tw-gradient-to: #dcfce7; }
.from-emerald-600 { --tw-gradient-from: #059669; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-emerald-700 { --tw-gradient-to: #047857; }
.from-emerald-700 { --tw-gradient-from: #047857; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-emerald-800 { --tw-gradient-to: #065f46; }
.from-slate-900 { --tw-gradient-from: #0f172a; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-slate-700 { --tw-gradient-to: #334155; }
.from-slate-800 { --tw-gradient-from: #1e293b; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-slate-600 { --tw-gradient-to: #475569; }
.from-rose-500 { --tw-gradient-from: #f43f5e; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-orange-500 { --tw-gradient-to: #f97316; }
.from-rose-600 { --tw-gradient-from: #e11d48; --tw-gradient-stops: var(--tw-gradient-from), var(--tw-gradient-to); }
.to-orange-600 { --tw-gradient-to: #ea580c; }

/* Borders */
.border {
  border-width: 1px;
  border-style: solid;
}

.border-t {
  border-top-width: 1px;
  border-top-style: solid;
}

.border-gray-100 { border-color: #f3f4f6; }
.border-gray-200 { border-color: #e5e7eb; }
.border-gray-300 { border-color: #d1d5db; }
.border-blue-200 { border-color: #bfdbfe; }
.border-red-200 { border-color: #fecaca; }
.border-green-200 { border-color: #bbf7d0; }
.border-yellow-200 { border-color: #fef08a; }

.rounded {
  border-radius: 0.25rem;
}

.rounded-md {
  border-radius: 0.375rem;
}

.rounded-lg {
  border-radius: 0.5rem;
}

.rounded-xl {
  border-radius: 0.75rem;
}

.rounded-full {
  border-radius: 9999px;
}

/* Shadows */
.shadow-sm {
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
}

.shadow-md {
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
}

.shadow-lg {
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
}

/* Interactive */
button, a {
  cursor: pointer;
}

button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.transition,
.transition-colors,
.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.hover\\:bg-blue-700:hover { background-color: #1d4ed8; }
.hover\\:bg-blue-800:hover { background-color: #1e40af; }
.hover\\:bg-gray-50:hover { background-color: #f9fafb; }
.hover\\:bg-gray-100:hover { background-color: #f3f4f6; }
.hover\\:bg-gray-300:hover { background-color: #d1d5db; }
.hover\\:text-blue-600:hover { color: #2563eb; }
.hover\\:text-red-800:hover { color: #991b1b; }
.hover\\:shadow-md:hover { box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); }
.hover\\:shadow-lg:hover { box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05); }
.hover\\:-translate-y-1:hover { transform: translateY(-0.25rem); }

.hover\\:from-blue-700:hover { --tw-gradient-from: #1d4ed8; }
.hover\\:to-blue-800:hover { --tw-gradient-to: #1e40af; }
.hover\\:from-purple-700:hover { --tw-gradient-from: #7e22ce; }
.hover\\:to-purple-800:hover { --tw-gradient-to: #6b21a8; }
.hover\\:from-emerald-700:hover { --tw-gradient-from: #047857; }
.hover\\:to-emerald-800:hover { --tw-gradient-to: #065f46; }
.hover\\:from-slate-800:hover { --tw-gradient-from: #1e293b; }
.hover\\:to-slate-600:hover { --tw-gradient-to: #475569; }
.hover\\:from-rose-600:hover { --tw-gradient-from: #e11d48; }
.hover\\:to-orange-600:hover { --tw-gradient-to: #ea580c; }

.focus\\:outline-none:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

.focus\\:ring-2:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5);
}

.focus\\:ring-blue-500:focus {
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.5);
}

/* Forms */
input[type="text"],
input[type="email"],
select {
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.5rem;
  font-size: 1rem;
  line-height: 1.5;
}

input[type="text"]:focus,
input[type="email"]:focus,
select:focus {
  outline: none;
  border-color: #2563eb;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

/* Width */
.w-full {
  width: 100%;
}

.w-6 {
  width: 1.5rem;
}

.h-6 {
  height: 1.5rem;
}

.h-16 {
  height: 4rem;
}

.h-full {
  height: 100%;
}

.aspect-video {
  aspect-ratio: 16 / 9;
}

/* Overflow */
.overflow-hidden {
  overflow: hidden;
}

.overflow-x-auto {
  overflow-x: auto;
}

/* Lists */
.list-disc {
  list-style-type: disc;
}

.list-inside {
  list-style-position: inside;
}

/* Special components */
pre {
  white-space: pre;
  overflow-x: auto;
}

/* Cursor */
.cursor-pointer {
  cursor: pointer;
}

/* Opacity */
.opacity-50 {
  opacity: 0.5;
}

.disabled\\:opacity-50:disabled {
  opacity: 0.5;
}

.disabled\\:cursor-not-allowed:disabled {
  cursor: not-allowed;
}

/* Alpine.js transitions */
[x-cloak] {
  display: none !important;
}
`;
