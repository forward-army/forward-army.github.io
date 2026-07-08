/**
 * Comparison content. Each entry powers /compare/<slug>.
 * Framing is honest: forward.army is a governed OPERATOR that deploys agents
 * into your systems, vs. capable tools/platforms you self-operate. No false or
 * disparaging claims — competitor cells state their real, public model.
 */
// Shown on every comparison page. forward.army isn't a rival model — it uses them.
export const positioning =
  'forward.army is the platform for building automated forward-deployed agents — and they use ChatGPT, Claude, and many other models as tools. So this is not a contest of models. It is the operating layer around them: your infrastructure, scoped access, guardrails, PRs, a human in command — plus our engineers to help you build.';

export const comparisons = [
  {
    slug: 'chatgpt',
    name: 'ChatGPT',
    vendor: 'OpenAI',
    tagline:
      'ChatGPT is a tool you operate. forward.army is the platform for building automated forward-deployed agents that use ChatGPT — and other models — as tools, run the whole job inside your systems, and stay under your command.',
    intro:
      'ChatGPT — with Operator, custom GPTs, and the API — is a powerful general assistant you point at problems and drive yourself. forward.army is the platform for the engineer, not just the tool: you build automated forward-deployed agents that use models like GPT under the hood, deploy them into your business under scoped access, and ship the work — with our engineers to help, so adoption never hinges on your team learning to prompt.',
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
        us: 'You run it on our platform — our engineers help you build, deploy, and operate; you stay in command',
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
      'Anthropic gives you the models and the SDK. forward.army is the platform for building automated forward-deployed agents that use them — Claude among many — to do the work inside your business, governed and shipped.',
    intro:
      'Anthropic ships some of the best models in the world plus the tools to build with them — Claude, Claude Code, the Agent SDK, MCP. That is raw capability you assemble and run yourself. forward.army is the platform built on top: you build automated forward-deployed agents that use Claude (and other models) as tools, wire the access, enforce guardrails, and ship the work as PRs — with our engineers to help.',
    note: 'forward.army is model-agnostic and the agents routinely run on frontier models like Claude — so this is less "us vs them" than raw models vs a platform for building agents that use them.',
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
        us: 'You run it on our platform — our engineers help you build, deploy, and operate; you stay in command',
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
      'Viktor is one general-purpose AI colleague on its own cloud. forward.army is the platform a level above it — you build a purpose-built agent for each of your use cases and run them inside your infrastructure, with human engineers to help.',
    intro:
      'Viktor is an AI colleague you install into Slack or Teams to execute tasks end-to-end from its own cloud. forward.army is not a competing colleague — it is the platform (with an operating team to help) for building the right agent for each job: purpose-built per use case, deterministic where it counts, run in your infrastructure (or a dedicated isolated account), and held to scoped access and approvals.',
    note: 'In fact, you could build a Viktor-style colleague on forward.army — for one of your use cases, on your own infrastructure, engineered and testable rather than left entirely to a model. Viktor is one product; forward.army is the platform behind purpose-built agents.',
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
        us: 'You run it on our platform — our engineers help you build, deploy, and operate; you stay in command',
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
