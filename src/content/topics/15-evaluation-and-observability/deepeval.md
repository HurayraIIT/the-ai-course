---
{
  "title": "DeepEval",
  "module": "evaluation-and-observability",
  "order": 7,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "DeepEval - The Open-Source LLM Evaluation Framework",
      "url": "https://www.deepeval.com/"
    },
    {
      "type": "opensource",
      "title": "DeepEval GitHub Repository",
      "url": "https://github.com/confident-ai/deepeval"
    },
    {
      "type": "article",
      "title": "Evaluate LLMs Effectively Using DeepEval: A Pratical Guide",
      "url": "https://www.datacamp.com/tutorial/deepeval"
    },
    {
      "type": "video",
      "title": "DeepEval - LLM Evaluation Framework",
      "url": "https://www.youtube.com/watch?v=ZNs2dCXHlfo"
    }
  ]
}
---

**DeepEval** is an open-source Python framework that makes LLM evaluation feel like unit testing. Built by Confident AI, it gives you a library of ready-made metrics — **answer relevancy**, **faithfulness**, hallucination, contextual precision and recall, toxicity, plus agent-oriented checks like tool correctness and task completion — and a `pytest`-style test runner, so eval cases look and run like the tests you already write. Most metrics use LLM-as-judge under the hood, with its **G-Eval** implementation letting you define custom criteria in plain English.

It matters because it closes the gap between "we should evaluate our LLM app" and actually doing it in your existing workflow. Instead of building judge prompts, scoring logic, and reporting from scratch, you get researched metric implementations with score thresholds that pass or fail a build. That turns prompt changes, model swaps, and RAG pipeline tweaks into things your CI can catch when they regress, exactly like any other code change.

In practice, you `pip install deepeval`, wrap each eval example in an `LLMTestCase` (input, actual output, and optionally retrieved context and expected output), attach metrics with thresholds like `AnswerRelevancyMetric(threshold=0.7)`, and run `deepeval test run` locally or in CI. You'll maintain datasets of test cases as goldens, use G-Eval for domain-specific criteria your rubric demands, and optionally sync results to the Confident AI platform for tracking runs over time. Pair it with tracing tools like Langfuse or LangSmith: they show you *what happened*, DeepEval asserts *whether it was good*.
