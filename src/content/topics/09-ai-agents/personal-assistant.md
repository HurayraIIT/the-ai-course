---
{
  "title": "Personal assistant",
  "module": "ai-agents",
  "order": 3,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "A Complete Guide on AI-powered Personal Assistants",
      "url": "https://medium.com/@alexander_clifford/a-complete-guide-on-ai-powered-personal-assistants-with-examples-2f5cd894d566"
    },
    {
      "type": "article",
      "title": "9 Best AI Personal Assistants for Work, Chat and Home",
      "url": "https://saner.ai/best-ai-personal-assistants/"
    }
  ]
}
---

A **personal assistant agent** is an agent whose job is managing one person's digital life: reading and drafting email, scheduling meetings, tracking tasks, summarizing documents, and answering questions grounded in the user's own data. Unlike a general chatbot, it holds **long-term memory** about its user — preferences, contacts, recurring commitments — and acts through integrations with calendars, inboxes, and messaging apps rather than just talking.

This is worth studying because it concentrates nearly every hard problem in agent engineering into one product. You need reliable tool calling across third-party APIs (Google Calendar, Gmail, Slack), persistent memory that survives sessions, and — most critically — **permissioning**: an assistant that can send email on your behalf can also embarrass you. The patterns you learn here, like confirm-before-irreversible-action and scoped OAuth tokens, transfer directly to any agent that touches user accounts.

In practice, you'll build one as an agent loop wired to a handful of tools: `search_email`, `create_event`, `send_message`, plus a memory store (often a vector database keyed to the user) that gets queried before each reasoning step. You'll separate read actions, which run freely, from write actions, which either require user confirmation or run in a draft-first mode. Start with a single integration — a calendar bot that proposes meeting times — and layer on memory and additional tools once the core loop behaves predictably.
