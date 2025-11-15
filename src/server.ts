import { serve } from '@hono/node-server';
import app from './app';

const port = Number(process.env.PORT ?? 5173);

serve({
  fetch: app.fetch,
  port
});

console.log(`🚀 Hono server running at http://localhost:${port}`);
