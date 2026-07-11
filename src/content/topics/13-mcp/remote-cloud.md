---
{
  "title": "Remote / Cloud",
  "module": "mcp",
  "order": 11,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Edge AI vs. Cloud AI: Real-Time Intelligence Models",
      "url": "https://medium.com/@hassaanidrees7/edge-ai-vs-cloud-ai-real-time-intelligence-vs-centralized-processing-df8c6e94fd11"
    },
    {
      "type": "article",
      "title": "Cloud AI vs. On-premises AI",
      "url": "https://www.pluralsight.com/resources/blog/ai-and-data/ai-on-premises-vs-in-cloud"
    },
    {
      "type": "article",
      "title": "Cloud vs On-Premises AI Deployment",
      "url": "https://toxigon.com/cloud-vs-on-premises-ai-deployment"
    }
  ]
}
---

**Remote/cloud** is the host environment where your AI system runs on infrastructure instead of a desktop: the agent lives in a backend service, its MCP servers are deployed as web endpoints, and users reach it through a browser, a Slack bot, or an API. Nothing depends on any one person's machine — the same trade-off, made at the deployment level, that the protocol makes at the transport level with **streamable HTTP** versus **stdio**.

This is the environment production AI software actually ships in. Cloud hosting gives you elasticity (scale agents and servers with load), centralized control (one place for credentials, logging, and access policy), always-on availability, and multi-tenancy — one deployed MCP server serving your whole company or customer base. The costs are real too: per-request latency, ongoing compute spend, and the compliance questions that come with sending data off-premises, which is why regulated teams sometimes keep inference or sensitive tools on-premises in a hybrid split.

In practice you'll deploy MCP servers with the streamable HTTP transport to whatever runs stateless web services well — Cloudflare Workers, Vercel, AWS Lambda, or a container on Fly.io or Cloud Run — fronted by **OAuth 2.1** for authorization. The agent side runs as a normal backend service that instantiates MCP clients over HTTP and calls model APIs. Because MCP separates the data layer from deployment, the server you built and tested locally over stdio moves to the cloud by swapping its transport and adding auth, not by rewriting its tools.
