---
{
  "title": "Local Desktop",
  "module": "mcp",
  "order": 10,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Build a Simple Local MCP Server",
      "url": "https://blog.stackademic.com/build-simple-local-mcp-server-5434d19572a4"
    },
    {
      "type": "article",
      "title": "How to Build and Host Your Own MCP Servers in Easy Steps",
      "url": "https://collabnix.com/how-to-build-and-host-your-own-mcp-servers-in-easy-steps/"
    },
    {
      "type": "article",
      "title": "Expose localhost to Internet",
      "url": "https://ngrok.com/docs"
    },
    {
      "type": "video",
      "title": "Run a Local Server on Your Machine",
      "url": "https://www.youtube.com/watch?v=ldGl6L4Vktk"
    }
  ]
}
---

**Local desktop** is the host environment where the entire MCP stack runs on one machine: the host application (Claude Desktop, an IDE, your own agent), its clients, and the servers they spawn all live on your laptop or workstation. Servers start as subprocesses over **stdio**, and the whole loop — model request, tool call, result — touches your local disk, your shell, and your installed programs. It's the environment where most developers first experience MCP, and where most servers are developed.

This setup matters because it gives an AI agent your working context with zero infrastructure. A locally hosted agent can read the repository you're editing, run your build, query the database on `localhost`, and use credentials already sitting in your environment — things a cloud-hosted agent can't reach without tunnels or replication. Data never leaves the machine except in model API calls, which simplifies privacy, and iteration is instant: edit the server code, restart the host, test again.

In practice you'll run servers with `python server.py`, `node build/index.js`, or package runners like `npx` and `uvx`, wired into the host through its config file. Debug them with the **MCP Inspector** before pointing a real host at them, and remember stdio discipline: log to `stderr`, never `stdout`. When someone remote needs to reach a machine-local service during development, a tunnel like **ngrok** can temporarily expose it — a useful bridge, and a preview of why production workloads move to the remote/cloud model covered next.
