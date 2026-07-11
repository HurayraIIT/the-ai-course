---
{
  "title": "OpenAI Assistant API",
  "module": "working-with-apis",
  "order": 2,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Documentation – Assistants API Overview",
      "url": "https://platform.openai.com/docs/assistants/overview"
    },
    {
      "type": "official",
      "title": "OpenAI Blog – Introducing the Assistants API",
      "url": "https://openai.com/blog/assistants-api"
    },
    {
      "type": "official",
      "title": "OpenAI Cookbook – Assistants API Example",
      "url": "https://github.com/openai/openai-cookbook/blob/main/examples/Assistants_API_overview_python.ipynb"
    },
    {
      "type": "official",
      "title": "OpenAI API Reference – Assistants Endpoints",
      "url": "https://platform.openai.com/docs/api-reference/assistants"
    }
  ]
}
---

The **Assistants API** was OpenAI's first attempt at a fully managed, stateful agent platform. Instead of a single request-response call, you create a persistent **assistant** (a named configuration with instructions, a model, and tools like code interpreter and file search), open a **thread** to hold a conversation, add messages to it, and then start a **run** that lets the model work through the thread — calling tools and appending its replies — while OpenAI stores everything server-side.

It matters for two reasons. First, plenty of production code still uses it, so you will encounter assistants, threads, and runs in real codebases and need to read them fluently. Second, it introduced the object model — persistent configuration, server-held conversation state, managed tool execution — that the **Responses API** later absorbed and simplified. OpenAI has deprecated the Assistants API in favor of Responses, so understanding it is largely about maintaining existing systems and planning migrations, not starting new ones.

In practice you call `client.beta.assistants.create()` with `instructions` and `tools`, create a thread, post user messages with `threads.messages.create()`, and kick off `threads.runs.create()`. Because runs are asynchronous, you poll their `status` (or stream events) until they reach `completed` or pause at `requires_action`, where you execute the requested function calls and submit the outputs back so the run can finish.
