---
{
  "title": "Perception / User Input",
  "module": "ai-agents",
  "order": 9,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Perception in AI: Understanding Its Types and Importance",
      "url": "https://marktalks.com/perception-in-ai-understanding-its-types-and-importance/"
    },
    {
      "type": "article",
      "title": "What Is AI Agent Perception? - IBM",
      "url": "https://www.ibm.com/think/topics/ai-agent-perception"
    }
  ]
}
---

**Perception** is the entry stage of the agent loop: everything involved in getting information from the outside world into the model's context before any reasoning happens. For most software agents that means the user's message, but it extends to whatever else defines the current state — uploaded files, screenshots, database records, prior conversation history, and events like an incoming webhook. Modern **multimodal** models widen the channel: your agent can perceive images, PDFs, audio transcripts, and rendered web pages, not just text.

This stage matters because an agent can only reason about what it perceives; garbage in produces confident garbage out. Most "the model is dumb" bugs are actually perception bugs — the relevant order record was never fetched, the screenshot was cropped, the user's ambiguous request was passed through unexamined. Deciding what belongs in context is also an engineering trade-off: too little and the agent guesses, too much and you blow the **context window**, degrade attention, and pay for tokens that add nothing.

In practice, perception is the code that runs before your first model call: validating and normalizing user input, assembling a context payload (user profile, retrieved documents, tool results from earlier turns), and converting formats the model can't read into ones it can. You'll build patterns like input schemas for structured triggers, preprocessing pipelines for files, and clarification turns where the agent asks a question instead of acting on an ambiguous request — often the cheapest reliability win available.
