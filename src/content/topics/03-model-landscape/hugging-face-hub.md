---
{
  "title": "Hugging Face Hub",
  "module": "model-landscape",
  "order": 15,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "course",
      "title": "The Hugging Face Hub (LLM Course)",
      "url": "https://huggingface.co/learn/nlp-course/en/chapter4/1"
    },
    {
      "type": "official",
      "title": "Hugging Face Documentation",
      "url": "https://huggingface.co/docs/hub/en/index"
    }
  ]
}
---

The **Hugging Face Hub** is the infrastructure underneath the Hugging Face website: a giant collection of **Git repositories**, one per model, dataset, or Space. Each model repo holds the weight files, configuration, tokenizer, and a **model card** (`README.md`) documenting what the model does, how it was trained, and its license. Because it's Git, everything is versioned — you can pin a revision, diff changes, open discussions, and submit pull requests to someone else's model.

The Hub matters to you because it makes model artifacts behave like code, which is exactly how production systems need them to behave. Pinning an exact model revision means a silent upstream update can't change your app's behavior overnight. Private repos and organization accounts give your team a shared, access-controlled registry for internal fine-tunes — the same role a package registry plays for your libraries. And the Hub's discussion threads and community tabs are often where you'll find the fix for a loading error or a quantized variant that fits your GPU.

In practice, you'll work with the `huggingface_hub` Python library: `login()` with your access token, `snapshot_download()` to fetch a model into your local cache, and `upload_folder()` or `push_to_hub()` to publish your own. Libraries like `transformers` handle this transparently — passing a model ID triggers a cached Hub download — so understanding the Hub explains where those gigabytes actually live and how to control them.
