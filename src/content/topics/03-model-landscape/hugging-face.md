---
{
  "title": "Hugging Face",
  "module": "model-landscape",
  "order": 12,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "course",
      "title": "Hugging Face Official Video Course",
      "url": "https://www.youtube.com/watch?v=00GKzGyWFEs&list=PLo2EIpI_JMQvWfQndUesu0nPBAtZ9gP1o"
    },
    {
      "type": "official",
      "title": "Hugging Face",
      "url": "https://huggingface.co/"
    },
    {
      "type": "video",
      "title": "What is Hugging Face? - Machine Learning Hub Explained",
      "url": "https://www.youtube.com/watch?v=1AUjKfpRZVo"
    }
  ]
}
---

**Hugging Face** is the home base of open machine learning — often called the "GitHub of AI." It's a company and a platform where the community shares over a million **models**, hundreds of thousands of **datasets**, and interactive demo apps called **Spaces**. Around that platform, Hugging Face maintains the open-source libraries that much of modern ML runs on, most famously `transformers`, which gives you a uniform Python interface to thousands of pretrained models.

For you as a builder, Hugging Face matters because it's where everything outside the big proprietary APIs actually lives. When Meta, Google, Mistral, Alibaba, or DeepSeek release open weights, they land here; when a researcher fine-tunes a model for your exact niche, it lands here too. Being fluent with the platform means you can evaluate a model's **model card** and license before committing, try a live demo in a Space without installing anything, and pull the weights the moment you decide to build. It's also the reference point recruiters and teams expect an AI engineer to know.

In practice, you'll create a free account, generate an access token, and start pulling models: `pip install transformers`, then load a model by its `org/model-name` ID in a couple of lines. You'll browse leaderboards to shortlist candidates, check Spaces for working examples, and eventually push your own fine-tuned models and datasets back up for your team to share.
