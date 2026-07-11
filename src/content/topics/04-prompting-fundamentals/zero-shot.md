---
{
  "title": "Zero-Shot",
  "module": "prompting-fundamentals",
  "order": 16,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is zero-shot prompting?",
      "url": "https://www.ibm.com/think/topics/zero-shot-prompting"
    },
    {
      "type": "article",
      "title": "Zero-Shot Prompting",
      "url": "https://www.promptingguide.ai/techniques/zeroshot"
    },
    {
      "type": "video",
      "title": "Zero-shot, One-shot and Few-shot Prompting Explained | Prompt Engineering 101",
      "url": "https://www.youtube.com/watch?v=sW5xoicq5TY"
    },
    {
      "type": "article",
      "title": "Introduction to Zero-Shot Techniques - LearnPrompting",
      "url": "https://learnprompting.org/docs/advanced/zero_shot/introduction"
    }
  ]
}
---

**Zero-shot prompting** means asking the model to perform a task with no examples at all — just the instruction. "Classify this review as positive or negative," "Translate this to Spanish," "Extract the dates from this email." The "shot" in the name counts demonstrations: zero-shot gives none, relying entirely on what the model learned during training and how clearly you describe the task.

This is your baseline, and it's more capable than you might expect. Modern instruction-tuned models handle a huge range of tasks zero-shot, which makes it the cheapest option on every axis: fewest tokens, lowest latency, no example set to curate and maintain. The engineering discipline is to *start* here — write the clearest zero-shot prompt you can, measure it against real inputs, and only add complexity when you've proven the simple version falls short. Many teams jump straight to elaborate prompts and never learn that a well-worded instruction would have sufficed.

In practice, a strong zero-shot prompt states the task, the input, and the expected output format explicitly: "Classify the following support ticket into `billing`, `technical`, or `other`. Respond with only the label." Add a **role**, spell out **constraints**, and name the output format — precision substitutes for examples. When zero-shot output is inconsistent in *format* or wrong on *edge cases*, that's your cue to move to **few-shot** prompting, covered next.
