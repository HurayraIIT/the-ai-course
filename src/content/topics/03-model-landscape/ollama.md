---
{
  "title": "Ollama",
  "module": "model-landscape",
  "order": 17,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Ollama",
      "url": "https://ollama.com/"
    },
    {
      "type": "article",
      "title": "Ollama: Easily run LLMs locally",
      "url": "https://klu.ai/glossary/ollama"
    },
    {
      "type": "video",
      "title": "What is Ollama? Running Local LLMs Made Simple",
      "url": "https://www.youtube.com/watch?v=5RIOQuHOihY"
    }
  ]
}
---

**Ollama** is the easiest way to run large language models on your own machine. It's a small open-source tool that wraps model downloading, quantization handling, and GPU acceleration behind a Docker-like command line: `ollama run llama3` pulls the weights and drops you into a chat. Under the hood it builds on `llama.cpp`, serves a local REST API, and maintains a registry of ready-to-run **open-weight models** — Llama, Mistral, Gemma, Qwen, DeepSeek, and many more — in sensible quantized formats that fit consumer hardware.

Ollama matters because it removes every excuse between you and hands-on model experience. Local models mean **zero per-token cost**, total privacy (nothing leaves your machine), offline operation, and a free development loop — you can hammer a model with ten thousand test prompts while designing a feature without watching a billing meter. It's also the standard way to develop against open models before deciding whether production will self-host or use a hosted API.

In practice, you'll `ollama pull` a few models sized to your RAM and GPU, chat with them from the terminal, and integrate via the local server at `localhost:11434`. Crucially, Ollama exposes an **OpenAI-compatible endpoint**, so the same SDK code you write for cloud providers works locally by changing the base URL — making it trivial to swap between a local Llama during development and a frontier model in production.
