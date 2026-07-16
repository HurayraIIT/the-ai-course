---
{
  "title": "Hallucination",
  "module": "llm-fundamentals",
  "order": 13,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Reduce hallucinations - Anthropic",
      "url": "https://platform.claude.com/docs/en/test-and-evaluate/strengthen-guardrails/reduce-hallucinations"
    },
    {
      "type": "article",
      "title": "What are AI hallucinations? - IBM",
      "url": "https://www.ibm.com/think/topics/ai-hallucinations"
    }
  ]
}
---

**Hallucination** is when a model produces confident, fluent output that is simply wrong — invented citations, nonexistent API methods, fabricated statistics, plausible-sounding legal precedents that were never decided. It isn't a bug to be patched away; it's a direct consequence of how LLMs work. The model generates the most *probable* next token, not the most *true* one, and it has no built-in mechanism for distinguishing what it knows from what merely sounds right.

If you ship LLM features, hallucination is your primary product risk. A chatbot that invents a refund policy, a coding assistant that imports a package that doesn't exist, a summarizer that adds claims the source never made — these failures erode user trust and can create real legal and security exposure (fake package names have been weaponized in supply-chain attacks). You must design as if some fraction of outputs will be wrong, because they will be. The engineering question is never "how do I eliminate hallucination" but "how do I reduce it and contain the blast radius."

The working toolkit: **grounding** the model with retrieved source material (**RAG**) and instructing it to answer only from that context, explicitly permitting `"I don't know"`, lowering temperature for factual tasks, requiring citations you can verify, validating structured outputs against schemas and real systems (does that function actually exist?), and running **evals** to measure factuality before and after every change. Reasoning models help but do not solve this.
