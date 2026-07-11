---
{
  "title": "Top-P",
  "module": "working-with-apis",
  "order": 12,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "video",
      "title": "What are the LLM’s Top-P + Top-K ?",
      "url": "https://www.youtube.com/watch?v=aDmp2Uim0zQ"
    },
    {
      "type": "article",
      "title": "Nucleus Sampling",
      "url": "https://nn.labml.ai/sampling/nucleus.html"
    },
    {
      "type": "article",
      "title": "Sampling Techniques in Large Language Models (LLMs)",
      "url": "https://medium.com/@shashankag14/understanding-sampling-techniques-in-large-language-models-llms-dfc28b93f518"
    },
    {
      "type": "article",
      "title": "Temperature, top_p and top_k for chatbot responses",
      "url": "https://community.openai.com/t/temperature-top-p-and-top-k-for-chatbot-responses/295542"
    },
    {
      "type": "article",
      "title": "Top P - LLM Parameter Guide - Vellum",
      "url": "https://www.vellum.ai/llm-parameters/top-p"
    }
  ]
}
---

**Top-p**, or **nucleus sampling**, restricts token choice by cumulative probability instead of a fixed count. With `top_p: 0.9`, the model sorts candidates by probability, keeps the smallest set whose probabilities sum to 90% — the "nucleus" — and samples from that. The shortlist therefore adapts to the model's confidence: it might contain two tokens when the continuation is obvious and two hundred when many options are plausible.

That adaptivity is why top-p aged better than top-k and became the standard second knob next to `temperature`. It trims the low-probability tail (where nonsense lives) without capping genuine diversity when the model is legitimately uncertain. Where temperature reshapes the whole distribution — making unlikely tokens *more* likely as it rises — top-p never promotes anything; it only decides how much of the tail is eligible. That distinction is worth internalizing, because the two parameters are frequently confused.

In practice, `top_p` is a top-level field on OpenAI, Anthropic, and (as `topP` in `generationConfig`) Gemini, typically defaulting to 1.0 — no filtering. Lower it toward 0.5 or below for focused, predictable output; keep it near 0.9 to 1.0 for creative work. The standard advice holds: tune `temperature` or `top_p`, not both simultaneously, since their effects compound and you will not know which change did what. For most applications, adjusting temperature alone with `top_p` left at default is a sound starting point.
