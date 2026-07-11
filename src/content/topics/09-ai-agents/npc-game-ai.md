---
{
  "title": "NPC / Game AI",
  "module": "ai-agents",
  "order": 6,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Unity – AI for NPCs",
      "url": "https://dev.epicgames.com/documentation/en-us/unreal-engine/artificial-intelligence-in-unreal-engine?application_version=5.3"
    },
    {
      "type": "article",
      "title": "AI-Driven NPCs: The Future of Gaming Explained",
      "url": "https://www.capermint.com/blog/everything-you-need-to-know-about-non-player-character-npc/"
    }
  ]
}
---

**NPC agents** bring LLM-driven behavior to non-player characters in games. Classic game AI runs on **behavior trees** and finite state machines — fast, predictable, and completely scripted. An LLM-backed NPC instead gets a persona, a memory of what it has seen, and a set of in-game actions it can take, then improvises: unscripted dialogue, reactions to things the designers never anticipated, and goals it pursues across a play session. Research like the Stanford "generative agents" experiment showed characters that form memories, make plans, and even coordinate with each other.

For a developer, games are a brutally honest testbed for agent design. You face hard **latency** budgets (a character can't think for eight seconds mid-conversation), per-interaction **cost** at scale, and the need to constrain a creative model inside game rules — the same problems as production agents, amplified. The hybrid pattern that emerges, deterministic systems for moment-to-moment control with an LLM for dialogue and high-level decisions, mirrors how you should blend code and model everywhere.

In practice, you'll give each NPC a persona prompt, a rolling memory store scored by recency and importance, and a constrained action interface — the model picks from actions like `move_to`, `speak`, or `trade` via structured output rather than free text. You'll cache common exchanges, fall back to scripted lines when the model is slow, and run cheaper models for background characters. Engines like Unity and Unreal handle pathfinding and animation; your agent layer decides what the character wants.
