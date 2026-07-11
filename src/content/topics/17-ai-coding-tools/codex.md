---
{
  "title": "Codex",
  "module": "ai-coding-tools",
  "order": 2,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Codex - Official Webste",
      "url": "https://chatgpt.com/codex"
    },
    {
      "type": "video",
      "title": "Getting started with Codex",
      "url": "https://www.youtube.com/watch?v=px7XlbYgk7I"
    }
  ]
}
---

**Codex** is OpenAI's coding agent. Like Claude Code, it takes a natural-language task and works your repository autonomously — reading code, editing files, running commands and tests in a sandbox, and presenting the result for review. It's available in several surfaces that share one agent: a **CLI** for your terminal, an IDE extension, and a cloud mode in ChatGPT where tasks run on remote containers, so you can fire off work from your editor, a browser, or your phone and it lands as a pull request.

Codex matters partly as the second major player in agentic coding — if your team runs on the OpenAI/ChatGPT ecosystem, it's the natural counterpart to Claude Code, bundled with ChatGPT paid plans and powered by OpenAI's coding-tuned models. Its cloud execution model is also instructive: **parallel task delegation**, where you assign several independent tasks and each runs in its own isolated environment, previews a workflow of managing a fleet of agents rather than pairing with one.

In practice, you'll install the CLI and run `codex` in a project to work interactively, choosing an approval mode that sets how much it can do without asking — from suggesting edits to full auto in a sandbox. You'll add an **AGENTS.md** file so it learns your project's commands and conventions, delegate bigger or parallelizable tasks to the cloud from ChatGPT, and wire it into CI to review pull requests or fix issues automatically.
