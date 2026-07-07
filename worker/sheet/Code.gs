/**
 * forward.army — leads → Google Sheet.
 *
 * Bound to a Google Sheet (Extensions → Apps Script), published as a Web App.
 * The Cloudflare Worker POSTs each lead here and this appends a row to the
 * "Leads" tab.
 *
 * Setup:
 *   1. Extensions → Apps Script → paste this file → Save.
 *   2. Set SHEET_TOKEN below to the same value as the Worker's SHEET_TOKEN
 *      secret (leave '' to disable the check).
 *   3. Deploy → Manage deployments → Edit → New version →
 *      Execute as: Me, Who has access: Anyone → Deploy.
 */

// Shared secret — must match the Worker's SHEET_TOKEN. '' disables the check.
const SHEET_TOKEN = '';

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(30000);
  try {
    const data = JSON.parse((e && e.postData && e.postData.contents) || '{}');

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
