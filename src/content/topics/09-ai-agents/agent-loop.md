---
{
  "title": "Agent Loop",
  "module": "ai-agents",
  "order": 9,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is an Agent Loop?",
      "url": "https://huggingface.co/learn/agents-course/en/unit1/agent-steps-and-structure"
    },
    {
      "type": "article",
      "title": "Let's Build your Own Agentic Loop",
      "url": "https://www.reddit.com/r/AI_Agents/comments/1js1xjz/lets_build_our_own_agentic_loop_running_in_our/"
    }
  ]
}
---

The **agent loop** is the control structure at the heart of every agent: a cycle of **perceive → reason → act → observe** that repeats until the task is done. The agent takes in the current state (the user's request plus everything that has happened so far), decides on the next step, executes it — usually a tool call — then feeds the result back into its context and goes around again. Everything marketed as "agentic AI" reduces to this `while` loop wrapped around an LLM call.

Understanding the loop matters because it's the part you own. The model provider gives you reasoning; you write the loop that turns reasoning into a working system. Every production concern lives here: when to stop, how to cap **iterations** so a confused agent doesn't burn your API budget, how to handle a tool that throws, what to persist between turns, and where a human approval step belongs. Debug an agent and you're really debugging its loop — replaying the sequence of decisions and observations to find where the context went wrong.

In practice, the skeleton is short: append the user message to a `messages` array, call the model with your tool definitions, and branch on the response — if it's a final answer, return it; if it's a tool call, execute the tool, append the result, and loop. Add a `max_turns` guard, structured logging of every step, and error results fed back as observations. The next four topics dissect each stage of this cycle in turn.
