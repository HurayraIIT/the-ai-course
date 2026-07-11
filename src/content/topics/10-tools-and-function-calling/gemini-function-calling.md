---
{
  "title": "Gemini Function Calling",
  "module": "tools-and-function-calling",
  "order": 5,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Function Calling with the Gemini API",
      "url": "https://ai.google.dev/gemini-api/docs/function-calling"
    },
    {
      "type": "article",
      "title": "Understanding Function Calling in Gemini",
      "url": "https://medium.com/google-cloud/understanding-function-calling-in-gemini-3097937f1905"
    }
  ]
}
---

Google's **Gemini API** implements function calling through **function declarations**: you describe each function with a name, description, and an **OpenAPI-flavored schema** for its parameters, then bundle declarations into a `tools` list on the request. When Gemini wants to act, it returns a `functionCall` part containing the function name and arguments — delivered as a structured object, not a JSON string — and you reply with a `functionResponse` part carrying your result so the model can finish its answer.

If you're building on Google's stack — the Gemini API directly or through **Vertex AI** — this is the tool interface you'll live in, and its differences from OpenAI's shape are exactly what trips up developers porting code. Gemini's distinctive control is the function calling **mode**: `AUTO` lets the model decide, `ANY` forces it to call some function (optionally restricted to an allowed list), and `NONE` disables calling — a clean lever for building predictable pipelines. Gemini also supports parallel calls and **compositional calling**, chaining multiple functions across turns to satisfy one request.

In practice you'll use the `google-genai` SDK, where the fast path is passing plain Python functions as tools — the SDK generates declarations from your signatures and docstrings and can run the whole call-execute-respond loop automatically. For finer control you'll declare schemas explicitly, inspect `function_call` parts yourself, and manage the conversation history manually, the same agent loop pattern you'd use with any provider.
