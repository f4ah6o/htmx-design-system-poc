import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { Hono } from 'hono';
import nunjucks from 'nunjucks';
import path from 'node:path';

const isProd = process.env.NODE_ENV === 'production';

const templatePaths = [
  path.join(process.cwd(), 'templates'),
  path.join(process.cwd(), 'components')
];

const env = new nunjucks.Environment(
  new nunjucks.FileSystemLoader(templatePaths, {
    noCache: !isProd,
    watch: false
  }),
  { autoescape: true }
);

const render = (template: string, context: Record<string, unknown> = {}): string =>
  env.render(template, context);


const app = new Hono();

app.use('/static/*', serveStatic({
  root: './'
}));

app.get('/', (c) => c.html(render('index.html')));
app.get('/atoms', (c) => c.html(render('atoms.html')));
app.get('/molecules', (c) => c.html(render('molecules.html')));

app.get('/api/demo/message', (c) =>
  c.html('<p class="ds-helper-text ds-text-success font-semibold">✓ htmxが正常に動作しています！サーバーからメッセージを取得しました。</p>')
);

app.post('/api/validate/username', async (c) => {
  const body = await c.req.parseBody();
  const usernameRaw = body['username'];
  const username = typeof usernameRaw === 'string' ? usernameRaw.trim() : '';

  if (!username) {
    return c.html('');
  }

  if (username.length < 3) {
    return c.html('<p class="ds-helper-text ds-text-danger">✗ ユーザー名は3文字以上である必要があります</p>');
  }

  if (username.length > 20) {
    return c.html('<p class="ds-helper-text ds-text-danger">✗ ユーザー名は20文字以下である必要があります</p>');
  }

  const reserved = ['admin', 'root', 'system'];
  if (reserved.includes(username.toLowerCase())) {
    return c.html('<p class="ds-helper-text ds-text-danger">✗ このユーザー名は使用できません</p>');
  }

  return c.html('<p class="ds-helper-text ds-text-success">✓ このユーザー名は使用可能です</p>');
});

app.post('/api/demo/submit-form', async (c) => {
  const body = await c.req.parseBody();
  const name = typeof body['name'] === 'string' ? body['name'].trim() : '';
  const message = typeof body['message'] === 'string' ? body['message'].trim() : '';

  if (!name || !message) {
    return c.html(
      '<div class="ds-callout ds-callout-danger"><p>すべてのフィールドを入力してください</p></div>'
    );
  }

  const safeName = escapeHtml(name);
  const safeMessage = escapeHtml(message);

  const html = `
    <div class="ds-callout ds-callout-success space-y-2">
      <p class="font-semibold">✓ フォームが正常に送信されました！</p>
      <div class="text-label-sm text-neutral-700 space-y-1">
        <p><strong>名前:</strong> ${safeName}</p>
        <p><strong>メッセージ:</strong> ${safeMessage}</p>
      </div>
    </div>
  `;

  return c.html(html);
});

app.get('/api/demo/product/:productId', (c) => {
  const productId = c.req.param('productId');
  const products: Record<string, {
    name: string;
    price: string;
    description: string;
    stock: string;
    status: 'available' | 'low' | 'out';
  }> = {
    a: {
      name: '商品 A',
      price: '¥1,980',
      description: '高品質な商品Aです。素晴らしい機能を備えています。',
      stock: '在庫あり',
      status: 'available'
    },
    b: {
      name: '商品 B',
      price: '¥2,980',
      description: 'プレミアム商品Bです。最高の体験を提供します。',
      stock: '残りわずか',
      status: 'low'
    },
    c: {
      name: '商品 C',
      price: '¥980',
      description: 'お手頃価格の商品Cです。コストパフォーマンスに優れています。',
      stock: '在庫あり',
      status: 'available'
    }
  };

  const product = products[productId];
  if (!product) {
    return c.html('<p class="ds-helper-text ds-text-danger">商品が見つかりませんでした</p>');
  }

  const statusClass =
    product.status === 'available'
      ? 'ds-pill ds-pill-available'
      : product.status === 'low'
        ? 'ds-pill ds-pill-low'
        : 'ds-pill ds-pill-out';

  const html = `
    <div class="space-y-4">
      <h3 class="text-title-md font-semibold text-neutral-900">${product.name}</h3>
      <div class="flex items-center gap-4">
        <span class="text-display-sm font-semibold text-brand-600">${product.price}</span>
        <span class="${statusClass}">${product.stock}</span>
      </div>
      <p class="text-body-md text-neutral-700">${product.description}</p>
      <div class="flex gap-3 pt-4">
        <button class="ds-btn ds-btn-primary ds-btn-md">カートに追加</button>
        <button class="ds-btn ds-btn-outline ds-btn-md">お気に入り</button>
      </div>
    </div>
  `;

  return c.html(html);
});

const port = Number(process.env.PORT ?? 5173);

serve({
  fetch: app.fetch,
  port
});

console.log(`🚀 Hono server running at http://localhost:${port}`);

function escapeHtml(value: string) {
  return (value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
