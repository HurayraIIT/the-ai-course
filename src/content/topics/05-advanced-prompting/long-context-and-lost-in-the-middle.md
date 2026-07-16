---
{
  "title": "Long context and lost in the middle",
  "module": "advanced-prompting",
  "order": 8,
  "sources": ["new"],
  "resources": [
    {
      "type": "article",
      "title": "Context Rot: How Increasing Input Tokens Impacts LLM Performance",
      "url": "https://research.trychroma.com/context-rot"
    },
    {
      "type": "article",
      "title": "Long context prompting tips",
      "url": "https://docs.anthropic.com/en/docs/build-with-claude/prompt-engineering/long-context-tips"
    }
  ]
}
---

**Long context** models advertise windows of 200K, one million, or more tokens — enough to hold entire codebases or book-length documents in a single prompt. The catch is that a big window is capacity, not comprehension: models don't attend to every token equally. The best-documented failure is **lost in the middle** — in controlled tests, retrieval accuracy is highest when the relevant fact sits at the very beginning or very end of the context and drops sharply when it's buried in the middle. A model can ace a **needle-in-a-haystack** benchmark (find one planted sentence in a huge document) and still degrade on real tasks that require reasoning over many scattered pieces at once.

This is the mechanism behind **context rot**, which you met in the context engineering lesson: as the window fills with tool outputs, history, and pasted documents, quality decays long before you hit the hard token limit — and you pay more per request for the privilege. It also reframes a common architecture question: "the context window is huge now, do I still need RAG?" Usually yes. Stuffing a million tokens into every request is slow, expensive, and mid-context recall is unreliable; retrieval that puts only the relevant few thousand tokens into the prompt beats brute force on all three axes. Long context shines where selection is impossible — whole-document reasoning, long agent trajectories — not as a substitute for it.

In practice, exploit the attention curve instead of fighting it: put instructions and the question at the beginning or end, never the middle, and place long documents above the instructions rather than below. Structure big contexts with XML-style tags so the model can navigate them, and ask it to quote the relevant passages before answering — grounding recall before reasoning measurably helps. Above all, test at realistic context lengths: a prompt that works with a 2K-token test fixture can quietly fall apart at 100K, and you'll only know if your **evals** include long-context cases.
