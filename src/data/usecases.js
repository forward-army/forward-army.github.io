/**
 * Use cases — bespoke agents forward.army builds in your context and wires
 * into your tools (Slack, tickets, repos), governed and shipping via PRs.
 */
export const usecases = [
  {
    t: 'Codebase housekeeping',
    lede: 'A custom agent that knows your codebase.',
    body: 'It keeps an eye on your repositories to enforce best practices and your internal standards, adds the checks you are missing, and opens PRs that fix problems automatically — built from the actual context of your code, not a generic linter.',
    connects: ['GitHub / GitLab', 'CI', 'Slack'],
  },
  {
    t: 'Incident first-responder',
    lede: 'Triage that starts the moment it pages.',
    body: 'Connected to your alerting, logs, and runbooks, it reads the incident, posts a diagnosis and a proposed fix in Slack, and drafts the postmortem — with every corrective action waiting on your approval.',
    connects: ['PagerDuty', 'Datadog', 'Slack', 'GitHub'],
  },
  {
    t: 'Ticket triage & resolution',
    lede: 'Every ticket, sorted and started.',
    body: 'It labels, routes, and de-duplicates incoming tickets, drafts resolutions or opens PRs for the ones it can handle, and escalates the rest to the right person with full context attached.',
    connects: ['Jira', 'Linear', 'Zendesk', 'Slack'],
  },
  {
    t: 'Docs & knowledge upkeep',
    lede: 'Documentation that keeps itself honest.',
    body: 'It keeps your docs in sync with the code and decisions, flags stale pages, and answers teammates in Slack straight from your real sources — asking you for access when the knowledge base points somewhere it cannot reach.',
    connects: ['Confluence', 'Notion', 'Slack', 'GitHub'],
  },
  {
    t: 'Dependency & security hygiene',
    lede: 'Upgrades that arrive already green.',
    body: 'It tracks your dependencies and CVEs, opens upgrade PRs with the test suite passing, and flags anything risky for a human sign-off before it goes anywhere near production.',
    connects: ['GitHub', 'CVE feeds', 'CI', 'Slack'],
  },
  {
    t: 'Onboarding co-pilot',
    lede: 'New hires productive on day one.',
    body: 'It guides new joiners in Slack from your internal knowledge, provisions scoped access on your approval, and assembles their first-week plan — so ramp-up does not depend on catching a busy teammate.',
    connects: ['Slack', 'Okta', 'GitHub', 'Confluence'],
  },
];
