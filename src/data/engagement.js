/**
 * Engagement modes — how much of the operator the customer wants to be.
 * Build: we ship it, you run it. Operate: flat monthly fee, we keep it running.
 * Augment: continuous Build with Operate included. Drives the homepage
 * "Operate" section.
 *
 * Commitments marked TODO are market-standard defaults, not confirmed terms.
 * Confirm before they ship: response time, monthly improvement, fee unit,
 * pass-through of model spend, notice period.
 */
export const modes = [
  {
    idx: 'E-01',
    label: 'Build',
    t: 'We build it. You run it.',
    d: 'Our engineers deploy forward with your team, design the agent for one specific job, and ship it. You keep the code, the evaluation set you approved, and a runbook. It runs on your ground or ours, and your people operate it.',
  },
  {
    idx: 'E-02',
    label: 'Operate',
    t: 'A flat monthly fee. We keep it running.',
    d: 'Agents drift when nobody watches them: providers change models, your systems change APIs, edge cases surface. Operate is the team that watches — and ships one scoped improvement a month, agreed with you.', // TODO confirm monthly improvement
    includes: [
      'Monitoring of agent behavior, accuracy, and token spend',
      'Model and provider updates, API migrations, bug fixes',
      'Incident response, next business day', // TODO confirm
      'Prompt and evaluation tuning against the set you approved',
      'A monthly report: what it did, what it cost, what changed',
    ],
  },
  {
    idx: 'E-03',
    label: 'Augment',
    t: 'A named engineer, on retainer.',
    d: 'For teams without an AI function, or that would rather not spend theirs on upkeep. One of our engineers sits in your Slack, building the next agent while running the previous one. Everything in Operate is included.',
  },
];

// TODO confirm fee unit, pass-through, and notice period before this ships.
export const terms =
  'Priced per agent, per month; model and API spend passes through at cost. Operate works through the same scoped, revocable access as everything else, and every change still arrives as a PR or an approval. Month to month after the first quarter, thirty days’ notice.';
