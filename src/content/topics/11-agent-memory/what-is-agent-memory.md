---
{
  "title": "What is Agent Memory?",
  "module": "agent-memory",
  "order": 0,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Agentic Memory for LLM Agents",
      "url": "https://arxiv.org/abs/2502.12110"
    },
    {
      "type": "article",
      "title": "Memory Management in AI Agents",
      "url": "https://python.langchain.com/docs/how_to/chatbots_memory/"
    },
    {
      "type": "article",
      "title": "Storing and Retrieving Knowledge for Agents",
      "url": "https://www.pinecone.io/learn/langchain-retrieval-augmentation/"
    },
    {
      "type": "article",
      "title": "Short-Term vs Long-Term Memory in AI Agents",
      "url": "https://adasci.org/short-term-vs-long-term-memory-in-ai-agents/"
    },
    {
      "type": "video",
      "title": "Building Brain-Like Memory for AI Agents",
      "url": "https://www.youtube.com/watch?v=VKPngyO0iKg"
    }
  ]
}
---

**Agent memory** is everything an AI agent knows beyond the current prompt: the running conversation, facts learned about the user, outcomes of past tasks, and knowledge accumulated across sessions. LLMs are stateless — every API call starts from zero — so any sense of continuity is something *you* build. Memory is the set of systems that capture, store, and re-inject the right information at the right moment, typically layered as **short-term memory** (the active context window) and **long-term memory** (persistent storage the agent reads and writes).

Memory is what separates a chatbot demo from an agent people rely on. Without it, your agent re-asks answered questions, repeats failed approaches, forgets preferences mid-project, and cannot learn from experience. With it, an agent picks up work where it left off, personalizes to each user, and improves over time. Because context windows are finite and tokens cost money, memory is also an economics problem: deciding what deserves space in the prompt is one of the highest-leverage design decisions in agentic systems.

In practice you will treat memory as a read-write pipeline around every model call: before the call, load relevant memories (recent turns, retrieved facts, a user profile) into the prompt; after it, extract what is worth keeping and persist it to a store — a database, vector index, or plain files. The rest of this module covers each layer: short-term vs long-term, episodic vs semantic, external stores, user profiles, compression, and knowing when to forget.
