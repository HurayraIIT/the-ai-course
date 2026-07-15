---
{
  "title": "Development Tools",
  "module": "ai-coding-tools",
  "order": 0,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Claude Code Overview",
      "url": "https://code.claude.com/docs/en/overview"
    },
    {
      "type": "official",
      "title": "Cursor Docs",
      "url": "https://cursor.com/docs"
    },
    {
      "type": "article",
      "title": "Claude Code vs Cursor — DataCamp",
      "url": "https://www.datacamp.com/blog/claude-code-vs-cursor"
    }
  ]
}
---

**AI coding tools** are development environments where an AI model doesn't just autocomplete your code — it reads your codebase, plans changes, edits files, runs commands, and iterates on failures. The category spans several shapes: **agentic CLIs** like Claude Code and Codex that work in your terminal, **AI-native IDEs** like Cursor and Windsurf that rebuild the editor around the model, and cloud platforms like Replit that pair an agent with hosting so an idea becomes a deployed app in one place.

This module matters for two reasons. First, these tools have changed how software gets built: developers who direct an agent well ship meaningfully faster than those typing every line, and knowing when to delegate versus when to intervene is now a core skill. Second, as an AI engineer, these tools are your best case study — they're production agent systems whose architecture (context gathering, tool use, planning, self-correction, sandboxing) embodies everything this course teaches about building agents.

In practice, you'll pick a primary tool and learn to drive it well: writing clear task descriptions, maintaining project context files (like `CLAUDE.md` or Cursor rules) that teach the agent your conventions, reviewing diffs rather than rubber-stamping them, and using **MCP** servers to connect agents to your databases and services. The following topics walk through each major tool so you can choose based on your workflow — terminal, IDE, or browser — rather than hype.
