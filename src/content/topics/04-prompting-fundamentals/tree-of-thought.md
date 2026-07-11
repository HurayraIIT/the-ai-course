---
{
  "title": "Tree-of-Thought",
  "module": "prompting-fundamentals",
  "order": 19,
  "sources": [
    "ai-agents",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Tree of Thoughts (ToT) | Prompt Engineering Guide",
      "url": "https://www.promptingguide.ai/techniques/tot"
    },
    {
      "type": "article",
      "title": "What is tree-of-thoughts? - IBM",
      "url": "https://www.ibm.com/think/topics/tree-of-thoughts"
    },
    {
      "type": "article",
      "title": "The Revolutionary Approach of Tree-of-Thought Prompting in AI",
      "url": "https://medium.com/@WeavePlatform/the-revolutionary-approach-of-tree-of-thought-prompting-in-ai-eb7c0872247b"
    }
  ]
}
---

**Tree-of-thought (ToT)** extends chain-of-thought from a single reasoning path into a branching search. Instead of committing to one line of thinking, the model generates several candidate approaches at each step, **evaluates** which look promising, pursues the good ones further, and abandons dead ends — the way you'd actually work through a hard problem, with backtracking. Where CoT is one chain, ToT is many chains explored and pruned.

This matters for the class of problems where the first plausible approach is often wrong: planning, puzzles, constraint satisfaction, architectural decisions, anything where you'd naturally say "let's consider a few options before deciding." A CoT model that starts down a bad path tends to rationalize its way to a bad answer; ToT's explore-evaluate-prune loop catches that early. The price is steep — many model calls or a much longer generation per answer — so it's a deliberate quality-over-cost trade, not a default. It also foreshadows how **agents** work: generate options, assess, choose, backtrack.

In practice, you'll use one of two forms. The lightweight version is a single prompt: "Propose three distinct approaches to this problem, evaluate the strengths and weaknesses of each, then pursue the best one step by step." The full version is orchestration code — a loop that calls the API to generate branches, calls it again to score them, and expands only the top candidates. Reserve it for high-stakes reasoning where a wrong answer costs more than the extra tokens.
