---
{
  "title": "Meta Llama",
  "module": "model-landscape",
  "order": 5,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "course",
      "title": "Building with Llama 4",
      "url": "https://www.deeplearning.ai/short-courses/building-with-llama-4/"
    },
    {
      "type": "official",
      "title": "Llama",
      "url": "https://www.llama.com/"
    },
    {
      "type": "opensource",
      "title": "Llama Models (GitHub)",
      "url": "https://github.com/meta-llama/llama-models"
    }
  ]
}
---

**Llama** is Meta's family of **open-weight** large language models — models whose trained weights you can download, inspect, fine-tune, and run on your own hardware. Released in successive generations at multiple sizes, from small models that fit on a laptop to large mixture-of-experts flagships, Llama comes with a permissive (though not fully open-source) community license that allows commercial use for almost everyone. It's arguably the model family that made serious local and self-hosted AI mainstream.

Llama matters because open weights change your relationship with the model. With a hosted API you rent intelligence; with Llama you can own the deployment — run it in your own VPC for data-sensitive workloads, **fine-tune** it on your domain, quantize it to fit cheaper hardware, and never worry about a vendor deprecating your model or raising prices. The Llama ecosystem is also enormous: most local-inference tools, fine-tuning frameworks, and research papers support it first, and countless derivative models on Hugging Face are Llama fine-tunes.

In practice, you'll rarely train Llama yourself. You'll pull weights from `llama.com` or **Hugging Face**, run them locally through Ollama or LM Studio for prototyping, and serve them in production with an inference engine like vLLM behind an OpenAI-compatible endpoint. Alternatively, hosted providers such as Groq, Together, and AWS Bedrock serve Llama per-token — giving you open-model economics without managing GPUs.
