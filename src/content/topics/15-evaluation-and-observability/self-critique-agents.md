---
{
  "title": "Self-critique Agents",
  "module": "evaluation-and-observability",
  "order": 6,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Reflection Agents",
      "url": "https://blog.langchain.com/reflection-agents/"
    },
    {
      "type": "article",
      "title": "How Do Agents Learn from Their Own Mistakes? The Role of Reflection in AI",
      "url": "https://huggingface.co/blog/Kseniase/reflection"
    }
  ]
}
---

A **self-critique agent** applies evaluation *inside* the agent loop instead of after it. The pattern, often called **reflection**, splits work into two roles: a generator produces a draft answer, plan, or piece of code, and a critic — usually the same model with a different prompt, sometimes a separate agent — reviews it against explicit criteria and produces feedback. The generator then revises, and the loop repeats until the critic approves or an iteration budget runs out.

This matters because a model's first attempt is often its worst, and asking it to review work is a genuinely different task than asking it to produce work. Critique lets the system catch its own hallucinations, logic gaps, and unmet requirements before the user ever sees them, which is why reflection loops reliably lift quality on coding, writing, and planning tasks. The trade-off is real: every critique-revise cycle costs extra tokens and latency, so it pays off most on high-stakes outputs, not every chat turn.

In practice, you'll implement this as a two-node loop — `generate` then `critique` — in an orchestration framework or plain code. Give the critic a concrete rubric ("check every claim is supported; check the code compiles") rather than "make it better," and ground it in external signals where possible: test results, linter output, or retrieved documents make critiques far sharper than pure self-reflection. Cap iterations at two or three, log each draft and critique to your traces, and measure whether the loop actually improves your eval scores enough to justify the added cost.
