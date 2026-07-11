---
{
  "title": "Be specific in what you want",
  "module": "prompting-fundamentals",
  "order": 2,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Prompt Engineering Guide",
      "url": "https://www.promptingguide.ai/"
    },
    {
      "type": "article",
      "title": "AI Prompting Examples, Templates, and Tips For Educators",
      "url": "https://honorlock.com/blog/education-ai-prompt-writing/"
    },
    {
      "type": "article",
      "title": "How to Ask AI for Anything: The Art of Prompting",
      "url": "https://sixtyandme.com/using-ai-prompts/"
    }
  ]
}
---

**Specificity** is the first and highest-leverage rule of prompt writing: say exactly what you want, for whom, and under what conditions. A vague ask like "improve this code" forces the model to guess your intent; a specific one — "refactor this function to remove the nested callbacks, keep the public signature unchanged, and target Node 22" — removes the guesswork. Models don't read minds; they fill ambiguity with the statistically average interpretation, which is rarely the one you meant.

When you're building AI features, vagueness compounds. A prompt that is 80% clear produces output that is wrong 20% of the time, and in production that means bug reports, retries, and burned tokens. Ambiguous prompts are also impossible to debug: if you never defined success precisely, you can't tell whether a bad output is a model failure or a **specification failure**. Most "the model is dumb" complaints are actually underspecified prompts.

In practice, you'll audit your prompts for hidden assumptions before shipping them. State the task, the audience, the scope, and the edge cases explicitly: `Classify each support ticket as billing, bug, or feature-request. If a ticket fits none, output "other" — never invent a new label.` Replace adjectives like "short" or "professional" with measurable terms, name what to exclude as well as include, and spell out how to handle inputs that don't match expectations.
