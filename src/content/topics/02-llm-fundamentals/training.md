---
{
  "title": "Training",
  "module": "llm-fundamentals",
  "order": 5,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is Model Training?",
      "url": "https://oden.io/glossary/model-training/"
    },
    {
      "type": "article",
      "title": "Machine learning model training: What it is and why it’s important",
      "url": "https://domino.ai/blog/what-is-machine-learning-model-training"
    },
    {
      "type": "article",
      "title": "Training ML Models - Amazon",
      "url": "https://docs.aws.amazon.com/machine-learning/latest/dg/training-ml-models.html"
    }
  ]
}
---

**Training** is the process that turns a randomly initialized neural network into a useful model: show it examples, measure how wrong its predictions are with a **loss function**, and nudge the weights via **gradient descent** to be slightly less wrong — repeated billions of times. For LLMs this happens in stages: large-scale pretraining on internet-scale text, then post-training steps like instruction tuning and reinforcement learning from human feedback (**RLHF**) that shape a raw text predictor into a helpful assistant.

You will almost certainly never train an LLM from scratch — frontier-scale runs cost tens to hundreds of millions of dollars in compute. But understanding training explains the properties of every model you use: why it has a **knowledge cutoff** (it only saw data up to a certain date), why it reflects biases in its data, why it's fluent in some domains and shaky in others, and why "the model learned it during training" is fundamentally different from "you told it in the prompt." That last distinction — weights versus context — is the most important mental split in this module.

In practice, this knowledge guides architecture decisions: when a capability gap is best closed with prompting, when with retrieval, and when with **fine-tuning** (covered shortly, and the only kind of training you're likely to run yourself). It also makes you a sharper reader of model cards, which describe training data and methods.
