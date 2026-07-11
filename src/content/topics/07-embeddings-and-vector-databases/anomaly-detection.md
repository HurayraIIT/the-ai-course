---
{
  "title": "Anomaly Detection",
  "module": "embeddings-and-vector-databases",
  "order": 12,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Anomaly in Embeddings",
      "url": "https://ai.google.dev/gemini-api/tutorials/anomaly_detection"
    },
    {
      "type": "article",
      "title": "Boosting Your Anomaly Detection With LLMs",
      "url": "https://towardsdatascience.com/boosting-your-anomaly-detection-with-llms/"
    }
  ]
}
---

**Anomaly detection** with embeddings flips the similarity question around: instead of asking "what is closest to this?", you ask "is this far from everything?" Embed your normal data — support tickets, log lines, transactions, user messages — and typical items form dense clusters in vector space. A new item whose nearest neighbors are unusually *distant* is an **outlier**, and outliers are often exactly what you're hunting: fraud, abuse, novel bugs, off-topic input.

For a developer, this is one of the most practical low-effort wins in the module. You get an anomaly detector without labeled anomalies — crucial, because anomalies are by definition rare and unpredictable, so you can rarely train a supervised model on them. Real uses include flagging prompts that look nothing like your app's normal traffic (a cheap prompt-injection tripwire), surfacing new categories of customer complaints, catching data-pipeline corruption, and spotting log messages that have never occurred before.

Implementation is a natural extension of tools you already have: embed a baseline corpus of normal items, then for each new item compute its distance to its k nearest neighbors (or to a cluster centroid) and flag anything beyond a threshold you calibrate on held-out data. You can visualize clusters by projecting embeddings to 2D with **UMAP** or **t-SNE** to sanity-check the structure, and layer an LLM on top to *explain* why a flagged item looks unusual before a human reviews it.
