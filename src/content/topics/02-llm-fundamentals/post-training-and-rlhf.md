---
{
  "title": "Post-training and RLHF",
  "module": "llm-fundamentals",
  "order": 6,
  "sources": [],
  "resources": [
    {
      "type": "article",
      "title": "Illustrating RLHF",
      "url": "https://huggingface.co/blog/rlhf"
    },
    {
      "type": "article",
      "title": "Training language models to follow instructions (InstructGPT)",
      "url": "https://arxiv.org/abs/2203.02155"
    }
  ]
}
---

**Post-training** is everything that happens to a model after pretraining: the raw next-token predictor that fell out of the pretraining run is fluent but unhelpful — it completes text, it doesn't answer questions or refuse harmful requests. Post-training turns that base model into the assistant you actually use, through stages like **supervised fine-tuning (SFT)** on curated example conversations and **RLHF** — reinforcement learning from human feedback — where humans rank pairs of model outputs, a **reward model** is trained on those rankings, and the LLM is then optimized to produce outputs the reward model scores highly.

This split explains most of what you observe as an AI engineer. A model's knowledge and raw capability come from pretraining; its personality, instruction-following, formatting habits, and refusal behavior come from post-training. When two models with similar benchmark scores feel wildly different to work with, you're feeling the post-training. It's also where techniques you'll hear about live: **RLAIF** replaces human rankers with an AI judge working from written principles (Anthropic's constitutional AI is the famous example), and **DPO** (direct preference optimization) gets a similar result to RLHF without training a separate reward model. Post-training is why models are agreeable — and why they sometimes flatter instead of correcting you, a bias called sycophancy that traces straight back to human raters preferring pleasant answers.

In practice you won't run RLHF yourself — it needs preference data and infrastructure that only model labs and large teams have. What you will do is reason about it: when a model over-refuses, over-hedges, or slips into a rigid response template, recognize that as a post-training artifact you can often override with a clear **system prompt** rather than a model swap. And when comparing models, read their post-training story — instruct vs base, what feedback signal was used — because that, more than parameter count, predicts how the model will behave in your product.
