---
{
  "title": "Prompt Engineering",
  "module": "prompting-fundamentals",
  "order": 1,
  "sources": [
    "ai-engineer",
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "roadmap",
      "title": "Visit Dedicated Prompt Engineering Roadmap",
      "url": "https://roadmap.sh/prompt-engineering"
    },
    {
      "type": "article",
      "title": "What is Prompt Engineering? - AI Prompt Engineering Explained - AWS",
      "url": "https://aws.amazon.com/what-is/prompt-engineering/"
    },
    {
      "type": "article",
      "title": "Advanced Prompt Engineering for Data Science Projects",
      "url": "https://towardsdatascience.com/advanced-prompt-engineering-for-data-science-projects/"
    },
    {
      "type": "video",
      "title": "What is Prompt Engineering?",
      "url": "https://www.youtube.com/watch?v=nf1e-55KKbg"
    },
    {
      "type": "article",
      "title": "What is Prompt Engineering? A Detailed Guide For 2025",
      "url": "https://www.datacamp.com/blog/what-is-prompt-engineering-the-future-of-ai-communication"
    },
    {
      "type": "article",
      "title": "Prompt engineering - Wikipedia",
      "url": "https://en.wikipedia.org/wiki/Prompt_engineering"
    },
    {
      "type": "article",
      "title": "Introduction to Prompt Engineering - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/prompt_engineering"
    },
    {
      "type": "video",
      "title": "RAG vs Fine-Tuning vs Prompt Engineering: Optimizing AI Models",
      "url": "https://youtu.be/zYGDpG-pTho?si=yov4dDrcsHBAkey-&t=522"
    }
  ]
}
---

**Prompt engineering** is the discipline of deliberately designing, structuring, and refining prompts so a model produces reliable, useful output — not by luck, but by construction. Where a casual user types whatever comes to mind, a prompt engineer treats the prompt as an artifact: versioned, tested, and improved against real failure cases. It spans everything from wording and structure to choosing techniques like few-shot examples or chain-of-thought for a given task.

For a developer, this matters because prompting is usually the cheapest, fastest lever you have. Before you reach for **fine-tuning**, RAG pipelines, or a bigger model, a better prompt often closes most of the quality gap — at zero training cost and with instant iteration. It is also where product behavior lives: the difference between an assistant that hallucinates confidently and one that says "I don't know" is frequently a few well-placed sentences.

Throughout this module you will build a working toolkit: writing specific instructions, supplying context, showing examples, constraining format, and layering **system prompts** and roles on top. You will apply it in real code — prompts stored as templates in your repo, interpolated with user data, run through an eval harness before deploying. Treat every prompt like a function signature: define inputs, define expected outputs, and test the contract.
