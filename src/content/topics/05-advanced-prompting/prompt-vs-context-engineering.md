---
{
  "title": "Prompt vs Context Engineering",
  "module": "advanced-prompting",
  "order": 6,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Context engineering vs. prompt engineering",
      "url": "https://www.elastic.co/search-labs/blog/context-engineering-vs-prompt-engineering"
    },
    {
      "type": "article",
      "title": "Beyond Prompting: The Power of Context Engineering",
      "url": "https://towardsdatascience.com/beyond-prompting-the-power-of-context-engineering/"
    },
    {
      "type": "video",
      "title": "Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents",
      "url": "https://www.youtube.com/watch?v=vD0E3EUb8-8"
    }
  ]
}
---

**Prompt engineering** and **context engineering** operate at different altitudes. Prompt engineering crafts the *instructions*: wording, examples, output format — the message you write. Context engineering manages *everything the model sees* at inference time: the system prompt, yes, but also conversation history, retrieved documents, tool definitions, tool results, and memory. One is writing a great paragraph; the other is deciding which paragraphs make it into a strictly limited page at all. Prompt engineering is best understood as a subset of context engineering.

The distinction matters because the two disciplines fail differently, and you need to diagnose which problem you actually have. If a single, self-contained request gives poor answers, that's a **prompting** problem — sharpen the instructions, add examples. If your agent starts strong and degrades over a long session, or your RAG app answers from the wrong document, no rewording will save you: that's a **context** problem — the wrong tokens are in the window, or the right ones are buried. As you move from single completions to multi-turn agents, more of your engineering time shifts from wording to curation.

In practice, you'll do both on every serious project: prompt-engineer the static parts (system prompt, tool descriptions, examples), then context-engineer the dynamic assembly — what gets retrieved, what history survives, what gets trimmed and when. The next two topics cover the workhorse context techniques: **compaction** and **isolation**.
