---
{
  "title": "Whisper API",
  "module": "multimodal-ai",
  "order": 10,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "OpenAI Whisper",
      "url": "https://openai.com/index/whisper/"
    },
    {
      "type": "opensource",
      "title": "Whisper on GitHub",
      "url": "https://github.com/openai/whisper"
    }
  ]
}
---

**Whisper** is OpenAI's speech recognition model, and it comes in two flavors that matter to you: an **open-source model** you can run yourself, and a hosted **speech-to-text API** that transcribes audio with a single HTTP call. Trained on hundreds of thousands of hours of multilingual audio, it handles accents, background noise, and technical vocabulary remarkably well, supports dozens of languages, and can translate foreign speech directly into English text.

Whisper matters because it made high-quality transcription a commodity. Before it, accurate ASR meant expensive proprietary systems; now a few lines of code give you transcripts good enough to feed summarizers, voice agents, and search indexes. The open weights also give you an escape hatch: when privacy rules or cost make a hosted API impractical, you can run the same capability on your own hardware with `whisper` or faster community ports.

In practice, you'll send an audio file to OpenAI's transcription endpoint via the SDK — `client.audio.transcriptions.create()` with a file and model name — and get back text, optionally as **verbatim JSON with timestamps** or subtitle formats like SRT. You'll use the `prompt` parameter to bias spelling of names and jargon, chunk long recordings to fit file limits, and pick between Whisper and OpenAI's newer transcription models depending on your accuracy and latency needs. Typical flow: record or upload audio, transcribe, then hand the text to an LLM for summarization, extraction, or a conversational reply.
