---
{
  "title": "Repetition Penalties",
  "module": "working-with-apis",
  "order": 17,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Stop the LLM From Rambling: Using Penalties to Control Repetition",
      "url": "https://dev.to/superorange0707/stop-the-llm-from-rambling-using-penalties-to-control-repetition-5h8"
    },
    {
      "type": "video",
      "title": "What are LLM Presence and Frequency Penalties?",
      "url": "https://www.youtube.com/watch?v=J66CRz6s734"
    },
    {
      "type": "article",
      "title": "Tips for Writing Better Prompts - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/ai_prompt_tips"
    }
  ]
}
---

**Repetition penalties** are the umbrella term for the sampling knobs that fight one failure mode: the model saying the same thing again and again. You've met the two OpenAI-style flavors — `frequency_penalty` (scales with each repeat) and `presence_penalty` (flat, once per token) — but the ecosystem has a third: a multiplicative `repetition_penalty`, common on open-source stacks like Hugging Face Transformers, vLLM, and Ollama, where 1.0 means off and values like 1.1 to 1.3 divide the score of any previously seen token. This page pulls them together as one toolkit.

The engineering reason to understand the family, rather than one parameter, is portability. LLMs are prone to **degenerate repetition** — loops of the same phrase, especially in long, low-temperature generations — but every provider exposes a different remedy: OpenAI-compatible APIs give you the additive pair, self-hosted runtimes give you `repetition_penalty` (Ollama calls it `repeat_penalty`), and Anthropic gives you none, relying on prompting and sampling instead. If your app routes across providers, "fix the repetition" means different request fields per backend.

In practice, treat all of them the same way: default off, nudge gently, verify by eye. Use additive penalties around 0.1-0.5 or multiplicative around 1.1, and never combine aggressive values — overcorrection makes the model *avoid* words it legitimately needs, corrupting code, JSON, and technical prose. Before touching any knob, check whether better prompting or a slightly higher `temperature` fixes the loop for free.
