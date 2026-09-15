/**
 * Use cases — bespoke agents forward.army builds in your context and wires
 * into your tools (Slack, tickets, repos, business systems), governed and
 * shipping via PRs or in-platform approvals. Grouped by where they land.
 */
export const usecaseGroups = [
  {
    group: 'Engineering & product',
    items: [
      {
        t: 'Error-to-fix loop',
        lede: 'From the error nobody read to the fix you approve.',
        body: 'It reads every new error group, decides what is actionable and what is noise, finds the owner from your code history, and writes the ticket with the user scenario reconstructed — then opens the fix as a PR, watches the deploy, and closes the ticket. Off-the-shelf tools stop at the pull request; this one carries the loop to the end.',
        connects: ['Sentry', 'Jira / Linear', 'GitHub', 'Slack'],
      },
      {
        t: 'Codebase housekeeping',
        lede: 'A custom agent that knows your codebase.',
        body: 'It keeps an eye on your repositories to enforce best practices and your internal standards, adds the checks you are missing, and opens PRs that fix problems automatically — built from the actual context of your code, not a generic linter.',
        connects: ['GitHub / GitLab', 'CI', 'Slack'],
      },
      {
        t: 'CI guardian',
        lede: 'The end of "just rerun it".',
        body: 'It tells a flaky test from a real failure, retries only what deserves a retry, and quarantines the rest behind a PR with an owner and an expiry date. When main goes red it finds the commit that did it and proposes the revert or the fix before anyone opens the logs.',
        connects: ['GitHub Actions / GitLab CI', 'Test reports', 'Slack', 'Jira'],
      },
      {
        t: 'Ticket triage & resolution',
        lede: 'Every ticket, sorted and started.',
        body: 'It labels, routes, and de-duplicates incoming tickets, drafts resolutions or opens PRs for the ones it can handle, and escalates the rest to the right person with full context attached.',
        connects: ['Jira', 'Linear', 'Zendesk', 'Slack'],
      },
      {
        t: 'Incident first-responder',
        lede: 'Triage that starts the moment it pages.',
        body: 'For the outage, not the daily error stream: connected to your alerting, logs, and runbooks, it reads the incident, posts a diagnosis and a proposed fix in Slack, and drafts the postmortem — then diffs what responders actually did against the runbook and opens the update as a PR.',
        connects: ['PagerDuty', 'Datadog', 'Slack', 'GitHub'],
      },
      {
        t: 'Dependency & security hygiene',
        lede: 'Upgrades that arrive already green.',
        body: 'It tracks your dependencies and CVEs, opens upgrade PRs with the test suite passing, and flags anything risky for a human sign-off before it goes anywhere near production.',
        connects: ['GitHub', 'CVE feeds', 'CI', 'Slack'],
      },
    ],
  },
  {
    group: 'Data & AI in production',
    items: [
      {
        t: 'LLM release gate',
        lede: 'No prompt ships without passing its evals.',
        body: 'Every PR that touches a prompt, a model version, or retrieval runs against your regression set and comes back annotated with what moved and what broke. It also tracks provider deprecation calendars, finds every call site, and prepares the migration behind a feature flag before the shutdown date.',
        connects: ['GitHub', 'Eval platform', 'Feature flags', 'Slack'],
      },
      {
        t: 'AI cost & provider ops',
        lede: 'The invoice explains itself.',
        body: 'It holds a token budget per feature, and when spend jumps it traces the jump to the job, key, or PR responsible instead of leaving you the monthly total. On a provider outage or a quiet quality drop it proposes the routing change with the cost it will incur, and applies it on your word.',
        connects: ['LLM gateway', 'Billing APIs', 'PagerDuty', 'Slack'],
      },
      {
        t: 'Data pipeline first-responder',
        lede: 'Broken pipelines, triaged before the dashboard is wrong.',
        body: 'It reads the failed run, works out the cause from lineage, and proposes the rerun or the scoped backfill. It watches upstream schemas for the rename that would silently fill your features with nulls, and drafts the patch as a PR — every write to the warehouse waits for a human.',
        connects: ['Airflow / dbt', 'Snowflake / BigQuery', 'GitHub', 'Slack'],
      },
    ],
  },
  {
    group: 'Platform & compliance',
    items: [
      {
        t: 'Access & secrets steward',
        lede: 'Least privilege, granted in minutes and taken back on time.',
        body: 'It turns an access request in Slack into the narrowest role that does the job, gets the owner to approve in-thread, provisions it with an expiry, and revokes it when that expires. It inventories certificates and keys, opens the rotation ticket ahead of the deadline, and asks before touching production.',
        connects: ['Okta', 'AWS / GCP IAM', 'GitHub', 'Slack'],
      },
      {
        t: 'Security & compliance evidence',
        lede: 'The review that used to take a month.',
        body: 'It drafts security-review and questionnaire answers from your code, infrastructure, and previously approved reviews, showing what changed since the last sign-off instead of starting from a blank form. Control evidence is collected on a schedule, so the audit window is a review rather than a scramble.',
        connects: ['Vanta / Drata', 'ServiceNow / Jira', 'GitHub', 'Slack'],
      },
    ],
  },
  {
    group: 'Across the business',
    items: [
      {
        t: 'Finance & invoice ops',
        lede: 'The month-end grind, handled.',
        body: 'It reads incoming invoices and receipts, matches them to POs, flags anomalies, and drafts entries in your accounting system — routing anything unusual to you for approval in Slack instead of shipping it blind.',
        connects: ['NetSuite / QuickBooks', 'Email', 'Slack'],
      },
      {
        t: 'Sales & CRM upkeep',
        lede: 'A CRM that stays clean on its own.',
        body: 'It logs calls and emails against the right records, de-duplicates and enriches contacts, drafts follow-ups, and surfaces at-risk deals before they slip — so reps sell instead of doing data entry.',
        connects: ['Salesforce / HubSpot', 'Gmail', 'Slack'],
      },
      {
        t: 'Reporting & analytics',
        lede: 'Reports that assemble themselves.',
        body: 'Connected to your warehouse, it builds the recurring reports and dashboards your team rebuilds by hand, answers ad-hoc data questions in Slack, and flags anomalies worth a second look.',
        connects: ['Snowflake / BigQuery', 'Sheets', 'Slack'],
      },
      {
        t: 'Docs & knowledge upkeep',
        lede: 'Documentation that keeps itself honest.',
        body: 'It keeps your docs in sync with the code and decisions, flags stale pages, and answers teammates in Slack straight from your real sources — asking you for access when the knowledge base points somewhere it cannot reach.',
        connects: ['Confluence', 'Notion', 'Slack', 'GitHub'],
      },
      {
        t: 'Onboarding co-pilot',
        lede: 'New hires productive on day one.',
        body: 'It guides new joiners in Slack from your internal knowledge, provisions scoped access on your approval, and assembles their first-week plan — so ramp-up does not depend on catching a busy teammate.',
        connects: ['Slack', 'Okta', 'GitHub', 'Confluence'],
      },
    ],
  },
];
