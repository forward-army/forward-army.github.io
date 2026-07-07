/**
 * forward.army — request-access form handler.
 *
 * Receives JSON from the site's form, validates it, and emails the lead via
 * Resend. Deployed at forward.army/api/* so the browser POST is same-origin.
 *
 * Setup:
 *   cd worker
 *   npx wrangler secret put RESEND_API_KEY   # from https://resend.com (verify forward.army)
 *   npx wrangler deploy
 */

const CORS = {
  'Access-Control-Allow-Origin': 'https://forward.army',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

const json = (body, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json', ...CORS },
  });

const clean = (v, max = 2000) => String(v ?? '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const esc = (s) =>
  s.replace(/[<>&]/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;' }[c]));

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (request.method === 'OPTIONS') return new Response(null, { headers: CORS });
    if (request.method !== 'POST' || !url.pathname.endsWith('/request-access')) {
      return json({ ok: false, error: 'Not found' }, 404);
    }

    let data;
    try {
      data = await request.json();
    } catch {
      return json({ ok: false, error: 'Invalid JSON' }, 400);
    }

    // Bot honeypot: real users never fill "website".
    if (clean(data.website)) return json({ ok: true });

    const name = clean(data.name, 200);
    const company = clean(data.company, 200);
    const email = clean(data.email, 320);
    const usecase = clean(data.usecase, 4000);

    if (!name || !company || !usecase || !isEmail(email)) {
      return json({ ok: false, error: 'Missing or invalid fields' }, 422);
    }

    if (!env.RESEND_API_KEY) {
      // Misconfigured deploy — fail loudly so the form shows its fallback.
      return json({ ok: false, error: 'Mailer not configured' }, 500);
    }

    const text = `New deployment request\n\nName:    ${name}\nCompany: ${company}\nEmail:   ${email}\n\nWould deploy an agent on:\n${usecase}\n`;
    const html = `<h2>New deployment request</h2>
<p><strong>Name:</strong> ${esc(name)}<br>
<strong>Company:</strong> ${esc(company)}<br>
<strong>Email:</strong> ${esc(email)}</p>
<p><strong>Would deploy an agent on:</strong><br>${esc(usecase).replace(/\n/g, '<br>')}</p>`;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: env.LEAD_FROM,
        to: [env.LEAD_TO],
        reply_to: email,
        subject: `Deployment request — ${company}`,
        text,
        html,
      }),
    });

    if (!res.ok) {
      return json({ ok: false, error: 'Delivery failed' }, 502);
    }
    return json({ ok: true });
  },
};
