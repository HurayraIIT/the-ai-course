---
{
  "title": "Anthropic Claude",
  "module": "model-landscape",
  "order": 2,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "course",
      "title": "Claude 101",
      "url": "https://anthropic.skilljar.com/claude-101"
    },
    {
      "type": "official",
      "title": "Claude",
      "url": "https://claude.ai/"
    },
    {
      "type": "video",
      "title": "How To Use Claude Pro For Beginners",
      "url": "https://www.youtube.com/watch?v=J3X_JWQkvo8"
    },
    {
      "type": "video",
      "title": "Claude FULL COURSE 1 HOUR (Build & Automate Anything)",
      "url": "https://www.youtube.com/watch?v=KrKhfm2Xuho"
    },
    {
      "type": "roadmap",
      "title": "Visit the Dedicated Claude Code Roadmap",
      "url": "https://roadmap.sh/claude-code"
    },
    {
      "type": "official",
      "title": "Claude API Documentation",
      "url": "https://docs.anthropic.com/en/docs/intro"
    },
    {
      "type": "official",
      "title": "Anthropic Research",
      "url": "https://www.anthropic.com/research"
    }
  ]
}
---

**Claude** is the family of large language models built by **Anthropic**, an AI safety company founded by former OpenAI researchers. Claude ships as a consumer chat app, a developer API, and **Claude Code**, an agentic coding tool that works in your terminal. The models come in tiers trading capability against speed and cost, and they've earned a reputation for strong writing, careful instruction-following, long-context document work, and — especially — software engineering tasks.

Claude matters to you as a builder for two reasons. First, it's a top-tier engine for coding and agentic workflows: many AI-assisted development tools and autonomous agents are built on Claude because it handles long, multi-step tasks reliably and uses tools well. Second, Anthropic's safety-first approach — including its published research on **constitutional AI** and model interpretability — shapes how the model refuses, hedges, and follows system prompts, which you need to understand to prompt it effectively. Having a serious alternative to OpenAI also gives you negotiating room on quality, price, and availability.

In practice, you'll call the **Messages API** with an `x-api-key` header, a model name, and a list of user/assistant turns, with a separate `system` prompt for instructions. You'll use streaming for chat UIs, **tool use** to let Claude call your functions, and **prompt caching** to cut costs when reusing long contexts. Claude is also available through AWS Bedrock and Google Cloud Vertex AI if your infrastructure already lives there.
