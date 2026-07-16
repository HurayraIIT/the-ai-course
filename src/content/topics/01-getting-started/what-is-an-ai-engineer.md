---
{
  "title": "What is an AI Engineer?",
  "module": "getting-started",
  "order": 1,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "The Rise of the AI Engineer",
      "url": "https://www.latent.space/p/ai-engineer"
    },
    {
      "type": "article",
      "title": "I Transitioned from Data Science to AI Engineering: Here’s Everything You Need to Know",
      "url": "https://towardsdatascience.com/i-transitioned-from-data-science-to-ai-engineering-heres-everything-you-need-to-know/"
    },
    {
      "type": "article",
      "title": "AI Engineer Job Description",
      "url": "https://resources.workable.com/ai-engineer-job-description"
    }
  ]
}
---

An **AI engineer** is a software developer who builds products on top of **foundation models** — large pretrained models exposed through APIs from providers like OpenAI, Anthropic, and Google, or run locally as open-weight models. The role emerged when capable models became available as a service: suddenly you could add summarization, chat, extraction, or code generation to a product without owning a GPU cluster or a research team. The craft is in integration, not model training. That's also the line between this role and **AI research**: researchers invent and train the models, publishing papers and pushing capabilities; AI engineers take the resulting models and turn them into products. You don't need the research skill set — you need to be a good consumer of its output.

This matters because it is one of the fastest-growing engineering roles, and it is genuinely accessible to working developers. If you can build a web backend, you already have most of the prerequisites. What you add on top is model-specific judgment: writing effective prompts, designing **retrieval** pipelines, orchestrating **agents** and tool calls, evaluating outputs, and managing cost and latency. Companies are hiring for exactly this blend, and data scientists are transitioning into it too — often finding the software engineering half harder than the AI half. The role also changes product economics: features that once required a team of specialists — translation, support triage, document analysis — now cost an API call, which shifts what a small team can ship and how fast an idea can be validated.

Day to day, you will call a chat completions or messages endpoint from your backend, engineer the **system prompt**, wire the model to your database and external tools, build **RAG** pipelines and agent workflows, and write **evals** that catch regressions when you swap models or edit prompts — all while watching **cost, latency, and safety** in production. You will treat the model as a probabilistic dependency: powerful, but needing guardrails, retries, and monitoring. Job descriptions for this role vary wildly — some are rebranded ML engineering, some are product engineering with an LLM attached — so knowing the real scope helps you evaluate roles; the next lesson draws that ML-engineer line precisely.
