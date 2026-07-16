---
{
  "title": "Autonomy levels and approval gates",
  "module": "ai-agents",
  "order": 19,
  "sources": ["new"],
  "resources": [
    {
      "type": "article",
      "title": "Human-in-the-loop (LangGraph concepts)",
      "url": "https://langchain-ai.github.io/langgraph/concepts/human_in_the_loop/"
    },
    {
      "type": "article",
      "title": "The lethal trifecta for AI agents",
      "url": "https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/"
    }
  ]
}
---

**Autonomy levels** describe how much an agent is allowed to do without a human in the loop — a dial, not a switch. At the low end the agent only suggests and a person executes; one notch up it drafts actions that a human approves before they run; higher still it acts freely within a sandbox but needs sign-off to cross the boundary; at full autonomy it acts and you find out from the logs. Coding agents make the dial concrete: the same tool can run in read-only mode, in ask-before-every-edit mode, or in "auto-accept" mode, and the user slides between them per task. The right level isn't a property of the agent — it's a property of the *action*: reading a calendar and wiring money should never sit at the same setting.

**Approval gates** are the mechanism that implements the dial: checkpoints where the agent pauses, surfaces what it's about to do, and waits for a human yes. The engineering is more subtle than an `if` statement — the agent's state must survive a pause that might last hours (LangGraph's interrupts and checkpointing exist for exactly this), and the approval UI must show enough context that the human can actually judge the action rather than click OK on reflex. Gate on the irreversible and the expensive: outbound emails, payments, deletes, production deploys. Recall the **lethal trifecta** from the security module — an agent combining private-data access, exposure to untrusted content, and the ability to communicate externally; an approval gate on that third leg is often what makes the whole system shippable, because **prompt injection** can steer the model, but it can't click your approve button.

In practice, launch one notch more conservative than feels necessary, then earn autonomy with evidence: every approval a human grants is labeled data, and when the logs show a gate approved 99 percent of the time, that action is a candidate for auto-approval — narrowly, e.g. "emails to internal addresses" rather than "emails." Budget-style gates scale better than per-action ones as trust grows: act freely up to N tool calls or $X of spend, then check in. And design the deny path as carefully as the approve path — a rejected action should feed back into the loop as an observation the agent can re-plan around, not crash the run.
