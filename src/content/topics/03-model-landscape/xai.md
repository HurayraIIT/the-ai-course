---
{
  "title": "xAI",
  "module": "model-landscape",
  "order": 10,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "official",
      "title": "xAI Documentation",
      "url": "https://docs.x.ai/"
    },
    {
      "type": "official",
      "title": "xAI API Console",
      "url": "https://console.x.ai/"
    }
  ]
}
---

**xAI** is Elon Musk's AI company and the maker of **Grok**, a family of frontier models available through the consumer Grok app, inside X (formerly Twitter), and via a developer API. xAI trains its flagships on one of the largest GPU superclusters in the world, and Grok's signature traits are strong reasoning, a deliberately less-filtered conversational personality, and tight integration with **real-time data** from the X platform.

For a builder, xAI matters as both a capable frontier option and a distinct positioning lesson. Grok's flagship models compete at the top tier for reasoning and coding, while cheaper fast variants cover high-volume work — so it belongs in any serious provider comparison. Its differentiator is currency: through **live search** capabilities, Grok can ground answers in what's happening right now on X and the web, which is genuinely hard to replicate with providers whose models only know their training data plus whatever retrieval you build yourself. If your product touches news, markets, or social sentiment, that's directly relevant.

In practice, you'll create a key in the xAI console and call the API — it's **OpenAI-compatible**, so the official OpenAI SDK works by swapping the base URL to `https://api.x.ai/v1` and the model name to a `grok` variant. From there the familiar patterns apply: streaming, function calling, structured outputs, and vision inputs, plus xAI-specific options for enabling real-time search in responses.
