---
{
  "title": "What are Tools?",
  "module": "tools-and-function-calling",
  "order": 0,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Compare 50+ AI Agent Tools in 2025 - AIMultiple",
      "url": "https://research.aimultiple.com/ai-agent-tools/"
    }
  ]
}
---

A language model on its own can only do one thing: generate text. **Tools** are how you give it hands. A tool is a capability you expose to the model — searching the web, running a query, sending a message, calling an API — described in a way the model can understand and request. The model never executes anything itself; it says "I want to call this tool with these arguments," your code runs the actual operation, and the result goes back into the conversation.

This is the single idea that turns a chatbot into an **agent**. Without tools, an LLM is limited to whatever was in its training data and whatever you paste into the prompt. With tools, it can fetch live data, act on external systems, and verify its own work. Nearly everything interesting being built with AI right now — coding agents, research assistants, customer-support automation — is a loop of the model reasoning, picking a tool, and reading the result.

In practice, you'll define each tool with a **name**, a **description**, and a **JSON Schema** for its parameters, pass that list into an API call, and write the dispatch code that maps a tool request like `get_weather({"city": "Dhaka"})` to a real function in your codebase. The rest of this module breaks down how to define tools well, how the major providers implement function calling, and which categories of tools show up in almost every agent.
