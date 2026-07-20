---
{
  "title": "Quantization",
  "module": "model-landscape",
  "order": 19,
  "sources": [
    "new"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Quantization from the ground up",
      "url": "https://ngrok.com/blog/quantization"
    },
    {
      "type": "video",
      "title": "Optimize Your AI - Quantization Explained",
      "url": "https://www.youtube.com/watch?v=K75j8MkwgJ0"
    }
  ]
}
---

**Quantization** is storing a model's **weights** at fewer bits than the `float32` or `bfloat16` they were trained in — most commonly 8, 4, or even 2 bits per parameter. It's *lossy* compression: you map a range of real values onto a much smaller set of representable ones and accept the rounding error. The labels you'll see on Hugging Face and inside Ollama and LM Studio encode the scheme — `Q8_0` is 8-bit, `Q4_K_M` is a 4-bit **K-quant** at medium quality, `Q2_K` is 2-bit. Crucially, quantization is applied to **blocks** of 32–256 weights rather than a whole tensor, each block carrying its own scale, so a single outlier weight distorts its neighbours instead of poisoning the entire layer. (Don't confuse this with the vector quantization you'll meet in the embeddings module — same word, different target.)

This matters because memory, not compute, is what stops you running a good model. Weights at 16-bit cost roughly 2 bytes each, so a 70B model is about 140 GB — a rented multi-GPU box. The same model at 4-bit is around 40 GB, which fits a well-specced laptop. Inference is **memory-bandwidth-bound**, so moving fewer bytes per token also makes it faster: dropping from `bfloat16` to 4-bit took one M1 Max from 19.45 to 46.05 tokens per second, a 2.4x speedup on identical hardware. The quality curve is the part worth memorising — 8-bit is very close to imperceptible, 4-bit costs a noticeable but usually acceptable amount, and 2-bit falls off a cliff into visible incoherence.

In practice, `Q4_K_M` is the default worth starting from — it's the sweet spot most local-model tooling ships by default, for good reason. Step up to `Q5` or `Q8` when quality matters more than RAM, and treat `Q2` as a last resort for models that otherwise wouldn't load at all. A useful rule of thumb: a larger model at 4-bit usually beats a smaller model at 8-bit for the same memory budget. There's a second, newer lever too — **KV cache quantization**, which compresses the **context** rather than the weights and buys back a lot of RAM on long conversations. And when you need to judge a quantization rather than guess, the standard measures are **perplexity** and KL divergence against the full-precision original, not vibes.
