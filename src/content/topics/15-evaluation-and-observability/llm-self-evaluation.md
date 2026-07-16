---
{
  "title": "LLM Self Evaluation",
  "module": "evaluation-and-observability",
  "order": 5,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "LLM Self-Evaluation - LearnPrompting",
      "url": "https://learnprompting.org/docs/reliability/lm_self_eval"
    }
  ]
}
---

**LLM self-evaluation** means using a language model to judge language model output — either the model checking its own answer ("is this correct? rate your confidence") or a separate **LLM-as-judge** scoring another model's response against criteria like faithfulness, relevance, or tone. The judge receives the input, the output, and a rubric, and returns a score or verdict, turning a fuzzy quality question into something you can compute at scale.

This matters because human review doesn't scale and string matching doesn't work. You can't exact-match a generated paragraph against a reference, and you can't pay people to read a million production responses. LLM judges fill the gap: they're the engine behind most metrics in DeepEval and Ragas, and they let you grade open-ended outputs in CI and production for pennies. But they inherit model biases — judges favor longer answers, their own model family's style, and the first option shown — and a model asked to verify its own work often confidently blesses its own mistakes, so self-evaluation is a signal, not ground truth.

In practice, you'll write judge prompts with an explicit rubric and a constrained output format (a `1–5` score or `pass`/`fail` with reasoning), use a strong model to judge a cheaper one, and evaluate one criterion per judge rather than "overall quality." Mitigate bias by randomizing comparison order and requiring chain-of-thought before the verdict. Most importantly, **calibrate the judge**: score a sample by hand and measure agreement with human labels before trusting it in your pipeline.
