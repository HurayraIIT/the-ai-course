---
{
  "title": "Data Classification",
  "module": "embeddings-and-vector-databases",
  "order": 10,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What Is Data Classification?",
      "url": "https://www.paloaltonetworks.com/cyberpedia/data-classification"
    },
    {
      "type": "video",
      "title": "Text Embeddings, Classification, and Semantic Search (w/ Python Code)",
      "url": "https://www.youtube.com/watch?v=sNa_uiqSlJo"
    }
  ]
}
---

**Classification** with embeddings means assigning a label — spam or not, urgent or routine, billing versus technical — by using vectors as the input features. Because an embedding already encodes meaning, a remarkably simple classifier on top of it works well: embed your labeled examples, embed the new item, and either check which labeled examples it lands nearest to (**k-nearest neighbors**) or train a lightweight model like **logistic regression** on the vectors.

This approach matters because it sits in the sweet spot between rule-based systems and LLM calls. Rules are brittle; sending every item through a large model is slow and costs tokens. Embedding-based classification is fast, cheap, and needs surprisingly little labeled data — often a few dozen examples per class — making it ideal for routing support tickets, moderating content, tagging documents by sensitivity, or deciding which prompt template an agent should use. It's also how many production systems triage *before* involving an LLM at all.

The workflow you'll build: embed a labeled dataset with any model from this module, split into train and test sets, fit a classifier in a few lines of `scikit-learn` (`LogisticRegression().fit(X_train, y_train)`), and evaluate accuracy. For the zero-training variant, embed one description per category and classify by highest cosine similarity. Both patterns reuse your existing embedding pipeline — no new infrastructure, just a different question asked of the same vectors.
