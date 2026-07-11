---
{
  "title": "Cursor",
  "module": "ai-coding-tools",
  "order": 3,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Cursor Docs",
      "url": "https://cursor.com/docs"
    },
    {
      "type": "official",
      "title": "Cursor Learn",
      "url": "https://cursor.com/learn"
    },
    {
      "type": "video",
      "title": "Cursor AI Tutorial for Beginners",
      "url": "https://www.youtube.com/watch?v=3289vhOUdKA"
    }
  ]
}
---

**Cursor** is an AI-native code editor — a fork of VS Code rebuilt so the model is a first-class part of the editing experience rather than a plugin. Everything from your extensions to your keybindings carries over, but the core interactions change: **Tab** autocomplete predicts multi-line edits across your file, inline edits rewrite selections from a prompt, and the **Agent** mode takes on whole tasks — searching the codebase, editing multiple files, and running terminal commands with your approval.

Cursor matters because it defined the AI-IDE category and remains its benchmark. Its bet is that most developers want AI *inside* the editing loop, not delegated to a terminal: you stay in the driver's seat, watch changes appear in familiar diff views, and course-correct instantly. Its codebase indexing gives the model retrieval over your whole project, so answers and edits reflect your actual code, and being model-agnostic lets you pick frontier models from Anthropic, OpenAI, and others per task.

In practice, you'll use Tab for the constant small stuff, `Cmd+K` for targeted inline rewrites, and the agent panel for multi-file features and refactors — reviewing each proposed diff before accepting. You'll encode your conventions in **rules** files (`.cursor/rules`) so generated code matches your style, mention files and docs with `@` to control context, and connect external tools via MCP. Background agents can take longer tasks off your hands while you keep editing.
