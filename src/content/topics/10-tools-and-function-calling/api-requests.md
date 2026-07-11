---
{
  "title": "API Requests",
  "module": "tools-and-function-calling",
  "order": 10,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Introduction to APIs - MDN Web Docs",
      "url": "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Client-side_APIs/Introduction"
    },
    {
      "type": "article",
      "title": "How APIs Power AI Agents: A Comprehensive Guide",
      "url": "https://blog.treblle.com/api-guide-for-ai-agents/"
    }
  ]
}
---

An **API request tool** lets an agent talk to the rest of the software world: fetch a customer record from your CRM, check the weather, create a Stripe refund, or query an internal microservice. The model emits a tool call with structured arguments, your code performs the HTTP request, and the response body flows back into context as an observation. It's the general-purpose bridge between "model that can reason" and "systems that hold real data and do real things."

This category matters because almost every useful agent action is ultimately an API call — most other tool types in this module are specializations of it. The key design decision is **granularity**. A generic `http_request(method, url, body)` tool is maximally flexible but easy to misuse; purpose-built wrappers like `get_order_status(order_id)` are safer and dramatically easier for the model to call correctly. Production agents almost always favor narrow, well-named tools with **typed parameters**, keeping credentials in your code — never in the prompt — and the model unaware that HTTP is even involved.

In practice you'll write a thin function around each endpoint, describe it in a **JSON Schema** tool definition, and handle the unglamorous parts: auth headers, timeouts, retries with backoff, and mapping errors to messages the model can act on ("rate limited, retry in 30s"). Trim verbose JSON responses to the fields that matter before returning them — a 200 KB payload will flood your context window. **MCP** servers standardize exactly this wrapping so tools become reusable across agents.
