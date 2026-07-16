---
{
  "title": "AI Engineer vs ML Engineer",
  "module": "getting-started",
  "order": 2,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Machine Learning vs AI Engineer: What Are the Differences?",
      "url": "https://towardsdatascience.com/machine-learning-vs-ai-engineer-no-confusing-jargon/"
    },
    {
      "type": "article",
      "title": "What is an ML Engineer?",
      "url": "https://www.coursera.org/articles/what-is-machine-learning-engineer"
    }
  ]
}
---

AI engineers and ML engineers sound interchangeable, but the roles sit on opposite sides of the model. An **ML engineer** builds and ships models: collecting data, training and fine-tuning, optimizing inference, and running **MLOps** pipelines. An **AI engineer** consumes models — usually foundation models someone else trained — and turns them into product features using prompts, retrieval, agents, and ordinary backend code. One role is model-producing, the other is model-applying.

The distinction matters because it determines what you need to learn and what you can skip. If your goal is AI engineering, you do not need deep calculus, PyTorch internals, or distributed training experience to be productive. You do need strong software fundamentals, API fluency, and judgment about model behavior. Mixing the two up leads people to grind through ML theory they will rarely use, or to apply for roles expecting the wrong skill set. It also shapes team design: many companies pair a small ML team (or none at all) with a larger group of AI engineers shipping features.

In practice, you will feel the boundary whenever a task exceeds what prompting can fix. You will handle prompt design, `function calling`, RAG pipelines, and evals yourself; when a problem truly needs a custom-trained model, you will scope it and hand it to ML specialists — or use a managed **fine-tuning** API, which keeps even that workflow inside AI engineering territory. Knowing which side of the line a problem falls on is itself a core skill.
