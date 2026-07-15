---
{
  "title": "Top-K",
  "module": "working-with-apis",
  "order": 11,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Top-K Sampling: The Complete Token Selection Guide",
      "url": "https://www.dataannotation.tech/blog/top-k-sampling"
    },
    {
      "type": "official",
      "title": "Gemini API Prompting Strategies - Google",
      "url": "https://ai.google.dev/gemini-api/docs/prompting-strategies"
    },
    {
      "type": "article",
      "title": "Top K - LLM Parameter Guide - Vellum",
      "url": "https://www.vellum.ai/llm-parameters/top-k"
    }
  ]
}
---

**Top-k sampling** limits the model's choice to the `k` highest-probability tokens before anything is sampled. If `top_k` is 40, the model ranks all candidate tokens, keeps the best 40, renormalizes their probabilities, and picks from only that shortlist. It is a hard cutoff by *count*: whether the model is very confident or very uncertain, exactly `k` candidates survive.

The value of top-k is as a safety rail against the **long tail**. A vocabulary has tens of thousands of tokens, and even with sensible temperature there is a small chance of sampling something bizarre from the tail; top-k removes that tail outright. Its weakness is that a fixed count ignores the shape of the distribution — when one token deserves 95% of the probability, keeping 40 candidates is too generous, and when fifty continuations are equally plausible, it is too strict. That inflexibility is exactly what `top_p` was designed to fix, which is why top-k is usually paired with, or replaced by, nucleus sampling.

In practice, availability varies: Gemini and Anthropic expose `top_k` (Anthropic treats it as an advanced option), local runtimes and Hugging Face pipelines support it widely, but OpenAI's API does not offer it at all. When you do use it, small values like 1 to 10 make output conservative — `top_k: 1` is pure greedy decoding — while larger values mostly defer control to temperature and top-p.
