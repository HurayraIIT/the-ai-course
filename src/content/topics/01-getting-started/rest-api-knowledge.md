---
{
  "title": "REST API Knowledge",
  "module": "getting-started",
  "order": 6,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is RESTful API? - RESTful API Explained - AWS",
      "url": "https://aws.amazon.com/what-is/restful-api/"
    },
    {
      "type": "article",
      "title": "What Is a REST API? Examples, Uses & Challenges",
      "url": "https://blog.postman.com/rest-api-examples/"
    }
  ]
}
---

A **REST API** is a convention for exposing functionality over HTTP: resources live at URLs, you act on them with verbs like `GET`, `POST`, `PUT`, and `DELETE`, and data travels as **JSON**. Each request is stateless — it carries everything the server needs, typically including an **authentication** token in a header — and the server answers with a status code (`200`, `401`, `429`, `500`) that tells you what happened.

This matters because the entire AI ecosystem speaks REST. Every major model provider — OpenAI, Anthropic, Google — exposes its models as REST endpoints: you `POST` a JSON body containing your messages and parameters, authenticate with a bearer token or API key header, and parse a JSON response (or a **streamed** one) containing the generated text. Even the official SDKs are thin wrappers around these calls. When something breaks — a `429` rate limit, a `400` malformed request, a truncated stream — you debug it at the HTTP layer. Beyond consuming APIs, you will also design them: your product's AI features become REST endpoints your frontend calls, and tools you hand to agents are frequently REST APIs under the hood.

Practically, you will exercise this constantly: crafting requests with `curl` or Postman, reading provider API references, handling errors with retries and **exponential backoff**, and building endpoints that proxy model calls securely. Master the request-response cycle here, and every provider integration in this course becomes a variation on one familiar pattern.
