---
{
  "title": "Recommendation Systems",
  "module": "embeddings-and-vector-databases",
  "order": 11,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What Role does AI Play in Recommendation Systems and Engines?",
      "url": "https://www.algolia.com/blog/ai/what-role-does-ai-play-in-recommendation-systems-and-engines/"
    },
    {
      "type": "article",
      "title": "What is a Recommendation Engine?",
      "url": "https://www.ibm.com/think/topics/recommendation-engine"
    }
  ]
}
---

A **recommendation system** suggests items — products, articles, videos, songs — a user is likely to want next. Classical approaches split into **collaborative filtering** ("users like you also liked...") and **content-based filtering** ("this is similar to what you just viewed"). Embeddings modernize both: represent every item as a vector, represent a user as an aggregate of the vectors they've engaged with, and recommending becomes a nearest-neighbor query — exactly the operation you've already learned.

This reframing matters because it means you don't need a dedicated ML team to ship useful recommendations. If you have item embeddings in a vector database for search, you're one query away from "related articles," "similar products," and "customers also viewed" features. Embedding-based recommendations also sidestep the **cold-start problem** for new items: a product with zero interaction history still has a description, and a description still embeds, so it's recommendable from day one.

Concretely, you'll embed item content (titles, descriptions, transcripts) and store the vectors with metadata. "Similar items" is a `top_k` query using an item's own vector, excluding itself. For personalization, average the embeddings of a user's recent interactions into a taste vector and query with that, then filter out already-seen items with metadata filters. From there you can layer on business rules, freshness boosts, or an LLM to explain *why* something was recommended.
