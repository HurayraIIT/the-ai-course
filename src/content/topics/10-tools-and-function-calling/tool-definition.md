---
{
  "title": "Tool Definition",
  "module": "tools-and-function-calling",
  "order": 1,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What are Tools?",
      "url": "https://huggingface.co/learn/agents-course/en/unit1/tools"
    },
    {
      "type": "article",
      "title": "Understanding the Agent Function in AI: Key Roles and Responsibilities",
      "url": "https://genezio.com/blog/ai-agents-101-understanding-their-role-and-functionality/"
    }
  ]
}
---

A **tool definition** is the contract between your code and the model. It has three parts: a **name** the model uses to request the tool, a **description** explaining what the tool does and when to use it, and an **input schema** — almost always **JSON Schema** — that specifies every parameter, its type, and whether it's required. The model reads these definitions the same way it reads your prompt, so a tool definition is effectively documentation written for an LLM audience.

Definition quality is one of the highest-leverage things you control. A vague description like "gets data" leads to the model calling the wrong tool, hallucinating arguments, or ignoring the tool entirely. A precise one — "Look up a customer's current subscription plan by email address; returns `null` if no account exists" — tells the model what the tool does, what it returns, and its edge cases. Most "the model won't use my tool correctly" bugs are actually definition bugs, fixable without touching model choice or temperature.

In practice you'll write definitions as JSON objects: a `name` like `search_orders`, a multi-sentence `description`, and a `parameters` schema with typed `properties`, `enum` constraints for fixed choices, and a `required` array. You'll iterate on them like prompts — testing whether the model picks the right tool and fills arguments correctly — and keep names unambiguous when several tools live side by side. Get this right and everything downstream in function calling gets easier.
