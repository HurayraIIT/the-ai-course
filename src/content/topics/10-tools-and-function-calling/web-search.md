---
{
  "title": "Web Search",
  "module": "tools-and-function-calling",
  "order": 7,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "8 Best AI Search Engines for 2025",
      "url": "https://usefulai.com/tools/ai-search-engines"
    },
    {
      "type": "article",
      "title": "Web Search Agent - PraisonAI Documentation",
      "url": "https://docs.praison.ai/agents/websearch"
    }
  ]
}
---

A **web search tool** lets a model look things up on the live internet instead of relying on frozen training data. When the model hits a question it can't answer from memory — today's prices, a breaking story, docs for a library released last month — it emits a tool call with a search query, your code hits a search backend, and the results (titles, URLs, snippets, sometimes full page content) flow back into the context for the model to read and cite.

This is the most common cure for the two complaints users have about LLMs: **stale knowledge** and **hallucination**. Grounding answers in retrieved pages gives you current information plus verifiable **citations**, which is why search sits at the core of research agents, support bots, and every "ask the internet" product. It's also often the first tool you'll ever wire up, because it delivers obvious value with a single function.

In practice you have two routes. Providers now ship **built-in search tools** — you enable server-side search in the OpenAI, Anthropic, or Gemini APIs and get grounded, cited answers with no infrastructure. Or you define your own tool, something like `web_search` with a `query` string parameter, backed by a search API such as Tavily, Brave, or a SERP service, often paired with a second `fetch_page` tool for reading full articles. Either way you'll think about result count, truncating page content to protect your **context window**, and prompting the model to cite what it used.
