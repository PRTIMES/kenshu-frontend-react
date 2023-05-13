import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import { PrismaClient } from '@prisma/client';
import { cors } from 'hono/cors';
import { z } from 'zod';
import { zValidator } from '@hono/zod-validator';

const app = new Hono();

app.use(
  '/api/*',
  cors({
    origin: 'http://localhost:3000',
    allowMethods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  }),
);

const db = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
});

// GET: /api/tasks
app.get('/api/tasks', async (c) => {
  const tasks = await db.task.findMany();

  return c.json({
    tasks,
  });
});

// POST: /api/tasks
app.post('/api/tasks', async (c) => {
  const task = await db.task.create({ data: {} });

  c.status(201);
  return c.json({
    task,
  });
});

// PATCH: /api/tasks/:id
app.patch(
  '/api/tasks/:id',
  zValidator(
    'json',
    z.object({
      title: z.string().optional(),
      finishedAt: z.union([z.string().datetime().optional(), z.null()]),
    }),
  ),
  async (c) => {
    const data = c.req.valid('json');
    const id = c.req.param('id');
    const task = await db.task.update({ where: { id }, data });

    return c.json({
      task,
    });
  },
);

// DELETE: /api/tasks/:id
app.delete('/api/tasks/:id', async (c) => {
  const id = c.req.param('id');
  try {
    await db.task.delete({ where: { id } });
    c.status(204);
    return c.json({ success: true });
  } catch (err) {
    if (err.code === 'P2025') {
      c.status(404);
      return c.json({ success: false });
    }

    c.status(500);
    return c.json({ success: false });
  }
});

serve({
  fetch: app.fetch,
  port: 8000,
});
