/// <reference types="@cloudflare/workers-types" />

export interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  SITE_URL: string;
  TELEGRAM_BOT_TOKEN?: string;
  TELEGRAM_CHAT_ID?: string;
}

const json = (data: unknown, status = 200) =>
  new Response(JSON.stringify(data), {
    status,
    headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store' },
  });

const clean = (v: unknown, max = 500): string | null => {
  if (typeof v !== 'string') return null;
  const s = v.trim().slice(0, max);
  return s.length ? s : null;
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

async function handleLead(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
  // Same-origin check: only accept posts from our own pages.
  const origin = request.headers.get('origin');
  if (origin) {
    const allowed = new Set([env.SITE_URL, new URL(request.url).origin]);
    if (!allowed.has(origin)) return json({ ok: false, error: 'Origin not allowed.' }, 403);
  }

  let body: Record<string, unknown>;
  const type = request.headers.get('content-type') || '';
  try {
    if (type.includes('application/json')) body = await request.json();
    else body = Object.fromEntries((await request.formData()).entries());
  } catch {
    return json({ ok: false, error: 'Could not read the form. Please try again.' }, 400);
  }

  // Honeypot: real people never fill the hidden "website" field.
  if (clean(body.website)) return json({ ok: true });

  const email = clean(body.email, 200);
  if (!email || !EMAIL_RE.test(email)) {
    return json({ ok: false, error: 'Please enter a valid email address so operators can reply.' }, 422);
  }

  const kind = clean(body.kind, 20) === 'contact' ? 'contact' : 'safari';
  const travellersRaw = Number(clean(body.travellers, 3));
  const lead = {
    kind,
    name: clean(body.name, 120),
    email,
    destination: clean(body.destination, 80),
    travel_month: clean(body.travel_month, 20),
    travellers: Number.isFinite(travellersRaw) && travellersRaw > 0 ? Math.min(50, travellersRaw) : null,
    budget: clean(body.budget, 40),
    message: clean(body.message, 2000),
    page: clean(body.page, 300),
    country: (request as Request & { cf?: { country?: string } }).cf?.country ?? null,
  };

  await env.DB.prepare(
    `INSERT INTO leads (kind, name, email, destination, travel_month, travellers, budget, message, page, country)
     VALUES (?1, ?2, ?3, ?4, ?5, ?6, ?7, ?8, ?9, ?10)`,
  )
    .bind(lead.kind, lead.name, lead.email, lead.destination, lead.travel_month, lead.travellers,
      lead.budget, lead.message, lead.page, lead.country)
    .run();

  if (env.TELEGRAM_BOT_TOKEN && env.TELEGRAM_CHAT_ID) {
    const text = [
      `New ${lead.kind} lead on bemba.com`,
      `Destination: ${lead.destination ?? '-'}`,
      `When: ${lead.travel_month ?? '-'} · Travellers: ${lead.travellers ?? '-'} · Budget: ${lead.budget ?? '-'}`,
      `Name: ${lead.name ?? '-'} · ${lead.email}`,
      lead.message ? `Note: ${lead.message}` : '',
      `From page: ${lead.page ?? '-'} (${lead.country ?? '?'})`,
    ].filter(Boolean).join('\n');
    ctx.waitUntil(
      fetch(`https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/sendMessage`, {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ chat_id: env.TELEGRAM_CHAT_ID, text }),
      }).catch(() => undefined),
    );
  }

  return json({ ok: true });
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/lead' || url.pathname === '/api/lead/') {
      if (request.method !== 'POST') return json({ ok: false, error: 'Use POST.' }, 405);
      try {
        return await handleLead(request, env, ctx);
      } catch (err) {
        console.error('lead error', err);
        return json({ ok: false, error: 'Something went wrong on our side. Please email hello@bemba.com.' }, 500);
      }
    }

    if (url.pathname === '/api/health' || url.pathname === '/api/health/') {
      return json({ ok: true, time: new Date().toISOString() });
    }

    if (url.pathname.startsWith('/api/')) return json({ ok: false, error: 'Not found.' }, 404);

    return env.ASSETS.fetch(request);
  },
} satisfies ExportedHandler<Env>;
