---
{
  "title": "LangSmith",
  "module": "evaluation-and-observability",
  "order": 10,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "LangSmith",
      "url": "https://smith.langchain.com/"
    },
    {
      "type": "official",
      "title": "LangSmith Documentation",
      "url": "https://docs.smith.langchain.com/"
    },
    {
      "type": "official",
      "title": "Harden your application with LangSmith Evaluation",
      "url": "https://www.langchain.com/evaluation"
    },
    {
      "type": "article",
      "title": "What is LangSmith and Why should I care as a developer?",
      "url": "https://medium.com/around-the-prompt/what-is-langsmith-and-why-should-i-care-as-a-developer-e5921deb54b5"
    }
  ]
}
---

**LangSmith** is LangChain's platform for tracing, evaluating, and monitoring LLM applications. It captures every run of your chain or agent as a hierarchical **trace** — each prompt, model response, retriever call, and tool invocation with its inputs, outputs, latency, and token cost — and pairs that with an evaluation suite: datasets of examples, LLM-as-judge and custom evaluators, regression comparisons between versions, and a **prompt playground** for iterating on any captured run.

Its standout trait among observability platforms is depth of integration with the LangChain ecosystem. If you build with LangChain or **LangGraph**, tracing is nearly free — set `LANGSMITH_TRACING=true` and an API key, and every step of a complex agent graph appears fully structured, no instrumentation code required. That's the crispest reason to choose it over Langfuse (open-source, framework-neutral) or Helicone (proxy-based request logging): LangSmith understands your framework's internals natively. It works without LangChain too, via its SDK and OpenTelemetry support, and is a hosted SaaS with self-hosting reserved for enterprise plans.

In practice, you'll enable tracing with environment variables, use the `@traceable` decorator or `wrap_openai` for non-LangChain code, and browse traces to debug why an agent looped or a retrieval missed. Then you'll curate failing traces into **datasets**, write evaluators, run `evaluate()` against candidate prompts or models, and compare experiments side by side before shipping. Production monitors and alerts close the loop.
