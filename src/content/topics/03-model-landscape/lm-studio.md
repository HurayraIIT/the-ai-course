---
{
  "title": "LM Studio",
  "module": "model-landscape",
  "order": 18,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "LMStudio",
      "url": "https://lmstudio.ai/"
    },
    {
      "type": "video",
      "title": "LM Studio Tutorial: Run Large Language Models (LLM) on Your Laptop",
      "url": "https://www.youtube.com/watch?v=ygUEbCpOOLg"
    }
  ]
}
---

**LM Studio** is a desktop application for running open-weight language models locally — think of it as the graphical counterpart to Ollama. Instead of a command line, you get a full UI: browse and download **quantized models** (GGUF and MLX formats) straight from Hugging Face, chat with them in a polished interface, and tune runtime settings like context length, GPU offload, and sampling parameters with sliders instead of flags. It runs on Windows, macOS, and Linux, with strong Apple Silicon support via **MLX**.

LM Studio matters because it makes local-model experimentation visual and measurable. You can see exactly how much RAM and VRAM a model consumes, watch tokens-per-second in real time, and compare quantization levels side by side — which teaches you the hardware intuition (how model size, quantization, and context length trade off) that raw CLI tools leave implicit. For teammates who will never touch a terminal, it's also the easiest way to demo what local AI can do on ordinary laptops, with everything staying on-device.

In practice, you'll search for a model in the built-in browser, pick a quantization your machine can hold, and chat immediately. When you're ready to code against it, flip on the local server: LM Studio exposes an **OpenAI-compatible API** on `localhost:1234`, so your existing SDK calls work by swapping the base URL — the same portability trick you'll use across this whole module.
