---
{
  "title": "Introduction",
  "module": "getting-started",
  "order": 0,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "AI Engineering",
      "url": "https://en.wikipedia.org/wiki/Artificial_intelligence_engineering"
    },
    {
      "type": "video",
      "title": "AI vs Machine Learning",
      "url": "https://www.youtube.com/watch?v=4RixMPF4xis"
    },
    {
      "type": "video",
      "title": "AI vs Machine Learning vs Deep Learning vs GenAI",
      "url": "https://youtu.be/qYNweeDHiyU?si=eRJXjtk8Q-RKQ8Ms"
    },
    {
      "type": "article",
      "title": "What is Generative AI? - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/generative_ai"
    }
  ]
}
---

This course teaches you **AI engineering**: building real software on top of large language models and other foundation models. Before diving in, you need the vocabulary straight. **Artificial intelligence** is the broad field of making machines perform tasks that require intelligence. **Machine learning** is the subset where systems learn patterns from data instead of following hand-written rules. **Deep learning** narrows that to neural networks, and **generative AI** is the newest layer: models like GPT, Claude, and Gemini that produce text, images, and code rather than just classifying inputs.

These distinctions matter because they define what you will actually do on the job. You will not be training models from scratch or tuning gradient descent. Instead, you will consume powerful pretrained models through APIs and shape their behavior with prompts, retrieval, and tooling. Knowing where generative AI sits inside the larger ML landscape helps you talk to data scientists, evaluate vendor claims, and recognize which problems need a fine-tuned classifier versus a well-prompted LLM.

In practice, this module sets up everything that follows. You will call model APIs over HTTP, send a prompt in a JSON payload, and handle a generated response in your own backend code. Later modules build on this foundation with agents, advanced prompting, and context engineering. Start here, get the mental model right, and the rest of the course will feel like assembling familiar pieces rather than learning magic.
