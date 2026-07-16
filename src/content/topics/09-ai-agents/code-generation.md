---
{
  "title": "Code generation",
  "module": "ai-agents",
  "order": 4,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "GitHub Copilot",
      "url": "https://github.com/features/copilot"
    },
    {
      "type": "article",
      "title": "Multi-Agent-based Code Generation",
      "url": "https://arxiv.org/abs/2312.13010"
    },
    {
      "type": "article",
      "title": "From Prompt to Production: GitHub Blog",
      "url": "https://github.blog/ai-and-ml/github-copilot/from-prompt-to-production-building-a-landing-page-with-copilot-agent-mode/"
    }
  ]
}
---

**Code generation agents** are agents that write, edit, run, and debug code autonomously. This goes well beyond autocomplete: a coding agent in the style of GitHub Copilot's agent mode or Claude Code takes a task like "add pagination to this endpoint," explores the repository, edits multiple files, runs the test suite, reads the failures, and iterates until the tests pass. The key ingredient is a **feedback loop** — compilers, linters, and tests give the agent an objective signal that most other domains lack.

This is the most mature and commercially proven agent use case, and it changes how you work in two directions. As a consumer, you delegate whole tickets instead of prompting line by line. As a builder, coding agents are the best template to learn from: verifiable outcomes, sandboxed execution, and tool sets small enough to reason about. If you can build a reliable coding agent, you can build almost any agent.

In practice, you'll give the agent file tools (`read_file`, `edit_file`, `list_dir`), an execution tool (`run_command` inside a **sandbox** — a container or VM, never your host), and a loop that feeds test output back into context. The core pattern is generate, run, observe the error, patch, repeat, with an iteration cap. You'll also learn why context management matters: real repos don't fit in a context window, so the agent must search and read selectively rather than ingest everything.
