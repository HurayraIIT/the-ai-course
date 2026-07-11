---
{
  "title": "Max Length",
  "module": "working-with-apis",
  "order": 13,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Token Usage",
      "url": "https://platform.openai.com/docs/guides/gpt/managing-tokens"
    },
    {
      "type": "official",
      "title": "Size and Max Token Limits",
      "url": "https://docs.anthropic.com/claude/docs/size-and-token-limits"
    },
    {
      "type": "article",
      "title": "Utilising Max Token Context Window of Anthropic Claude",
      "url": "https://medium.com/@nampreetsingh/utilising-max-token-context-window-of-anthropic-claude-on-amazon-bedrock-7377d94b2dfa"
    },
    {
      "type": "article",
      "title": "Controlling the Length of OpenAI Model Responses",
      "url": "https://help.openai.com/en/articles/5072518-controlling-the-length-of-openai-model-responses"
    },
    {
      "type": "article",
      "title": "Max Model Length in AI",
      "url": "https://www.restack.io/p/ai-model-answer-max-model-length-cat-ai"
    },
    {
      "type": "video",
      "title": "Understanding ChatGPT/OpenAI Tokens",
      "url": "https://youtu.be/Mo3NV5n1yZk"
    },
    {
      "type": "official",
      "title": "Token Counting - Anthropic",
      "url": "https://platform.claude.com/docs/en/build-with-claude/token-counting"
    },
    {
      "type": "article",
      "title": "Max Tokens - LLM Parameter Guide - Vellum",
      "url": "https://www.vellum.ai/llm-parameters/max-tokens"
    }
  ]
}
---

**Max length** — `max_tokens` on most APIs, `max_output_tokens` on some — caps how many tokens the model may generate in a single response. It's a hard ceiling, not a target: generation simply stops when the count is reached, mid-sentence if necessary. The model doesn't see the limit or write more concisely because of it; if you want *shorter* answers, you say so in the prompt. The cap and the response share space with your input inside the model's overall **context window**.

This parameter is your cost and latency circuit breaker. Output tokens are the expensive ones, and generation time scales with their count — so an unbounded response is an unbounded bill and an unbounded wait. A runaway generation loop, a model that decides to enumerate 500 examples, a prompt-injected request for an essay: `max_tokens` bounds the damage from all of them. On Anthropic's API it's required on every request; elsewhere it's optional but you should treat it as mandatory in production.

In practice, set it per endpoint based on what a legitimate response actually needs — a classification label might get 16 tokens, a summary 300, a code generation task several thousand — with headroom so normal answers never get clipped. Then always check the response's **finish reason**: `length` (OpenAI) or `max_tokens` (Anthropic) means truncation, which your code should detect and handle. Stopping *gracefully* at a point you choose is the next topic, **stopping criteria**.
