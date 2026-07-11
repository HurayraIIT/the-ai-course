---
{
  "title": "Speech-to-Text",
  "module": "multimodal-ai",
  "order": 9,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Speech to Text?",
      "url": "https://aws.amazon.com/what-is/speech-to-text/"
    },
    {
      "type": "article",
      "title": "Turn Speech into Text using Google AI",
      "url": "https://cloud.google.com/speech-to-text"
    },
    {
      "type": "article",
      "title": "How is Speech to Text Used?",
      "url": "https://h2o.ai/wiki/speech-to-text/"
    }
  ]
}
---

**Speech-to-text** (STT), also called automatic speech recognition (**ASR**), converts spoken audio into written text. Modern systems are end-to-end neural models trained on enormous amounts of multilingual audio, which is why they handle accents, background noise, and domain jargon far better than the phone-tree recognizers of a decade ago. Output ranges from a plain transcript to rich results with **timestamps**, speaker labels, and per-word confidence.

For an AI engineer, STT is the gateway modality: once speech is text, everything else in your LLM toolbox applies. It's the first stage of every voice assistant, the input to meeting summarizers, the indexing layer for podcast and video search, and an accessibility requirement in many products. Getting it right upstream matters enormously — transcription errors propagate into every summary, answer, and action taken downstream, so accuracy here sets the ceiling for the whole pipeline.

You'll work with STT in two modes. **Batch transcription** uploads a recorded file to an API — OpenAI's Whisper endpoint, Google Cloud Speech-to-Text, or similar — and returns a transcript, often with language detection and optional translation. **Streaming transcription** sends live microphone audio over a persistent connection and receives partial results within a fraction of a second, which is what real-time agents need. This topic covers the landscape and the accuracy/latency/cost trade-offs; the next one goes deep on Whisper, the model you'll most likely reach for first.
