---
{
  "title": "Model Context Protocol (MCP)",
  "module": "mcp",
  "order": 0,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "course",
      "title": "Model Context Protocol (MCP) Course",
      "url": "https://huggingface.co/learn/mcp-course/en/unit0/introduction"
    },
    {
      "type": "official",
      "title": "Model Context Protocol",
      "url": "https://modelcontextprotocol.io/"
    },
    {
      "type": "opensource",
      "title": "Model Context Protocol",
      "url": "https://github.com/modelcontextprotocol"
    },
    {
      "type": "article",
      "title": "Discover more aritlces on MCP",
      "url": "https://towardsdatascience.com/tag/mcp/"
    },
    {
      "type": "course",
      "title": "MCP: Build Rich-Context AI Apps with Anthropic",
      "url": "https://www.deeplearning.ai/short-courses/mcp-build-rich-context-ai-apps-with-anthropic/"
    },
    {
      "type": "official",
      "title": "Model Context Protocol",
      "url": "https://modelcontextprotocol.io/introduction"
    },
    {
      "type": "opensource",
      "title": "Model Context Protocol",
      "url": "https://github.com/modelcontextprotocol/modelcontextprotocol"
    },
    {
      "type": "article",
      "title": "The Ultimate Guide to MCP",
      "url": "https://guangzhengli.com/blog/en/model-context-protocol"
    }
  ]
}
---

The **Model Context Protocol (MCP)** is an open standard that defines how AI applications connect to external tools, data, and services. Introduced by Anthropic in late 2024 and since adopted across the industry, it plays the same role for AI apps that USB-C plays for hardware: one well-specified connector instead of a custom integration for every pairing. An MCP **server** exposes capabilities — **tools**, **resources**, and **prompts** — and any MCP-compatible application can consume them without knowing anything about the server's internals.

Before MCP, wiring a model to N systems meant N bespoke integrations per application — the classic M×N problem. MCP collapses that to M+N: you build a server for your system once, and it works in Claude Desktop, IDEs, agent frameworks, and your own apps. As a developer this changes your leverage. Instead of hand-rolling function-calling glue for every API, you compose from a large ecosystem of existing servers — GitHub, Postgres, filesystems, browsers, cloud platforms — and publish your own capabilities the same way.

You'll work with MCP at two levels. As a consumer, you add servers to a host's config file (`claude_desktop_config.json`, `.mcp.json`, or an IDE settings panel) and the tools simply appear to the model. As a builder, you use the official SDKs — TypeScript, Python, and others — to define tools with typed schemas, then serve them over **stdio** locally or **streamable HTTP** remotely. The rest of this module unpacks each piece.
