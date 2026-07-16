---
{
  "title": "Eval-driven development",
  "module": "evaluation-and-observability",
  "order": 1,
  "sources": [],
  "resources": [
    {
      "type": "article",
      "title": "Your AI Product Needs Evals",
      "url": "https://hamel.dev/blog/posts/evals/"
    },
    {
      "type": "article",
      "title": "Create strong empirical evaluations",
      "url": "https://docs.anthropic.com/en/docs/build-with-claude/develop-tests"
    }
  ]
}
---

**Eval-driven development** is test-driven development adapted to systems that fail probabilistically: before tuning a prompt or swapping a model, you build the measurement, then let scores — not vibes — drive every change. The foundation is a **golden dataset**: a curated set of inputs with known-good expected outputs, drawn from real usage and hard cases rather than invented examples, reviewed by someone who actually knows the domain. It starts embarrassingly small — twenty to fifty examples beat zero — and grows continuously, because every production failure you diagnose becomes a new case. Run it on every change like a test suite in CI, and the question "did this prompt tweak help?" gets an answer instead of an argument. Without it you're doing what Hamel Husain calls vibe-checking: shipping whatever felt good on the three examples you happened to try.

What makes this discipline non-optional is that LLM systems fail differently from normal software. A **semantic failure** returns a 200 and a fluent, well-formatted answer that is *wrong* — the summary misses the key clause, the agent marks the wrong ticket resolved — so nothing crashes, no alert fires, and only an eval or an unhappy user catches it. Finding these requires **error analysis**: regularly pull a sample of real traces, read them, and label what went wrong — retrieval missed, instruction ignored, hallucinated field, formatting drift — then tally the labels. The tally is the roadmap; teams that skip this reliably burn weeks polishing prompts against failure modes that account for two percent of errors while the retrieval bug causing half of them sits unread in the logs. It's manual, humbling work, and it's consistently the highest-leverage hour an AI engineer spends.

Close the loop and you get a **data flywheel**: production traces feed error analysis, error analysis feeds the golden dataset, the dataset gates improvements, better quality attracts more usage, and more usage surfaces rarer failures to repeat the cycle on. User feedback (thumbs-down buttons, edit-before-send rates, escalations to a human) is flywheel fuel — instrument it from day one. This compounding loop is a real moat: a competitor can call the same API you do, but they can't call your accumulated dataset of labeled real-world failures. In practice the cadence is simple — collect traces, read a sample weekly, label failures, promote the interesting ones to the golden set, and never ship a change the evals didn't bless.
