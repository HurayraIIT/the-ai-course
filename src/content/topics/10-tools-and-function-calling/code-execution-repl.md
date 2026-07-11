---
{
  "title": "Code Execution / REPL",
  "module": "tools-and-function-calling",
  "order": 8,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is a REPL?",
      "url": "https://docs.replit.com/getting-started/intro-replit"
    },
    {
      "type": "article",
      "title": "Code Execution AI Agent",
      "url": "https://docs.praison.ai/features/codeagent"
    },
    {
      "type": "article",
      "title": "Building an AI Agent's Code Execution Environment",
      "url": "https://murraycole.com/posts/ai-code-execution-environment"
    },
    {
      "type": "article",
      "title": "Python Code Tool",
      "url": "https://python.langchain.com/docs/integrations/tools/python/"
    }
  ]
}
---

A **code execution tool** gives the model a live programming environment — usually a Python **REPL** or a shell — where code it writes actually runs and the output comes back as a tool result. Instead of predicting what `sum(x**2 for x in data)` would return, the model writes the code, your sandbox executes it, and the real answer (or the real traceback) lands in the conversation.

This one tool converts an LLM's weakest area into a strength. Models are unreliable at arithmetic and precise data manipulation, but excellent at *writing code* that does those things perfectly — so execution turns shaky mental math into exact computation. It unlocks data analysis over uploaded CSVs, chart generation, file format conversion, and self-correction: an agent that can run its own code sees the error and fixes it, which is the feedback loop every coding agent depends on. The catch is that you're running model-generated code, so **sandboxing** — containers or microVMs with resource limits, restricted networking, and no host secrets — is non-negotiable.

In practice you'll either enable a provider's hosted **code interpreter** (OpenAI, Anthropic, and Gemini all offer server-side sandboxes) or define your own tool, `execute_python` with a single `code` string parameter, backed by Docker or a sandbox service like E2B. You'll capture stdout, stderr, and generated files, enforce timeouts, and persist interpreter state across calls so the model can work iteratively, one cell at a time.
