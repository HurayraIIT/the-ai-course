---
{
  "title": "How LLMs Work",
  "module": "llm-fundamentals",
  "order": 1,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is a large language model (LLM)?",
      "url": "https://www.cloudflare.com/en-gb/learning/ai/what-is-large-language-model/"
    },
    {
      "type": "article",
      "title": "New to LLMs? Start Here",
      "url": "https://towardsdatascience.com/new-to-llms-start-here/"
    },
    {
      "type": "video",
      "title": "How Large Language Models Work",
      "url": "https://www.youtube.com/watch?v=5sLYAQS9sWQ"
    },
    {
      "type": "article",
      "title": "What are large language models (LLMs)? - IBM",
      "url": "https://www.ibm.com/think/topics/large-language-models"
    },
    {
      "type": "article",
      "title": "Large language model - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Large_language_model"
    },
    {
      "type": "article",
      "title": "How Large Language Models Work: Explained Simply",
      "url": "https://justainews.com/applications/chatbots-and-virtual-assistants/how-large-language-models-work/"
    },
    {
      "type": "video",
      "title": "How Large Language Models Work",
      "url": "https://youtu.be/5sLYAQS9sWQ"
    }
  ]
}
---

Under the hood, an LLM does one thing repeatedly: given a sequence of tokens, it computes a probability distribution over what the **next token** should be, picks one, appends it, and repeats. There's no database of answers and no explicit reasoning engine — just billions of learned numerical weights that encode statistical patterns from training data. Sampling settings like **temperature** control whether the model picks the most likely token every time or takes more creative risks.

Understanding this generation loop explains almost every behavior you'll hit in production. Why the same prompt can give different answers (sampling is probabilistic). Why models confidently state falsehoods (a fluent-sounding wrong token can be highly probable — that's **hallucination**). Why output arrives incrementally (each token is generated one at a time, which is exactly what streaming APIs expose). Why cost scales with length (every token in and out is computed and billed). Developers who treat the model as a magic answer box write brittle software; developers who understand next-token prediction write prompts and guardrails that work.

You'll apply this immediately: tuning `temperature` and `max_tokens` in API calls, streaming responses to your UI as they generate, setting stop sequences, and structuring prompts so the most probable continuation is the one you actually want. Later topics on **transformers**, tokens, and inference build directly on this mental model.
