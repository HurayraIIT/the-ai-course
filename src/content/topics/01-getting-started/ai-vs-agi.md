---
{
  "title": "AI vs AGI",
  "module": "getting-started",
  "order": 5,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is AGI?",
      "url": "https://aws.amazon.com/what-is/artificial-general-intelligence/"
    },
    {
      "type": "article",
      "title": "The crucial difference between AI and AGI",
      "url": "https://www.forbes.com/sites/bernardmarr/2024/05/20/the-crucial-difference-between-ai-and-agi/"
    },
    {
      "type": "article",
      "title": "Stop Worrying about AGI: The Immediate Danger is Reduced General Intelligence (RGI)",
      "url": "https://towardsdatascience.com/stop-worrying-about-agi-the-immediate-danger-is-reduced-general-intelligence-rgi/"
    },
    {
      "type": "article",
      "title": "Artificial general intelligence - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Artificial_general_intelligence"
    }
  ]
}
---

Everything you will build in this course uses **narrow AI**: systems that perform specific tasks — generating text, recognizing images, writing code — without genuine general understanding. **AGI (artificial general intelligence)** is the hypothetical next step: a system that matches or exceeds human capability across essentially any cognitive task, transferring knowledge between domains the way people do. Today's frontier models are strikingly broad and increasingly agentic, but they remain engineered artifacts with real limits, and whether current approaches lead to AGI is still an open, contested question.

The distinction matters because hype distorts engineering decisions. If you treat an LLM as a general intelligence, you will under-invest in guardrails, validation, and fallbacks — and ship systems that fail in embarrassing ways. If you treat it as what it is, a powerful but fallible **pattern-completion engine**, you will design around its failure modes: hallucination, brittleness outside its training distribution, and inconsistent reasoning. Some researchers argue the nearer danger is not superintelligence but over-delegating to systems less capable than we assume.

In practice, this framing shapes every integration you write. You will validate model outputs before acting on them, constrain agents with **tool permissions** and human approval steps, and write evals instead of trusting vibes. When stakeholders ask "can the AI just handle it?", you will be the person who can answer precisely what today's models can and cannot do — and design the system accordingly.
