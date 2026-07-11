---
{
  "title": "Multimodal AI",
  "module": "multimodal-ai",
  "order": 0,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "A Multimodal World - Hugging Face",
      "url": "https://huggingface.co/learn/computer-vision-course/en/unit4/multimodal-models/a_multimodal_world"
    },
    {
      "type": "article",
      "title": "Multimodal AI - Google",
      "url": "https://cloud.google.com/use-cases/multimodal-ai?hl=en"
    },
    {
      "type": "article",
      "title": "What Is Multimodal AI? A Complete Introduction",
      "url": "https://www.splunk.com/en_us/blog/learn/multimodal-ai.html"
    }
  ]
}
---

**Multimodal AI** refers to models that work across more than one kind of data — text, images, audio, and video — instead of being locked to a single input and output type. A multimodal model can look at a screenshot and describe it, listen to a recording and answer questions about it, or take a text prompt and produce a picture. Under the hood, these systems map every modality into a shared representation, so the model reasons about a photo of a chart the same way it reasons about a sentence describing that chart.

This matters because real applications are rarely text-only. Your users upload receipts, record voice memos, share screenshots, and expect your software to make sense of all of it. Until recently that meant stitching together separate OCR, speech, and vision services with brittle glue code. With modern **frontier models**, one API call handles the cross-modal reasoning, which collapses entire pipelines into a single prompt and dramatically lowers the cost of shipping features that see and hear.

In this module you'll move from concept to working code. You'll send images to vision-capable chat endpoints, generate images with the **DALL·E** and **Nano Banana** APIs, transcribe audio with **Whisper**, synthesize speech, and reason over video. Then you'll wire those capabilities into full applications using **LangChain** and **LlamaIndex**, building pipelines where one modality flows into another — audio in, structured text out, generated image back.
