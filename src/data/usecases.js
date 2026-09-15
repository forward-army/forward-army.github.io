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
        lede: 'From unread error to a fix you approve.',
        body: 'It separates real errors from noise, finds the owner from your code history, and writes the ticket with the user scenario reconstructed — then opens the fix as a PR you approve and closes the ticket once the deploy is clean.',
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
        lede: 'Red builds, sorted before you look.',
        body: 'It tells a flaky test from a real failure, retries only what deserves it, and quarantines the rest behind a PR with an owner and an expiry — and when main goes red, it names the commit and proposes the revert.',
        connects: ['GitHub Actions', 'CI', 'Slack', 'Jira'],
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
        body: 'For the outage, not the daily error stream: connected to your alerting, logs, and runbooks, it reads the incident, posts a diagnosis and a proposed fix in Slack, and drafts the postmortem — with every corrective action waiting on your approval.',
        connects: ['PagerDuty', 'Datadog', 'Slack', 'GitHub'],
      },
    ],
  },
  {
    group: 'Data & AI',
    items: [
      {
        t: 'LLM release gate',
        lede: 'No prompt ships without passing its evals.',
        body: 'It runs every PR that touches a prompt, a model version, or retrieval against your regression set and annotates what moved and what broke — and when a provider sets a shutdown date, it prepares the migration behind a flag for your sign-off.',
        connects: ['GitHub', 'Braintrust / Langfuse', 'LaunchDarkly', 'Slack'],
      },
      {
        t: 'AI cost & provider ops',
        lede: 'The invoice explains itself.',
        body: 'It holds a token budget per feature and traces a spend jump back to the job, key, or PR that caused it — and on a provider outage it proposes the routing change with the cost it will incur, applying it on your word.',
        connects: ['OpenAI / Anthropic', 'LiteLLM', 'Slack', 'Jira'],
      },
      {
        t: 'Data pipeline triage',
        lede: 'Broken pipelines, caught before the dashboard is wrong.',
        body: 'It reads the failed run, works out the cause from lineage, and proposes the rerun or the scoped backfill — and it watches upstream schemas for the rename that would quietly fill your features with nulls, with every write waiting on you.',
        connects: ['Airflow / dbt', 'Snowflake / BigQuery', 'GitHub', 'Slack'],
      },
    ],
  },
  {
    group: 'Platform & compliance',
    items: [
      {
        t: 'Access & secrets steward',
        lede: 'Access that expires on its own.',
        body: 'It turns an access request in Slack into the narrowest role that does the job, gets the owner to approve in-thread, and provisions it with an expiry — then inventories your certificates and keys and opens the rotation ticket before the deadline.',
        connects: ['Okta', 'AWS / GCP IAM', 'GitHub', 'Slack'],
      },
      {
        t: 'Security & compliance evidence',
        lede: 'Evidence collected before the audit asks.',
        body: 'It drafts security-review and questionnaire answers from your code, infrastructure, and previously approved reviews, showing what changed since the last sign-off, and collects control evidence on a schedule — with your security lead signing before anything is sent.',
        connects: ['Vanta / Drata', 'ServiceNow', 'GitHub', 'Slack'],
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
