---
{
  "title": "User Profile Storage",
  "module": "agent-memory",
  "order": 5,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Storage Technology Explained: AI and Data Storage",
      "url": "https://www.computerweekly.com/feature/Storage-technology-explained-AI-and-the-data-storage-it-needs"
    },
    {
      "type": "article",
      "title": "The Architect's Guide to Storage for AI - The New Stack",
      "url": "https://thenewstack.io/the-architects-guide-to-storage-for-ai/"
    }
  ]
}
---

**User profile storage** keeps a structured record of durable facts about each user — name, role, timezone, preferences, constraints like "vegetarian" or "writes Python, deploys on Vercel" — separate from conversation history. Where episodic memory answers "what happened in past sessions," a profile answers "who is this person," maintained as a compact document keyed by `user_id` that gets injected into the prompt at the start of every session.

This is the cheapest, highest-leverage form of long-term memory. Most of what makes an assistant feel personal is a handful of stable facts, and a profile guarantees they're *always* in context — no embedding search that might miss, no hoping the right memory gets retrieved. It's also small enough (a few hundred tokens) to include wholesale, and structured enough to audit: when the user asks "what do you know about me," you can show them, edit it, or delete it, which matters for trust and for privacy obligations around **PII**.

In practice a profile is a JSON document or a row in Postgres/Redis with a defined schema: `preferences`, `facts`, `communication_style`. Updates flow two ways — explicitly, via a `update_user_profile(field, value)` tool the agent calls when the user states something durable ("I've switched teams"), or implicitly, via a post-session extraction pass that proposes changes. Keep it bounded: cap its size, prefer updating fields over appending, store facts not transcripts, and let newer information overwrite older. Frameworks like LangGraph's memory store and Mem0 ship this pattern ready-made.
