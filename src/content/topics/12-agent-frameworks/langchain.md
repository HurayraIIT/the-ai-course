---
{
  "title": "Langchain",
  "module": "agent-frameworks",
  "order": 1,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Langchain",
      "url": "https://www.langchain.com/"
    },
    {
      "type": "video",
      "title": "What is LangChain?",
      "url": "https://www.youtube.com/watch?v=1bUy-1hGZpI"
    },
    {
      "type": "official",
      "title": "LangChain Documentation",
      "url": "https://python.langchain.com/docs/introduction/"
    },
    {
      "type": "opensource",
      "title": "langchain-ai/langchain",
      "url": "https://github.com/langchain-ai/langchain"
    },
    {
      "type": "article",
      "title": "AI Agents with LangChain and LangGraph",
      "url": "https://www.udacity.com/course/ai-agents-with-langchain-and-langgraph--cd13764"
    },
    {
      "type": "video",
      "title": "LangChain Crash Course - Build LLM Apps Fast (YouTube)",
      "url": "https://www.youtube.com/watch?v=nAmC7SoVLd8"
    }
  ]
}
---

LangChain is the original general-purpose LLM application framework: a huge library of interchangeable parts — **model wrappers**, prompt templates, output parsers, retrievers, vector store connectors, and tools — that you compose into pipelines. Its signature abstraction is the **chain**: pipe a prompt into a model into a parser using LCEL's `|` operator and you have a runnable unit with streaming, batching, and async support for free.

Its real value today is breadth and ecosystem gravity. LangChain has integrations for practically every model provider, vector database, and document loader in existence, so it's often the fastest way to swap components without rewriting glue code. It's also the front door to the wider LangChain stack: **LangGraph** for stateful agent orchestration and **LangSmith** for tracing and evals. The honest criticism — layers of abstraction that obscure the underlying API calls — is also why studying it teaches you what frameworks trade away. Modern LangChain pushes serious agent work toward LangGraph and keeps chains for linear flows.

You'll `pip install langchain` plus provider packages like `langchain-openai` or `langchain-anthropic`, then work with three core shapes: a `ChatPromptTemplate`, a chat model, and a parser composed with `|` into a chain you invoke with a dict of inputs. For agents, you'll bind tools to a model with `.bind_tools()` or reach for the prebuilt agent constructors. Typical first project: a **RAG** chain wiring a retriever into a prompt that stuffs context before the question.
