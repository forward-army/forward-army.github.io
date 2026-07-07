/**
 * Comparison content. Each entry powers /compare/<slug>.
 * Framing is honest: forward.army is a governed OPERATOR that deploys agents
 * into your systems, vs. capable tools/platforms you self-operate. No false or
 * disparaging claims — competitor cells state their real, public model.
 */
// Shown on every comparison page. forward.army isn't a rival model — it uses them.
export const positioning =
  'forward.army is an automated forward-deployed engineer. It uses ChatGPT, Claude, and many other models as tools — so this is not a contest of models. It is the operating layer around them: your infrastructure, scoped access, guardrails, PRs, and a human in command.';

export const comparisons = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    tagline:
      'ChatGPT is a tool you operate. forward.army is an automated forward-deployed engineer that uses ChatGPT — and other models — as tools, and runs the whole job inside your systems, under your command.',
    intro:
      'ChatGPT — with Operator, custom GPTs, and the API — is a powerful general assistant you point at problems and drive yourself. forward.army is the engineer, not the tool: an automated forward-deployed engineer that uses models like GPT under the hood, deploys into your business under scoped access, and ships the work — so adoption never hinges on your team learning to prompt.',
    note: null,
    rows: [
      {
        k: 'Where it runs',
        us: 'Your infrastructure — up to fully on-premise with the models running locally — or a dedicated isolated account',
        them: "OpenAI's cloud (Enterprise adds data controls)",
      },
      {
        k: 'Access & control',
        us: 'Granted, scoped, and revocable per capability',
        them: 'Connectors and uploads you manage yourself',
      },
      {
        k: 'Reliability approach',
        us: 'Purpose-built per use case; deterministic wherever possible, the model only where it adds value — testable, high success rates',
        them: 'General model output — reliability is on you',
      },
      {
        k: 'Destructive actions',
        us: 'Wait for your approval; multi-model guardrails check first',
        them: 'You supervise the assistant / Operator directly',
      },
      {
        k: 'How work ships',
        us: 'Reviewable PRs in your codebase (or approvals in-platform)',
        them: 'Chat outputs and agent actions you apply',
      },
      {
        k: 'Who operates it',
        us: 'We deploy and operate it — you stay in command',
        them: 'You operate it',
      },
      {
        k: 'Human backing',
        us: 'Forward-deployed engineers and a published research team',
        them: 'Self-serve',
      },
    ],
  },
  {
    slug: 'claude',
    name: 'Claude',
    vendor: 'Anthropic',
    tagline:
      'Anthropic gives you the models and the SDK. forward.army is an automated forward-deployed engineer that uses them — Claude among many — to do the work inside your business, governed and shipped.',
    intro:
      'Anthropic ships some of the best models in the world plus the tools to build with them — Claude, Claude Code, the Agent SDK, MCP. That is raw capability you assemble and run yourself. forward.army is the engineer built on top: an automated forward-deployed engineer that uses Claude (and other models) as tools, wires the access, enforces guardrails, and ships the work as PRs.',
    note: 'forward.army is model-agnostic and routinely runs on frontier models like Claude — so this is less "us vs them" than raw models vs an automated engineer that uses them.',
    rows: [
      {
        k: 'Where it runs',
        us: 'Your infrastructure — up to fully on-premise with the models running locally — or a dedicated isolated account',
        them: "Anthropic's cloud, or your cloud via API",
      },
      {
        k: 'Access & control',
        us: 'Granted, scoped, and revocable per capability',
        them: 'You wire up tools, MCP, and permissions yourself',
      },
      {
        k: 'Reliability approach',
        us: 'Purpose-built per use case; deterministic wherever possible, the model only where it adds value — testable, high success rates',
        them: 'Whatever you engineer around the model',
      },
      {
        k: 'Destructive actions',
        us: 'Approval-gated, with multi-model guardrails',
        them: 'Governed by whatever you build around it',
      },
      {
        k: 'How work ships',
        us: 'Reviewable PRs in your codebase (or approvals in-platform)',
        them: 'Claude Code opens edits/PRs you run yourself',
      },
      {
        k: 'Who operates it',
        us: 'We deploy and operate it — you stay in command',
        them: 'You build and operate it',
      },
      {
        k: 'Human backing',
        us: 'Forward-deployed engineers and a published research team',
        them: 'Self-serve (models and SDKs)',
      },
    ],
  },
  {
    slug: 'viktor',
    name: 'Viktor',
    vendor: 'viktor.com',
    tagline:
      'Viktor is a self-serve AI colleague on its own cloud. forward.army is an automated forward-deployed engineer — model-agnostic, running inside your infrastructure, backed by human engineers.',
    intro:
      'Viktor is an AI colleague you install into Slack or Teams to execute tasks end-to-end from its own cloud. forward.army takes the forward-deployed route: an automated engineer that uses many models as tools, runs in your infrastructure (or a dedicated isolated account), stays under scoped access and approvals, and is backed by human forward-deployed engineers.',
    note: null,
    rows: [
      {
        k: 'Where it runs',
        us: 'Your infrastructure — up to fully on-premise with the models running locally — or a dedicated isolated account',
        them: "Viktor's cloud (isolated compute per user)",
      },
      {
        k: 'Access & control',
        us: 'Granted, scoped, and revocable per capability',
        them: 'Integrations you connect yourself',
      },
      {
        k: 'Reliability approach',
        us: 'Purpose-built per use case; deterministic wherever possible, the model only where it adds value — testable, high success rates',
        them: 'Autonomous general-purpose execution',
      },
      {
        k: 'Destructive actions',
        us: 'Wait for your approval; multi-model guardrails check first',
        them: 'Executes end-to-end from a chat request',
      },
      {
        k: 'How work ships',
        us: 'Reviewable PRs in your codebase (or approvals in-platform)',
        them: 'Outputs delivered in chat: docs, dashboards, apps, code',
      },
      {
        k: 'Who operates it',
        us: 'We deploy and operate it — you stay in command',
        them: 'You operate it (self-serve)',
      },
      {
        k: 'Human backing',
        us: 'Forward-deployed engineers and a published research team',
        them: 'Self-serve product',
      },
    ],
  },
];
