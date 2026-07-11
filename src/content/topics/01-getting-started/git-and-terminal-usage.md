---
{
  "title": "Git and Terminal Usage",
  "module": "getting-started",
  "order": 7,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Git Basics",
      "url": "https://git-scm.com/doc"
    },
    {
      "type": "official",
      "title": "Introduction to the Terminal",
      "url": "https://ubuntu.com/tutorials/command-line-for-beginners#1-overview"
    },
    {
      "type": "video",
      "title": "Git and Terminal Basics Crash Course (YouTube)",
      "url": "https://www.youtube.com/watch?v=HVsySz-h9r4"
    }
  ]
}
---

The **terminal** is a text interface to your operating system, and **Git** is the version control system that tracks every change to your code. Together they are the baseline toolkit of professional development: navigating directories with `cd` and `ls`, running scripts, managing environment variables, committing work with `git commit`, branching with `git branch`, and syncing with remotes like GitHub via `git push` and `git pull`.

For AI engineering specifically, fluency here pays off twice. First, the ordinary reasons: every SDK install, server start, and deployment happens in a shell, and every serious project lives in a Git repository. Second, a newer reason: modern **coding agents** — Claude Code, Copilot's agent mode, and similar tools — operate through the terminal and Git themselves. They run shell commands, create branches, and open pull requests. To supervise them well, review their diffs, and recover when they go sideways, you need to read Git history and drive a shell at least as confidently as the agent does. Prompt experiments also belong in version control: prompts are code, and you will want to diff and roll them back.

In practice, you will work in a repeatable loop: clone a repo, create a feature branch, set API keys in your environment (`export ANTHROPIC_API_KEY=...`), run and test locally, commit small focused changes, and push for review. Get this loop into muscle memory now — every project in this course assumes it.
