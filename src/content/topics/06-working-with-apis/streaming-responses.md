---
{
  "title": "Streaming Responses",
  "module": "working-with-apis",
  "order": 8,
  "sources": [
    "ai-engineer",
    "ai-agents"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Streaming Responses in AI: How AI Outputs Are Generated in Real Time",
      "url": "https://dev.to/pranshu_kabra_fe98a73547a/streaming-responses-in-ai-how-ai-outputs-are-generated-in-real-time-18kb"
    },
    {
      "type": "article",
      "title": "Streaming vs Non-Streaming LLM Responses",
      "url": "https://medium.com/@vasanthancomrads/streaming-vs-non-streaming-llm-responses-db297ba5467e"
    },
    {
      "type": "article",
      "title": "AI for Web Devs: Faster Responses with HTTP Streaming",
      "url": "https://austingil.com/ai-for-web-devs-streaming/"
    },
    {
      "type": "article",
      "title": "Master the OpenAI API: Stream Responses",
      "url": "https://www.toolify.ai/gpts/master-the-openai-api-stream-responses-139447"
    }
  ]
}
---

**Streaming** means the API sends the model's output incrementally — token by token, as it is generated — instead of making you wait for the complete response. Providers implement it over **server-sent events (SSE)**: you set `stream: true` on the request and receive a sequence of small event chunks, each carrying a delta of text (or a tool-call fragment), ending with a completion event.

The reason to care is perceived latency. A long answer might take fifteen seconds to finish, but the first tokens can arrive in well under a second; streaming turns a frozen spinner into visible progress, which is why every serious chat interface uses it. The metric that matters shifts from total time to **time to first token**. Streaming also lets you act early — start rendering markdown, kick off text-to-speech, or cancel a generation that is going wrong without paying for the rest.

In practice, the SDKs make consumption easy: you iterate the response as an async iterator (`for await (const event of stream)`), accumulate deltas into your UI, and handle the final event that carries `usage` and the stop reason. The harder part is plumbing it through your own stack — your backend must forward chunks to the browser via SSE or a framework helper rather than buffering, and your parsing logic (JSON extraction, tool-call assembly) must tolerate partial data.
