/**
 * forward.army — request-access form handler.
 *
 * Receives JSON from the site's form, validates it, and emails the lead using
 * Cloudflare Email Routing (the `send_email` binding) — no third-party service.
 * Deployed at forward.army/api/* so the browser POST is same-origin.
 *
 * Requires (one-time, in the Cloudflare dashboard for the forward.army zone):
 *   1. Email Routing enabled.
 *   2. The LEAD_TO address verified as a destination address.
 */
import { EmailMessage } from 'cloudflare:email';
import { createMimeMessage } from 'mimetext';

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
    if (clean(data.website, 100)) return json({ ok: true });

    const name = clean(data.name, 200);
    const company = clean(data.company, 200);
    const email = clean(data.email, 320);
    const usecase = clean(data.usecase, 4000);

    if (!name || !company || !usecase || !isEmail(email)) {
      return json({ ok: false, error: 'Missing or invalid fields' }, 422);
    }

    const body = [
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

    const msg = createMimeMessage();
    msg.setSender({ name: 'forward.army', addr: env.LEAD_FROM });
    msg.setRecipient(env.LEAD_TO);
    msg.setSubject(`Deployment request — ${company}`);
    msg.setHeader('Reply-To', email);
    msg.addMessage({ contentType: 'text/plain', data: body });

    try {
      const message = new EmailMessage(env.LEAD_FROM, env.LEAD_TO, msg.asRaw());
      await env.LEADS.send(message);
    } catch (err) {
      return json({ ok: false, error: 'Delivery failed' }, 502);
    }

    return json({ ok: true });
  },
};
