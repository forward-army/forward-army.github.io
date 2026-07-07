/**
 * forward.army — leads → Google Sheet.
 *
 * Bound to a Google Sheet, published as a Web App. The Cloudflare Worker POSTs
 * each lead here (server-side), and this appends a row to the "Leads" tab.
 *
 * Setup:
 *   1. Create a Google Sheet.
 *   2. Extensions → Apps Script → paste this file → Save.
 *   3. Deploy → New deployment → type "Web app":
 *        - Execute as: Me
 *        - Who has access: Anyone
 *      Copy the Web app URL.
 *   4. (Optional) set SHEET_TOKEN below to a random string and give the same
 *      value to the Worker via `wrangler secret put SHEET_TOKEN`.
 *   5. Give the Web app URL to the Worker:
 *        cd worker && npx wrangler secret put SHEET_WEBHOOK_URL
 */

// Optional shared secret. Leave '' to disable the check.
const SHEET_TOKEN = '';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse(e.postData.contents || '{}');

    if (SHEET_TOKEN && data.token !== SHEET_TOKEN) {
      return json({ ok: false, error: 'forbidden' });
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName('Leads');
    if (!sheet) sheet = ss.insertSheet('Leads');
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(['Timestamp', 'Name', 'Company', 'Email', 'Use case']);
      sheet.setFrozenRows(1);
    }

    sheet.appendRow([
      data.ts || new Date().toISOString(),
      data.name || '',
      data.company || '',
      data.email || '',
      data.usecase || '',
    ]);

    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function json(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(
    ContentService.MimeType.JSON
  );
}
