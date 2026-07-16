---
{
  "title": "Data Privacy + PII Redaction",
  "module": "security-safety-and-ethics",
  "order": 7,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "GDPR Compliance Overview",
      "url": "https://gdpr.eu/"
    },
    {
      "type": "article",
      "title": "Protect Sensitive Data with PII Redaction Software",
      "url": "https://redactor.ai/blog/pii-redaction-software-guide"
    },
    {
      "type": "article",
      "title": "A Complete Guide on PII Redaction",
      "url": "https://enthu.ai/blog/what-is-pii-redaction/"
    }
  ]
}
---

**PII redaction** is the practice of detecting and stripping **personally identifiable information** — names, emails, phone numbers, addresses, government IDs, payment details — from text before it reaches an LLM, a log file, or a training dataset. In an AI application, user data flows through more places than you might realize: the prompt sent to a third-party API, provider-side logs, your own observability traces, cached responses, and any dataset you later fine-tune on. Data privacy means controlling every one of those flows.

The stakes are legal as much as technical. **GDPR**, CCPA, and HIPAA don't care that the data left your systems inside a chat completion — sending a customer's medical details to an external API can itself be an unlawful transfer, and prompts logged for debugging become a breach waiting to happen. LLMs also memorize: PII that enters fine-tuning data can resurface in someone else's completion. Once personal data is scattered across prompt logs, honoring a deletion request becomes nearly impossible.

You'll build a redaction layer that runs before any external call: tools like Microsoft **Presidio**, cloud services such as AWS Comprehend or Google Cloud DLP, or an NER model catch what regex alone misses, replacing values with placeholder tokens like `<EMAIL_1>` that can be re-inserted after the response returns. You'll configure **zero-retention** options with your provider where available, scrub PII from traces before they hit your logging stack, minimize what you collect in the first place, and test the pipeline with synthetic PII to measure recall — a redactor that misses 5% of emails isn't compliance, it's luck.
