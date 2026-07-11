---
{
  "title": "Tokens",
  "module": "llm-fundamentals",
  "order": 3,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Explaining Tokens — the Language and Currency of AI",
      "url": "https://blogs.nvidia.com/blog/ai-tokens-explained/"
    },
    {
      "type": "article",
      "title": "Understanding Tokens and Parameters in Model Training: A Deep Dive",
      "url": "https://www.functionize.com/blog/understanding-tokens-and-parameters-in-model-training"
    },
    {
      "type": "article",
      "title": "What is Tokenization? Types, Use Cases, Implementation",
      "url": "https://www.datacamp.com/blog/what-is-tokenization"
    },
    {
      "type": "article",
      "title": "Understanding tokens - Microsoft Learn",
      "url": "https://learn.microsoft.com/en-us/dotnet/ai/conceptual/understanding-tokens"
    },
    {
      "type": "article",
      "title": "What Are Tokens in LLMs and Why They Matter - LLM Guides",
      "url": "https://llmguides.ai/learn/what-are-tokens/"
    }
  ]
}
---

LLMs don't read characters or words — they read **tokens**, chunks of text that each map to an ID in the model's vocabulary. **Tokenization** is the process of splitting text into those chunks, typically with a subword algorithm like **byte-pair encoding (BPE)**: common words become a single token, rarer words get split into pieces (`tokenization` might become `token` + `ization`), and code, emoji, and non-English text get their own splitting quirks. As a rule of thumb, one token is roughly four characters or three-quarters of an English word.

Tokens are the unit of everything that costs you money or hits a limit. API pricing is per input and output token. **Context windows** are measured in tokens. `max_tokens` caps response length in tokens. Latency scales with token count. Even model weirdness — miscounting letters in a word, inconsistent handling of numbers — often traces back to how the tokenizer split the input. If you can't reason about tokens, you can't reason about the cost or capacity of your AI feature.

In practice you'll estimate and count tokens constantly: using libraries like `tiktoken` or provider token-counting endpoints, budgeting how many retrieved documents fit in a prompt, trimming chat history before you overflow the window, and projecting monthly API spend. Paste your prompts into a tokenizer playground early — seeing text split into tokens once makes all of this concrete.
