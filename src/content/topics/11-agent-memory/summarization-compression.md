---
{
  "title": "Summarization / Compression",
  "module": "agent-memory",
  "order": 6,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Evaluating LLMs for Text Summarization",
      "url": "https://insights.sei.cmu.edu/blog/evaluating-llms-for-text-summarization-introduction/"
    },
    {
      "type": "article",
      "title": "The Ultimate Guide to AI Document Summarization",
      "url": "https://www.documentllm.com/blog/ai-document-summarization-guide"
    }
  ]
}
---

**Summarization** (often called **compaction** or context compression) keeps a long-running conversation inside the context window by replacing older messages with a condensed version of them. When the transcript approaches a token threshold, an LLM call distills the oldest portion into a summary — decisions made, facts learned, task state — which then stands in for the raw messages while recent turns stay verbatim. The agent trades perfect recall of the past for the ability to keep going.

You need this because every genuinely useful agent eventually outlives its context window: a coding session spanning fifty tool calls, a support thread across a whole afternoon. Without compression the run simply dies or truncates blindly, dropping whatever happened to be oldest — including, often, the original goal. Good summarization is *selective* forgetting: it preserves objectives, constraints, and conclusions while shedding the bulk (verbose tool outputs, dead-end explorations, pleasantries). This is exactly what Claude Code's compaction does, and every serious agent framework ships some version of it.

In practice you'll monitor token counts each turn and trigger compaction at a threshold (say 80% of the window). The summarization prompt matters more than anything: instruct it to keep the task goal, key decisions with reasons, file paths and identifiers, and unresolved questions — a structured recap, not prose. Common refinements include a **rolling summary** updated incrementally, keeping the last N messages raw, and pairing compression with external memory so full history remains searchable even after it leaves context.
