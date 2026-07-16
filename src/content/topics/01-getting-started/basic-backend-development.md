---
{
  "title": "Basic Backend Development",
  "module": "getting-started",
  "order": 4,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Introduction to the server-side",
      "url": "https://developer.mozilla.org/en-US/docs/Learn/Server-side/First_steps/Introduction"
    },
    {
      "type": "article",
      "title": "What is a REST API? - Red Hat",
      "url": "https://www.redhat.com/en/topics/api/what-is-a-rest-api"
    },
    {
      "type": "article",
      "title": "What is a Database? - Oracle",
      "url": "https://www.oracle.com/database/what-is-database/"
    }
  ]
}
---

**Backend development** is the server-side half of software: the code that runs on a machine you control, handles requests, talks to a **database**, enforces business logic, and returns responses to clients. A typical backend exposes **HTTP endpoints**, authenticates users, reads and writes persistent data, and calls other services. Whether you write it in Node.js, Python, Go, or PHP, the shape is the same: request in, logic and data access in the middle, response out.

This is a prerequisite, not a side note, because AI features live in backends. You cannot ship a production LLM feature from a frontend alone — your **API keys** must stay server-side, and everything interesting happens between the user's request and the model's response: fetching context from your database, assembling the prompt, calling the model, validating the output, logging usage. An AI engineer without backend skills can prompt a playground; an AI engineer with them can ship a product.

In practice, you will stand up a small server — Express, FastAPI, or similar — that receives a user message, pulls relevant records from a database, calls a model API with `fetch` or an SDK, and streams the reply back. You will store conversation history, cache expensive calls, and handle timeouts and rate limits. If routes, JSON, environment variables, and database queries already feel routine, skim this topic; if not, invest here first, because every later module assumes it.
