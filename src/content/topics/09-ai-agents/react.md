---
{
  "title": "ReAct",
  "module": "ai-agents",
  "order": 13,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "ReAct Prompting",
      "url": "https://www.promptingguide.ai/techniques/react"
    },
    {
      "type": "article",
      "title": "ReAct Prompting: How We Prompt for High-Quality Results from LLMs",
      "url": "https://www.width.ai/post/react-prompting"
    },
    {
      "type": "official",
      "title": "ReAct: Synergizing Reasoning and Acting in Language Models",
      "url": "https://react-lm.github.io/"
    },
    {
      "type": "article",
      "title": "ReAct Systems: Enhancing LLMs with Reasoning and Action",
      "url": "https://learnprompting.org/docs/agents/react"
    },
    {
      "type": "article",
      "title": "ReAct: Synergizing Reasoning and Acting - LearnPrompting",
      "url": "https://learnprompting.org/docs/techniques/react"
    }
  ]
}
---

**ReAct** — short for **Reason + Act** — is the pattern that turns an LLM into a working agent by interleaving explicit reasoning with tool use. (No relation to the JavaScript framework.) Instead of answering in one shot, the model cycles through `Thought` (what do I know, what's next), `Action` (a tool call), and `Observation` (the result), repeating until it can state a final answer. Introduced by Yao et al. in 2022, it's the direct ancestor of how every modern agent framework and tool-calling API behaves today.

ReAct matters because it fixed the two failure modes of what came before. Pure chain-of-thought reasoning hallucinated facts it couldn't look up; pure action-taking flailed without a plan. Interleaving them lets each thought be grounded in real observations and each action be justified by a thought — and gives you a readable **trace** of the agent's reasoning, which is invaluable when a run goes sideways and you need to see exactly where it turned wrong.

In practice, you rarely hand-write the classic `Thought:/Action:/Observation:` text format anymore — native tool-calling APIs give you the loop with structured JSON instead of parsed strings. But you'll still apply ReAct deliberately: prompt the agent to reason before each tool call, feed every result back as an observation, and log the full trace. When you use LangChain, the OpenAI or Anthropic tool APIs, or build a raw loop yourself, you are implementing ReAct — knowing the pattern by name tells you which knobs to turn when it misbehaves.
