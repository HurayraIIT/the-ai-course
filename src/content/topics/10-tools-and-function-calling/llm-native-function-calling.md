---
{
  "title": "LLM Native \"Function Calling\"",
  "module": "tools-and-function-calling",
  "order": 3,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Function Calling with Open-Source LLMs",
      "url": "https://medium.com/@rushing_andrei/function-calling-with-open-source-llms-594aa5b3a304"
    }
  ]
}
---

**Native function calling** means the model itself has been trained to emit tool calls as a first-class output format, and the provider's API exposes that as structured data. This is different from the old workaround of prompting a model to "respond only in JSON" and parsing the text yourself. With native support, tool definitions go in through a dedicated API parameter, the model's training makes it reliable at choosing tools and filling arguments, and the response comes back as a typed object — not a string you hope is valid JSON.

The distinction matters because reliability is the whole game in production. Prompt-based approaches break in creative ways: markdown fences around JSON, trailing commas, invented parameters, refusals mid-schema. Natively trained models are dramatically better at emitting well-formed calls, many providers offer **strict schema enforcement** that guarantees arguments validate, and features like **parallel tool calls** and forced tool choice only exist at the API level. Knowing what's native also tells you what to expect from **open-source models**, where tool-call support varies by model family and depends on chat templates your inference stack must handle.

In practice, this shapes real decisions: you'll check whether a model supports native tool calling before building on it, pass schemas through `tools` parameters instead of stuffing them into the system prompt, and rely on the SDK's parsed output rather than regexes. When you do run open models — through vLLM, Ollama, or similar — you'll verify their tool-calling format and test reliability before trusting them in an agent loop.
