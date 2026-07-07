/**
 * forward.army — request-access form handler.
 *
 * Receives JSON from the site's form, validates it, and emails the lead using
 * Cloudflare Email Routing (the `send_email` binding) — no third-party service,
 * no dependencies. Deployed at forward.army/api/* so the POST is same-origin.
 *
 * Requires (one-time, Cloudflare dashboard, forward.army zone):
 *   1. Email Routing enabled.
 *   2. LEAD_TO verified as a destination address.
 */
import { EmailMessage } from 'cloudflare:email';

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

const clean = (v, max = 4000) => String(v ?? '').trim().slice(0, max);
const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

// Base64 of a UTF-8 string (Workers have btoa but not Buffer).
const b64 = (str) => {
  const bytes = new TextEncoder().encode(str);
  let bin = '';
  const CH = 0x8000;
  for (let i = 0; i < bytes.length; i += CH) {
    bin += String.fromCharCode.apply(null, bytes.subarray(i, i + CH));
  }
  return btoa(bin);
};

// RFC 2047-encode a header value only when it contains non-ASCII.
const encHeader = (s) => (/[^\x00-\x7F]/.test(s) ? `=?UTF-8?B?${b64(s)}?=` : s);

export default {
  async fetch(request, env, ctx) {
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
    if (clean(data.website, 100)) return json({ ok: true });

    const name = clean(data.name, 200);
    const company = clean(data.company, 200);
    const email = clean(data.email, 320);
    const usecase = clean(data.usecase, 4000);

    if (!name || !company || !usecase || !isEmail(email)) {
      return json({ ok: false, error: 'Missing or invalid fields' }, 422);
    }

    const text = [
      'New deployment request',
      '',
      `Name:    ${name}`,
      `Company: ${company}`,
      `Email:   ${email}`,
      '',
      'Would deploy an agent on:',
      usecase,
      '',
    ].join('\n');

    const raw = [
      `From: ${encHeader('forward.army')} <${env.LEAD_FROM}>`,
      `To: ${env.LEAD_TO}`,
      `Reply-To: ${email}`,
      `Subject: ${encHeader(`Deployment request — ${company}`)}`,
      `Message-ID: <${crypto.randomUUID()}@forward.army>`,
      `Date: ${new Date().toUTCString()}`,
      'MIME-Version: 1.0',
      'Content-Type: text/plain; charset=utf-8',
      'Content-Transfer-Encoding: base64',
      '',
      b64(text).replace(/(.{76})/g, '$1\r\n'),
    ].join('\r\n');

    try {
      await env.LEADS.send(new EmailMessage(env.LEAD_FROM, env.LEAD_TO, raw));
    } catch (err) {
      return json({ ok: false, error: 'Delivery failed' }, 502);
    }

    // Best-effort: also append the lead to a Google Sheet (Apps Script web app).
    // Email is the source of truth, so a sheet hiccup never fails the request.
    if (env.SHEET_WEBHOOK_URL) {
      const append = fetch(env.SHEET_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ts: new Date().toISOString(),
          name,
          company,
          email,
          usecase,
          token: env.SHEET_TOKEN || undefined,
        }),
      }).catch(() => {});
      if (ctx && ctx.waitUntil) ctx.waitUntil(append);
      else await append;
    }

    return json({ ok: true });
  },
};
