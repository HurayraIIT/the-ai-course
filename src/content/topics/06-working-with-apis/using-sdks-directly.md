---
{
  "title": "Using SDKs Directly",
  "module": "working-with-apis",
  "order": 0,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Langchain Text Splitter Package",
      "url": "https://www.npmjs.com/package/@langchain/textsplitters"
    },
    {
      "type": "official",
      "title": "OpenAI Embedding API",
      "url": "https://platform.openai.com/docs/guides/embeddings"
    }
  ]
}
---

Before you reach for a heavyweight framework, you should know how to talk to AI providers with nothing but their **official SDKs**. Every major provider ships a thin client library — `openai`, `@anthropic-ai/sdk`, `@google/genai` — that wraps its HTTP API with typed methods, authentication, retries, and streaming helpers. Working at this level means you see exactly what goes over the wire: the model name, the messages, the parameters, and the raw response coming back.

This matters because abstraction layers hide the details you will eventually need to debug. When a framework mis-formats a tool call or silently swallows a rate-limit error, developers who only know the framework are stuck. If you understand the underlying SDK calls, you can read provider docs directly, reproduce problems with a ten-line script, and make informed decisions about **cost**, **latency**, and error handling. Direct SDK usage is also usually less code than the framework equivalent for simple pipelines.

In practice, you will install the provider package, load an **API key** from an environment variable, and compose small building blocks yourself: an embeddings call for search, a chat call for generation, a text splitter for chunking documents, and a vector store like Supabase's `pgvector` for retrieval. You wire these together with plain functions, which keeps the whole pipeline inspectable and easy to test.
