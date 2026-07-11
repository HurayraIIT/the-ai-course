---
{
  "title": "Open Weight Models",
  "module": "llm-fundamentals",
  "order": 15,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "BLOOM BigScience",
      "url": "https://bigscience.huggingface.co/"
    },
    {
      "type": "official",
      "title": "Falcon LLM – Technology Innovation Institute (TII)",
      "url": "https://falconllm.tii.ae/"
    },
    {
      "type": "official",
      "title": "Llama 2 – Meta's Official Announcement",
      "url": "https://ai.meta.com/llama/"
    },
    {
      "type": "official",
      "title": "Hugging Face – Open LLM Leaderboard (Top Open Models)",
      "url": "https://huggingface.co/spaces/HuggingFaceH4/open_llm_leaderboard"
    },
    {
      "type": "official",
      "title": "EleutherAI – Open Research Collective (GPT-Neo, GPT-J, etc.)",
      "url": "https://www.eleuther.ai/"
    }
  ]
}
---

An **open-weight model** is one whose trained parameters are published for anyone to download, run, and modify. The lineage runs from early community efforts like EleutherAI's GPT-J, BLOOM, and Falcon through Meta's **Llama** family — the release that made open weights mainstream — to today's ecosystem where Llama, Mistral, Qwen, DeepSeek, Gemma, and OpenAI's gpt-oss models are all a `git clone` away on **Hugging Face**. Licenses vary: some are truly permissive (Apache 2.0), others carry acceptable-use or commercial restrictions, so read the license before you ship.

Open weights unlock capabilities closed APIs can't offer. Full data privacy: prompts and outputs never leave your infrastructure, which is decisive in regulated industries. Full customization: **fine-tune** on proprietary data, quantize for edge devices, or strip the model down for a single task. Predictable economics: no per-token metering, no rate limits, no vendor deprecating your model out from under you. And the pace matters — strong open models now arrive months, not years, behind the frontier, making them genuinely viable for production, not just research.

Practically, you'll pull weights from Hugging Face, run them locally with **Ollama** or `llama.cpp` for development, and serve them in production with **vLLM** or a managed host like Together or Groq — nearly all exposing an OpenAI-compatible endpoint so your application code barely changes. Leaderboards and your own evals guide which checkpoint to bet on.
