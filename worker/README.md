# forward.army — request-access Worker

A Cloudflare Worker that receives the site's **Request access** form and emails
the lead. It runs at `forward.army/api/request-access` (same origin as the site,
so the browser POST needs no CORS), and delivers via [Resend](https://resend.com).

## One-time setup

1. **Resend**: create an account, add and verify the `forward.army` domain
   (adds DKIM/SPF DNS records in Cloudflare), and create an API key.

2. **Deploy the Worker** (from this `worker/` directory):

   ```sh
   npm install -g wrangler        # or: npx wrangler ...
   npx wrangler login             # authorize your Cloudflare account
   npx wrangler secret put RESEND_API_KEY   # paste the Resend key
   npx wrangler deploy
   ```

   The route in `wrangler.toml` (`forward.army/api/*`) makes the Worker intercept
   those paths before they reach GitHub Pages.

3. **Verify**:

   ```sh
   curl -X POST https://forward.army/api/request-access \
     -H 'Content-Type: application/json' \
     -d '{"name":"Test","company":"Acme","email":"t@acme.com","usecase":"hello"}'
   # → {"ok":true}
   ```

## Behaviour

- Validates required fields + email; drops bot submissions via a honeypot field.
- On success returns `{"ok":true}` and the site shows its confirmation state.
- On any failure the site falls back to a `mailto:command@forward.army` link, so
  the form never dead-ends — even before the Worker is deployed.

## Config

`wrangler.toml [vars]`: `LEAD_TO` (recipient) and `LEAD_FROM` (verified sender).
Secret `RESEND_API_KEY` is set via `wrangler secret put` (never committed).
