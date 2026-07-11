---
{
  "title": "Text-to-Speech",
  "module": "multimodal-ai",
  "order": 11,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Text-to-Speech?",
      "url": "https://aws.amazon.com/polly/what-is-text-to-speech/"
    },
    {
      "type": "article",
      "title": "From Text to Speech: The Evolution of Synthetic Voices",
      "url": "https://ignitetech.ai/about/blogs/text-speech-evolution-synthetic-voices"
    }
  ]
}
---

**Text-to-speech** (TTS) converts written text into spoken audio. Modern neural TTS has left the robotic voices of GPS units far behind: today's models produce speech with natural prosody, emotional inflection, and convincing pauses, and many support **voice cloning** from short samples and dozens of languages. Some are steerable with plain-English direction — "speak like a calm support agent" — rather than markup alone.

For an AI engineer, TTS is the output half of every voice interface. If speech-to-text is how your app listens, TTS is how it talks back — in voice assistants, phone agents, audiobook and podcast generation, screen readers, and language-learning tools. Voice quality directly shapes how users judge your product: a stilted voice makes a smart agent feel dumb, while low **latency** to first audio makes a conversation feel alive. Cost, quality, and speed trade off differently across providers, so knowing the landscape pays.

In practice, you'll call a TTS endpoint — OpenAI's audio API, ElevenLabs, or a cloud provider like Google or Amazon Polly — with text, a voice selection, and an output format, and get back an audio file or a **stream** you pipe to the client as it generates. Streaming matters for real-time agents: you'll start playback before synthesis finishes to keep response times conversational. You'll also decide between pre-generating audio for static content and synthesizing on the fly for dynamic LLM output, then wire TTS as the final stage of your voice pipeline.
