---
{
  "title": "Function Calling",
  "module": "tools-and-function-calling",
  "order": 2,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "A Comprehensive Guide to Function Calling in LLMs",
      "url": "https://thenewstack.io/a-comprehensive-guide-to-function-calling-in-llms/"
    },
    {
      "type": "article",
      "title": "Function Calling with LLMs | Prompt Engineering Guide",
      "url": "https://www.promptingguide.ai/applications/function_calling"
    },
    {
      "type": "video",
      "title": "LLM Function Calling - AI Tools Deep Dive",
      "url": "https://www.youtube.com/watch?v=gMeTK6zzaO4"
    },
    {
      "type": "article",
      "title": "Compare 50+ AI Agent Tools in 2026",
      "url": "https://aimultiple.com/ai-agent-tools"
    }
  ]
}
---

**Function calling** is the mechanism that connects a model's intent to your code's execution. You send the model a list of available functions along with the user's message; instead of replying with prose, the model can respond with a structured request — a function name plus **JSON arguments** — that your application executes. You then feed the result back, and the model continues, either calling another function or producing a final answer. The model decides *what* to call; you control *whether* and *how* it actually runs.

This matters because it solves the two hardest problems of wiring LLMs into real software: getting **structured, parseable output** instead of free text, and giving the model access to live data and real actions. Function calling is the foundation under agents, RAG pipelines that fetch on demand, structured data extraction, and every "AI feature" that touches your database or a third-party API. Understand this loop and most agent frameworks stop looking like magic.

In practice, you'll define functions with JSON Schema parameters, pass them via a `tools` parameter in the SDK, and write a loop: check the response for tool calls, dispatch each one to a real function (`get_weather(city="Tokyo")`), append the result to the message history, and call the model again until it returns plain text. You'll also handle multiple calls in one turn, invalid arguments, and errors. OpenAI, Google, and Anthropic each implement this with different API shapes — covered in the next topics — but the loop is identical.
