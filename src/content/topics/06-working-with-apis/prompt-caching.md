---
{
  "title": "Prompt Caching",
  "module": "working-with-apis",
  "order": 18,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Prompt Caching?",
      "url": "https://www.ibm.com/think/topics/prompt-caching"
    },
    {
      "type": "article",
      "title": "Prompt caching: 10x cheaper LLM tokens, but how?",
      "url": "https://ngrok.com/blog/prompt-caching"
    },
    {
      "type": "video",
      "title": "What is Prompt Caching? Optimize LLM Latency with AI Transformers",
      "url": "https://www.youtube.com/watch?v=u57EnkQaUTY"
    }
  ]
}
---

**Prompt caching** lets the provider reuse the computation for the unchanging prefix of your prompt across requests. The first time you send a long system prompt, tool definitions, or a large document, the model processes it in full and the provider stores the internal state; subsequent requests that begin with the *exact same* prefix skip that work, and those tokens are billed at a steep discount — cached input runs at roughly a tenth of the normal rate on major APIs — while also returning noticeably faster.

The economics are hard to ignore once you look at real traffic. Most production requests are overwhelmingly repeated prefix: an agent resends its system prompt and tool definitions on every turn, a chat app resends the whole conversation, a RAG pipeline resends the same document for follow-up questions. Without caching you pay full price to reprocess identical tokens hundreds of times; with it, long-context patterns that looked unaffordable — shipping an entire manual in every request — become routine. It also cuts **time-to-first-token**, which users feel directly.

In practice, the rule is *stable content first, variable content last*, because caching matches from the start of the prompt and any change breaks everything after it. On Anthropic you opt in explicitly with `cache_control: {"type": "ephemeral"}` breakpoints; OpenAI caches long prompt prefixes automatically. Caches expire after minutes of inactivity, so steady traffic benefits most — and watch the usage fields (`cache_read_input_tokens`, `cached_tokens`) to confirm your hits are landing.
