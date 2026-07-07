/**
 * Comparison content. Each entry powers /compare/<slug>.
 * Framing is honest: forward.army is a governed OPERATOR that deploys agents
 * into your systems, vs. capable tools/platforms you self-operate. No false or
 * disparaging claims — competitor cells state their real, public model.
 */
export const comparisons = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    tagline:
      'ChatGPT is a tool you operate. forward.army is an operator that runs agents inside your systems — under your command.',
    intro:
      'ChatGPT — with Operator, custom GPTs, and the API — is a powerful general assistant you point at problems and drive yourself. forward.army is a forward-deployed operator: we deploy governed agents into your business, run them under scoped access, and ship the work — so adoption never hinges on your team learning to prompt.',
    note: null,
    rows: [
      {
        k: 'Where it runs',
        us: 'Your infrastructure, or a dedicated isolated account — your data can stay in your walls',
        them: "OpenAI's cloud (Enterprise adds data controls)",
      },
      {
        k: 'Access & control',
        us: 'Granted, scoped, and revocable per capability',
        them: 'Connectors and uploads you manage yourself',
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
      'Anthropic gives you frontier models and the SDK to build agents. forward.army deploys, governs, and operates them inside your business.',
    intro:
      'Anthropic ships some of the best models in the world plus the tools to build with them — Claude, Claude Code, the Agent SDK, MCP. That is raw capability you assemble and run yourself. forward.army is the operating layer on top: we forward-deploy governed agents, wire the access, enforce guardrails, and ship the work as PRs.',
    note: 'forward.army is model-agnostic and often runs on frontier models like Claude — this is less "us vs them" than raw capability vs a governed operator built around it.',
    rows: [
      {
        k: 'Where it runs',
        us: 'Your infrastructure, or a dedicated isolated account',
        them: "Anthropic's cloud, or your cloud via API",
      },
      {
        k: 'Access & control',
        us: 'Granted, scoped, and revocable per capability',
        them: 'You wire up tools, MCP, and permissions yourself',
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
      'Viktor is a self-serve AI colleague in Slack. forward.army is a forward-deployed operator that runs governed agents inside your infrastructure, backed by human engineers.',
    intro:
      'Viktor is an AI colleague you install into Slack or Teams to execute tasks end-to-end from its own cloud. forward.army takes the forward-deployed route: governed agents that run in your infrastructure (or a dedicated isolated account), held to scoped access and approvals, and backed by human forward-deployed engineers.',
    note: null,
    rows: [
      {
        k: 'Where it runs',
        us: 'Your infrastructure — your data can stay in your walls — or a dedicated isolated account',
        them: "Viktor's cloud (isolated compute per user)",
      },
      {
        k: 'Access & control',
        us: 'Granted, scoped, and revocable per capability',
        them: 'Integrations you connect yourself',
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
