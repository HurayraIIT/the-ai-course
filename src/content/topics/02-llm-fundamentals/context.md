---
{
  "title": "Context",
  "module": "llm-fundamentals",
  "order": 9,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is a Context Window in AI?",
      "url": "https://www.ibm.com/think/topics/context-window"
    },
    {
      "type": "article",
      "title": "What Is an AI Context Window?",
      "url": "https://www.coursera.org/articles/context-window"
    },
    {
      "type": "article",
      "title": "Cutting Through the Noise: Smarter Context Management for LLM-Powered Agents",
      "url": "https://blog.jetbrains.com/research/2025/12/efficient-context-management/"
    },
    {
      "type": "video",
      "title": "What is a Context Window? Unlocking LLM Secrets",
      "url": "https://www.youtube.com/watch?v=-QVoIxEpFkM"
    }
  ]
}
---

**Context** is everything the model can see when generating a response: the system prompt, the conversation history, documents you've pasted in, tool definitions and their results — the entire input sequence. It's the model's working memory, and it's the *only* memory it has. An LLM is stateless between API calls; it doesn't "remember" your last request unless you send that history again. What isn't in the context, for the model, does not exist.

This statelessness is the single most common misconception that trips up developers building on LLMs. A "conversation" is an illusion your application maintains by resending prior messages on every call. It also means context is your main lever for controlling behavior: the model learned general capabilities during training, but everything specific to *your* app — the user's data, your business rules, retrieved documents — must be placed into context at request time. Deciding what goes in, in what order, and what gets left out is increasingly called **context engineering**, and it's a core skill for building agents that stay coherent over long sessions.

Practically, you'll manage context in code every day: maintaining the `messages` array you send to the API, injecting retrieved chunks in **RAG** pipelines, appending tool results in agent loops, and summarizing or pruning old turns as conversations grow. The next topic covers the hard limit on all of this — the context window.
