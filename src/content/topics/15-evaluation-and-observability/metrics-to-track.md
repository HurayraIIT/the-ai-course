---
{
  "title": "Metrics to Track",
  "module": "evaluation-and-observability",
  "order": 0,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Robustness Testing for AI",
      "url": "https://mitibmwatsonailab.mit.edu/category/robustness/"
    },
    {
      "type": "article",
      "title": "Complete Guide to Machine Learning Evaluation Metrics",
      "url": "https://medium.com/analytics-vidhya/complete-guide-to-machine-learning-evaluation-metrics-615c2864d916"
    },
    {
      "type": "article",
      "title": "Measuring Model Performance",
      "url": "https://developers.google.com/machine-learning/crash-course/classification/accuracy"
    },
    {
      "type": "article",
      "title": "A Practical Framework for (Gen)AI Value Measurement",
      "url": "https://medium.com/google-cloud/a-practical-framework-for-gen-ai-value-measurement-5fccf3b66c43"
    }
  ]
}
---

Before you can improve an AI system, you have to decide what "good" means and put a number on it. Metrics for LLM applications come in layers: classic ML measures like **accuracy**, **precision**, and **recall** for classification-style tasks; quality measures like **faithfulness**, relevance, and hallucination rate for generated text; operational measures like **latency**, token cost, and error rate; and agent-specific ones like task completion rate and tool-call success. No single number captures an AI feature, so you track a small scorecard instead.

This matters because LLM behavior is probabilistic and drifts with every prompt tweak, model upgrade, or data change. Without metrics, you're shipping on vibes: a change that fixes one failing example can silently break ten others. A defined metric set turns "the bot feels worse lately" into a regression you can detect, bisect, and fix. It also gives you the vocabulary to make trade-offs explicit, such as accepting slightly higher latency for a measurable drop in hallucinations.

In practice, you'll pick three to five metrics per feature and wire them into two places: an offline **eval suite** that runs against a fixed dataset in CI, and online dashboards fed by production traces. Start with task success and hallucination rate as quality signals, add `p95` latency and cost per request as operational guardrails, and set explicit thresholds. Every topic later in this module, from unit tests to Langfuse dashboards, is a mechanism for computing or monitoring the metrics you choose here.
