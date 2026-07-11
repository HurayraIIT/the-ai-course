---
{
  "title": "Email / Slack / SMS",
  "module": "tools-and-function-calling",
  "order": 11,
  "sources": [
    "ai-agents"
  ],
  "resources": [
    {
      "type": "official",
      "title": "Twilio Messaging API",
      "url": "https://www.twilio.com/docs/usage/api"
    },
    {
      "type": "official",
      "title": "Slack AI Agents",
      "url": "https://slack.com/ai-agents"
    }
  ]
}
---

**Messaging tools** give an agent the ability to reach humans through the channels they actually watch: email, Slack (or Teams), and SMS. Each is a tool wrapping a messaging API — `send_email(to, subject, body)`, `post_slack_message(channel, text)`, `send_sms(number, message)` — so the model can compose the content and your code handles delivery through providers like SendGrid, the Slack Web API, or Twilio.

These tools turn an agent from something you chat with into something that participates in your workflows. A monitoring agent that pings the on-call channel, a sales agent that drafts follow-up emails, a reminder agent that texts you — all of it is one tool call away. Messaging is also the backbone of **human-in-the-loop** patterns: an agent that hits a decision it shouldn't make alone can message a person, wait for a reply, and continue. But this is the first tool category where mistakes are *visible to other people* — a hallucinated email to a customer is a real incident — so treat sends as consequential actions: draft-then-approve flows, allowlisted recipients, and rate limits are standard practice.

In practice each wrapper is a short function calling the provider's SDK, exposed with tight schemas — enums for channels, validated addresses — plus templates so the model fills in variables rather than free-styling entire messages. Inbound is the other half: Slack events or email webhooks can *trigger* agent runs, closing the loop so a conversation with your agent happens entirely inside the tools your team already uses.
