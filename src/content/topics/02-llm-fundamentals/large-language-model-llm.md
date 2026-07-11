---
{
  "title": "Large Language Model (LLM)",
  "module": "llm-fundamentals",
  "order": 0,
  "sources": [
    "ai-engineer",
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What is a large language model (LLM)?",
      "url": "https://www.cloudflare.com/en-gb/learning/ai/what-is-large-language-model/"
    },
    {
      "type": "article",
      "title": "New to LLMs? Start Here",
      "url": "https://towardsdatascience.com/new-to-llms-start-here/"
    },
    {
      "type": "video",
      "title": "How Large Language Models Work",
      "url": "https://www.youtube.com/watch?v=5sLYAQS9sWQ"
    },
    {
      "type": "official",
      "title": "LLM - Anthropic Glossary",
      "url": "https://platform.claude.com/docs/en/about-claude/glossary"
    },
    {
      "type": "article",
      "title": "Differences Between Chatbots and LLMs - LearnPrompting",
      "url": "https://learnprompting.org/docs/basics/chatbot_basics"
    }
  ]
}
---

A **large language model (LLM)** is a neural network trained on enormous amounts of text to predict what comes next in a sequence. That single skill — next-word prediction at massive scale — turns out to produce systems that can answer questions, write code, summarize documents, translate languages, and follow instructions. Models like Claude, GPT, Gemini, and Llama are all LLMs. Note the distinction: ChatGPT is a *product* built around a model; the LLM itself is the underlying engine you can call directly through an **API**.

For you as a developer, LLMs are a new kind of computing primitive. Instead of writing explicit logic for every case, you describe what you want in natural language and the model handles ambiguity, unstructured input, and tasks that were previously impractical to code — classification, extraction, generation, conversation. Every AI feature you will build in this course, from a simple summarizer to a multi-step **agent**, sits on top of an LLM.

In practice, you'll interact with LLMs almost entirely through HTTP APIs: send a list of messages, get a completion back. You'll pick a model, write a **system prompt**, pass user input, and handle the response in your app — often streaming it token by token. The rest of this module unpacks what's happening inside that API call: tokens, weights, training, inference, and context.
