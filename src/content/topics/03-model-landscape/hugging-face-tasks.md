---
{
  "title": "Hugging Face Tasks",
  "module": "model-landscape",
  "order": 14,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Task and Model",
      "url": "https://huggingface.co/learn/computer-vision-course/en/unit4/multimodal-models/tasks-models-part1"
    },
    {
      "type": "official",
      "title": "Task Summary",
      "url": "https://huggingface.co/docs/transformers/v4.14.1/en/task_summary"
    },
    {
      "type": "official",
      "title": "Task Manager",
      "url": "https://huggingface.co/docs/optimum/en/exporters/task_manager"
    }
  ]
}
---

**Tasks** are Hugging Face's organizing taxonomy for machine learning: a standardized vocabulary of problem types like `text-classification`, `summarization`, `question-answering`, `text-to-image`, `automatic-speech-recognition`, and dozens more, spanning NLP, vision, audio, and multimodal work. Every model on the platform declares which task it solves, and every task has a dedicated page explaining what it is, which models are popular for it, and how to call them.

Thinking in tasks matters because it changes how you approach problems. Untrained instinct says "send everything to a big LLM"; the task mindset asks "what is this problem actually called, and is there a model built specifically for it?" Framing your feature as a known task — is extracting names from text `token-classification`? is matching support tickets to answers `sentence-similarity`? — instantly connects you to purpose-built models, benchmark datasets, and evaluation conventions, and often reveals a solution that's faster and far cheaper than general-purpose generation.

Practically, the task name is a literal API parameter: `pipeline("zero-shot-classification")` in Python `transformers` hands you a working classifier, and the same tags drive model search filters, Inference API routing, and export tooling like Optimum. Your workflow becomes: name the task, open its task page, try the top few models on your own data, and only fall back to prompting a large LLM when no dedicated task model fits.
