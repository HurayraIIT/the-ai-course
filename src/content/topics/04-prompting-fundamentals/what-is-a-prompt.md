---
{
  "title": "What is a Prompt?",
  "module": "prompting-fundamentals",
  "order": 0,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Basics of Prompting - DAIR.AI",
      "url": "https://www.promptingguide.ai/introduction/basics"
    },
    {
      "type": "article",
      "title": "Prompt Elements - DAIR.AI",
      "url": "https://www.promptingguide.ai/introduction/elements"
    }
  ]
}
---

A **prompt** is the input you send to a large language model — the text (and increasingly, images, files, or tool results) that the model conditions on when generating its response. Under the hood there is no magic: the model receives a sequence of tokens and predicts what comes next. A well-formed prompt usually combines a few recognizable elements: an **instruction** (what to do), **context** (background the model needs), **input data** (the thing to operate on), and an **output indicator** (what the answer should look like).

If you build software on top of LLMs, the prompt is your primary programming interface. There is no compiler and no type checker between you and the model — the prompt *is* the spec. Two prompts that look almost identical to a human can produce wildly different outputs, so understanding what a prompt actually is, and which parts of it the model pays attention to, is the foundation everything else in this module builds on.

In practice, you will stop thinking of prompts as chat messages and start treating them as structured payloads. You will assemble them in code — template strings or dedicated builders that merge an instruction like `Summarize the ticket below in 3 bullets` with delimited input such as `<ticket>...</ticket>` — and send them through an API's `messages` array. Every technique that follows is just a smarter way of constructing that payload.
