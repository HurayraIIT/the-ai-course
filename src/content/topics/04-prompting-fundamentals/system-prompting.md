---
{
  "title": "System Prompting",
  "module": "prompting-fundamentals",
  "order": 8,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "User prompts vs. system prompts: What’s the difference?",
      "url": "https://www.regie.ai/blog/user-prompts-vs-system-prompts"
    },
    {
      "type": "video",
      "title": "System Prompt Fundamentals",
      "url": "https://www.youtube.com/watch?v=RMR0Y8esSmE"
    },
    {
      "type": "official",
      "title": "Prompt Engineering Overview - Anthropic",
      "url": "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview"
    },
    {
      "type": "article",
      "title": "Instructions - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/instructions"
    }
  ]
}
---

A **system prompt** is a special instruction layer that sits above the conversation: it tells the model what it is, what job it's doing, and what rules it must follow, before any user message arrives. Every major API separates it from user input — a `system` parameter or a `system`/`developer` role in the `messages` array — and models are specifically trained to give it more weight and treat it as harder to override than anything a user types.

For anyone building AI products, the system prompt is where your application actually lives. The user supplies the variable input; you supply the invariant behavior — scope ("you help with billing questions only"), policies ("never quote prices not present in the context"), tone, output format, and tool-use rules. This separation is also your first security boundary: instructions in the system slot resist casual **prompt injection** from user messages far better than instructions mixed into user text.

In practice, you'll write one substantial system prompt per feature and keep it in version control like source code. Structure it in labeled sections — identity, task, rules, format, examples — and make it specific: `You are the support assistant for Acme. Answer only from the provided context. If unsure, respond exactly: "Let me connect you with a human."` Combined with role prompting and contextual prompting, covered next, it forms the standard three-layer architecture of production prompts.
