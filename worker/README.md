# forward.army — request-access Worker

A Cloudflare Worker that receives the site's **Request access** form and emails
the lead using **Cloudflare Email Routing** — no third-party mail service. It
runs at `forward.army/api/request-access` (same origin as the site, so the
browser POST needs no CORS).

## One-time Cloudflare dashboard setup (required)

The `send_email` binding delivers to a **verified** destination:

1. In the `forward.army` zone → **Email → Email Routing**, click **Enable**.
2. Under **Destination addresses**, add and **verify** `roman.bartusiak@gmail.com`
   (Cloudflare emails a confirmation link).

That's it — no API keys, no external accounts.

## Deploy

```sh
cd worker
npm install
npx wrangler login          # authorize your Cloudflare account (once)
npx wrangler deploy
```

The route in `wrangler.toml` (`forward.army/api/*`) makes the Worker intercept
those paths before they reach GitHub Pages.

## Verify

```sh
curl -X POST https://forward.army/api/request-access \
  -H 'Content-Type: application/json' \
  -d '{"name":"Test","company":"Acme","email":"t@acme.com","usecase":"hello"}'
# → {"ok":true}   (and an email lands in your inbox)
```

## Optional: also log every lead to a Google Sheet

Each lead is emailed (above) and, if configured, appended as a row to a Google
Sheet. The sheet URL lives only in the Worker (server-side) — it's never exposed
to the browser.

1. Create a Google Sheet.
2. **Extensions → Apps Script**, paste [`sheet/Code.gs`](sheet/Code.gs), save.
3. **Deploy → New deployment → Web app** — *Execute as: Me*, *Who has access:
   Anyone* — and copy the **Web app URL**.
4. Point the Worker at it:

   ```sh
   cd worker
   npx wrangler secret put SHEET_WEBHOOK_URL   # paste the Web app URL
   # optional shared secret (must match SHEET_TOKEN in Code.gs):
   npx wrangler secret put SHEET_TOKEN
   npx wrangler deploy
   ```

Rows: `Timestamp · Name · Company · Email · Use case`. If the sheet is
unreachable the email still sends — lead capture never depends on it.

## Config (`wrangler.toml`)

- `send_email` `destination_address` and `[vars] LEAD_TO` — where leads land
  (must be a verified Email Routing destination).
- `[vars] LEAD_FROM` — sender address on `forward.army`.
- Requester's email is set as `Reply-To`, so you can reply straight from your inbox.

## Behaviour

- Validates required fields + email; drops bots via a honeypot field.
- Success → `{"ok":true}`; the site shows its confirmation state.
- Any failure → the site falls back to `mailto:command@forward.army`, so the
  form never dead-ends.
