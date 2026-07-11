---
{
  "title": "Context compaction",
  "module": "advanced-prompting",
  "order": 7,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Context Engineering",
      "url": "https://blog.langchain.com/context-engineering-for-agents/"
    },
    {
      "type": "article",
      "title": "Context Compaction",
      "url": "https://gist.github.com/badlogic/cd2ef65b0697c4dbe2d13fbecb0a0a5f"
    }
  ]
}
---

**Context compaction** shrinks a growing conversation back down without losing what matters: when the window approaches its limit, you replace older history with a dense **summary** and continue with that summary plus the recent turns intact. It's how long-running agents and chat sessions escape the hard ceiling of the context window — the transcript is compressed in place, and work carries on as if nothing happened. Coding agents like Claude Code do exactly this when a session runs long.

You need this because every long-lived LLM feature eventually hits the wall. An agent accumulates tool outputs, file contents, and error logs turn after turn; without intervention it either crashes into the token limit or degrades into **context rot** long before reaching it — paying more per request for worse answers. Compaction is the difference between an agent that can work a twenty-minute task and one that dies at minute five. The risk is real too: a careless summary silently deletes the one detail the next step needed.

In practice, you'll implement a threshold trigger — say, at 70-80 percent of the window, measured from the API's `usage` field — then call the model with a purpose-built summarization prompt that preserves decisions made, current state, open questions, and hard facts like file paths and IDs. Rebuild the message list as system prompt, summary, and the last few verbatim turns. Cheaper variants help too: truncating stale tool results often buys the most tokens for the least risk.
