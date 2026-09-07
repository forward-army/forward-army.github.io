/**
 * Engagement modes — how much of the operator the customer wants to be.
 * Build: we ship it, you run it. Operate: flat monthly fee, we keep it running.
 * Augment: our engineer becomes yours. Drives the homepage "Engagement" section.
 *
 * Commitments marked TODO are market-standard defaults, not confirmed terms.
 * Confirm before they ship: response time, monthly improvement, notice period.
 */
export const modes = [
  {
    idx: 'E-01',
    label: 'Build',
    t: 'We ship it. You run it.',
    d: 'Our engineers deploy forward with your team, design the agent for one specific job, and ship it. It runs on the platform, under your command, and your people operate it.',
  },
  {
    idx: 'E-02',
    label: 'Operate',
    t: 'A flat monthly fee. We keep it running.',
    d: 'Agents drift when nobody watches them: providers change models, your systems change APIs, edge cases surface. Operate is who watches — and keeps shipping.',
    includes: [
      'Monitoring of agent behaviour, accuracy, and token spend',
      'Model and provider updates, API migrations, bug fixes',
      'Incident response, next business day', // TODO confirm
      'Prompt and evaluation tuning against a golden set',
      'A monthly report: what it did, what it cost, what changed',
      'One improvement shipped every month', // TODO confirm
    ],
  },
  {
    idx: 'E-03',
    label: 'Augment',
    t: 'No AI team? Ours becomes yours.',
    d: 'A named engineer in your Slack, on retainer — building the next agent while running the last. For teams without an AI function, and for teams that would rather not spend theirs on upkeep.',
  },
];

// TODO confirm notice period before this ships.
export const terms =
  'Same rule as access: you can pull it back. Month to month after the first quarter.';
