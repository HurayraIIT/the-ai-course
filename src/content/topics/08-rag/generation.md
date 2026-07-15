---
{
  "title": "Generation",
  "module": "rag",
  "order": 5,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "video",
      "title": "Retrieval Augmented Generation (RAG) Explained in 8 Minutes!",
      "url": "https://www.youtube.com/watch?v=HREbdmOSQ18"
    }
  ]
}
---

**Generation** is the final stage of the RAG pipeline: you take the retrieved chunks, assemble them into a prompt with the user's question, and call the LLM to produce a grounded answer. The craft here is **prompt assembly** — ordering the context, delimiting each source clearly, and instructing the model to answer *from the provided context* rather than from its own training data, saying so when the context doesn't contain the answer.

This stage decides whether good retrieval turns into a good product. The same retrieved chunks can yield a precise, cited answer or a confident hallucination depending on how you frame the prompt. Generation is also where **groundedness** gets enforced: telling the model to quote or cite its sources, to admit gaps, and to ignore irrelevant chunks is what makes RAG trustworthy enough for support bots, legal tools, and anything user-facing. It is also where your token budget and latency are spent, so sloppy assembly costs real money.

In practice you will write a system prompt that wraps context in clear delimiters (numbered sources or XML-style tags), instructs "answer only from the context; if it's not there, say you don't know," and requests **citations** back to chunk IDs. You will cap how many chunks you include, order the strongest matches where the model attends best, stream the response for perceived speed, and evaluate outputs for **faithfulness** — checking that every claim in the answer traces back to a retrieved source.
