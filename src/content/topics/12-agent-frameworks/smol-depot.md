---
{
  "title": "Smol Depot",
  "module": "agent-frameworks",
  "order": 9,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "smol.ai - Continuous Fine-tuning Platform for AI Engineers",
      "url": "https://smol.candycode.dev/"
    },
    {
      "type": "article",
      "title": "5-min Smol AI Tutorial",
      "url": "https://www.ai-jason.com/learning-ai/smol-ai-tutorial"
    },
    {
      "type": "video",
      "title": "Smol AI Full Beginner Course",
      "url": "https://www.youtube.com/watch?v=d7qFVrpLh34"
    }
  ]
}
---

Smol Depot comes out of the **smol.ai** ecosystem — the "smol" philosophy that made its name with smol developer, the tiny "junior developer" agent that turns a plain-English spec into a working codebase. The idea across the smol family is the same: agent scaffolds small enough to read in one sitting, meant to be copied into your project and modified, rather than imported as a black-box framework.

That makes this the counterweight to everything else in this module. LangGraph, CrewAI, and AutoGen give you abstractions to learn; the smol approach gives you a few hundred lines of prompt-plus-loop code to own. It's the practical descendant of the manual implementation lesson: instead of writing your agent from a blank file, you start from a minimal, working template — a depot of small agent starting points — and evolve it. The same minimalist current runs through Hugging Face's `smolagents` library, which keeps the entire agent loop in a compact, hackable core. When your task is well-scoped (scaffold an app, transform files, run a research loop), this style often ships faster and debugs easier than a framework.

In practice, you'll clone or copy a template rather than `pip install` a heavy dependency, drop in your model API key, and read the whole thing before running it — that's the point. You'll edit the **system prompt** directly, adjust the loop's tools and stop conditions, and treat prompts as source code under version control. Keep what works, delete the rest.
