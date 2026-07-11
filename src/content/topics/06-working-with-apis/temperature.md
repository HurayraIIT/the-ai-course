---
{
  "title": "Temperature",
  "module": "working-with-apis",
  "order": 10,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What Temperature Means in Natural Language Processing and AI",
      "url": "https://thenewstack.io/what-temperature-means-in-natural-language-processing-and-ai/"
    },
    {
      "type": "article",
      "title": "What is LLM Temperature? - IBM",
      "url": "https://www.ibm.com/think/topics/llm-temperature"
    },
    {
      "type": "article",
      "title": "How Temperature Settings Transform Your AI Agent's Responses",
      "url": "https://docsbot.ai/article/how-temperature-settings-transform-your-ai-agents-responses"
    },
    {
      "type": "article",
      "title": "LLM Temperature: How It Works and When You Should Use It",
      "url": "https://www.vellum.ai/llm-parameters/temperature"
    }
  ]
}
---

**Temperature** controls how much randomness goes into picking the next token. Mathematically, it divides the model's raw scores (logits) before they become probabilities: low values sharpen the distribution so the most likely token dominates, high values flatten it so unlikely tokens get a real chance. At `temperature: 0` the model becomes greedy — it (almost) always picks the top token — while values around 1 sample from the distribution roughly as the model learned it.

This is the single most-used sampling parameter, and choosing it well is a genuine engineering decision. Deterministic tasks — extraction, classification, code generation, anything you will parse programmatically — want low temperature, because you are optimizing for the most probable answer and for reproducibility. Creative tasks — brainstorming, marketing copy, dialogue — benefit from higher settings, where variety matters more than any single "best" continuation. Set it too high and output degrades into incoherence; too low and rewrites all come out identical.

In practice, `temperature` is a top-level request field on every major API. Typical ranges run 0 to 2 on OpenAI and 0 to 1 on Anthropic — so a "0.7" habit does not transfer directly between providers. Start near 0 to 0.3 for structured work and 0.7-plus for creative work, adjust based on observed output, and change **either** temperature **or** `top_p`, not both at once, so you can attribute the effect.
