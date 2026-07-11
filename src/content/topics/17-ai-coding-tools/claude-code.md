---
{
  "title": "Claude Code",
  "module": "ai-coding-tools",
  "order": 1,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "roadmap",
      "title": "Visit the Dedicated Claude Code Roadmap",
      "url": "https://roadmap.sh/claude-code"
    },
    {
      "type": "course",
      "title": "Claude Code in Action",
      "url": "https://anthropic.skilljar.com/claude-code-in-action"
    },
    {
      "type": "official",
      "title": "Claude Code Overview",
      "url": "https://code.claude.com/docs/en/overview"
    },
    {
      "type": "video",
      "title": "Introducing Claude Code",
      "url": "https://www.youtube.com/watch?v=AJpK3YTTKZ4"
    }
  ]
}
---

**Claude Code** is Anthropic's agentic coding tool. Point it at a repository and give it a task in plain English; it explores the codebase, plans an approach, edits files, runs tests and shell commands, and iterates until the work is done — asking permission before anything consequential. It began as a terminal tool and that remains its home, but it also runs inside IDEs like VS Code and JetBrains, on the web, and in CI through GitHub Actions and the **Claude Agent SDK**.

It matters because it represents the delegation end of the AI coding spectrum. Where an AI IDE keeps you in the editor accepting suggestions, Claude Code is built for handing over whole tasks — "fix this failing test suite," "add rate limiting to these endpoints" — and reviewing the result. Living in the terminal means it composes with everything you already use: git, build tools, linters, deployment scripts. Its agentic harness (context management, tool use, permissioning) is also the reference architecture many teams study when building their own agents.

In practice, you'll run `claude` in a project directory and converse: describe tasks, answer its clarifying questions, and review diffs before approving. You'll write a **CLAUDE.md** file so it knows your build commands and conventions, create custom **skills** and slash commands for repeated workflows, connect it to external services via **MCP** servers, and configure permissions to control what it can do unattended. For bigger jobs, you'll dispatch subagents or run tasks in the background while you keep working.
