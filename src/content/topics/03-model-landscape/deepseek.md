---
{
  "title": "DeepSeek",
  "module": "model-landscape",
  "order": 7,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Deepseek",
      "url": "https://www.deepseek.com/en/"
    },
    {
      "type": "article",
      "title": "DeepSeek explained: Everything you need to know",
      "url": "https://www.techtarget.com/whatis/feature/DeepSeek-explained-Everything-you-need-to-know"
    },
    {
      "type": "video",
      "title": "What is DeepSeek? AI Model Basics Explained",
      "url": "https://www.youtube.com/watch?v=KTonvXhsxpc"
    }
  ]
}
---

**DeepSeek** is a Chinese AI lab that shook the industry by releasing **open-weight** models rivaling the top proprietary flagships — reportedly trained at a fraction of the usual cost. Its breakout was **DeepSeek-R1**, a *reasoning model* that shows its full chain of thought and, unlike closed reasoning models, ships with downloadable weights under an MIT license. The lab pairs a huge mixture-of-experts flagship with distilled smaller variants that bring reasoning ability down to hardware ordinary developers actually have.

DeepSeek matters because it reset expectations for what open models can do and what inference should cost. Its API is among the cheapest ways to access frontier-class reasoning, which changes the economics of features you might have dismissed as too expensive — bulk document analysis, code review at scale, agent loops with many model calls. The open weights also mean you can self-host a genuinely strong reasoning model, and the visible **chain-of-thought** output is a valuable window into how reasoning models actually work. Note the practical caveats too: for its hosted API, data flows to servers in China, which many organizations restrict.

Practically, you'll use DeepSeek through its **OpenAI-compatible API** — point your existing SDK at `api.deepseek.com`, choose the chat or reasoning model, and your code works unchanged — or run distilled variants locally with Ollama. It's a natural benchmark to include whenever you're comparing cost-per-quality across providers.
