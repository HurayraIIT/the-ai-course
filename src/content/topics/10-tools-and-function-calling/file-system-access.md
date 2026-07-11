---
{
  "title": "File System Access",
  "module": "tools-and-function-calling",
  "order": 12,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Filesystem MCP server for AI Agents",
      "url": "https://playbooks.com/mcp/mateicanavra-filesystem"
    },
    {
      "type": "article",
      "title": "File System Access API",
      "url": "https://developer.mozilla.org/en-US/docs/Web/API/File_System_Access_API"
    },
    {
      "type": "article",
      "title": "Understanding File Permissions and Security",
      "url": "https://linuxize.com/post/understanding-linux-file-permissions/"
    },
    {
      "type": "video",
      "title": "How File Systems Work?",
      "url": "https://www.youtube.com/watch?v=KN8YgJnShPM"
    }
  ]
}
---

**File system tools** let an agent read, write, list, and search files on a real disk: `read_file(path)`, `write_file(path, content)`, `list_directory(path)`, `glob`, `grep`. They're the defining tools of coding agents — Claude Code, Cursor, and their peers are essentially LLMs wired to a file system plus a shell — but any agent that processes documents, generates reports, or maintains its own notes needs them too.

Files matter beyond code because they double as cheap, durable **working memory**. An agent that can write `plan.md`, dump intermediate results to disk, and read them back later escapes the limits of its context window — it can tackle work spanning hours and hundreds of files by keeping state where it doesn't cost tokens. The flip side is that this is among the most dangerous tool categories: an agent that writes arbitrary paths can corrupt a project, and one that reads arbitrary paths can leak `~/.ssh` or `.env` secrets into context. **Sandboxing** is non-negotiable — confine every operation to an allowlisted root directory, canonicalize paths to block `../` traversal, and gate writes and deletes behind confirmation.

In practice you'll rarely build these from scratch: the reference **filesystem MCP server** provides the standard set with directory scoping, and agent frameworks ship equivalents. If you do roll your own, keep operations atomic, return line-numbered reads so the model can request precise edits, cap file sizes to protect the context window, and prefer diff-style edits over whole-file rewrites.
