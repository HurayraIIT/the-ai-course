---
{
  "title": "Role Prompting",
  "module": "prompting-fundamentals",
  "order": 9,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Assigning Roles to Chatbots - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/roles"
    },
    {
      "type": "article",
      "title": "Role Prompting - LearnPrompting",
      "url": "https://learnprompting.org/docs/advanced/zero_shot/role_prompting"
    },
    {
      "type": "video",
      "title": "Context Engineering vs. Prompt Engineering: Smarter AI with RAG & Agents",
      "url": "https://youtu.be/vD0E3EUb8-8?si=9orzEniOGmRD7g-o&t=136"
    }
  ]
}
---

**Role prompting** assigns the model an identity before giving it a task: "You are a senior security engineer reviewing a pull request" or "You are a patient math tutor for ten-year-olds." Where a system prompt defines the rules of your application, a role defines a *perspective* — and the model responds by adopting the vocabulary, priorities, and judgment associated with that persona in its training data.

The reason this works is that an LLM has absorbed writing from every skill level and profession at once, and a bare prompt averages across all of them. Naming a role narrows the distribution. Ask "review this code" and you get generic comments; ask as a **persona** — "you are a staff engineer who cares about race conditions and error handling" — and the review starts flagging the things that persona would actually catch. It's a one-line change with outsized effect on quality and focus, though it's a lens, not a knowledge upgrade: a model role-playing a lawyer is still not a lawyer.

You'll typically put the role at the top of the system prompt: `You are a {role} with expertise in {domain}. Your priority is {goal}.` Be concrete — "senior Django developer who insists on test coverage" beats "coding expert" — and match the role to the audience as well as the task. The next topic goes a step further, pairing the role with explicit behavioral rules.
