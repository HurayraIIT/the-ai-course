---
{
  "title": "Calibrating LLMs",
  "module": "evaluation-and-observability",
  "order": 6,
  "sources": [
    "prompt-engineering"
  ],
  "resources": [
    {
      "type": "article",
      "title": "Calibrating LLMs - LearnPrompting",
      "url": "https://learnprompting.org/docs/reliability/calibration"
    }
  ]
}
---

**Calibration** is the property that a model's confidence matches reality: when it says it's 90% sure, it should be right about 90% of the time. LLMs are frequently *miscalibrated* — they state wrong answers with total confidence and hedge on things they actually know. Calibrating an LLM means measuring that gap and correcting for it, so the confidence signal you get out of the model is one you can actually act on.

This matters because most production AI systems need a trustworthy "how sure are we?" signal to route decisions. A support bot should answer directly when confident and escalate to a human when not; an extraction pipeline should flag low-confidence fields for review. If confidence is meaningless, you either trust everything (and ship hallucinations) or trust nothing (and waste your human reviewers). Calibration is what makes thresholds like "auto-approve above 0.9" defensible instead of arbitrary.

In practice, you'll get confidence signals a few ways: token **logprobs** from the API where available, sampling the same question multiple times and using **self-consistency** (agreement rate across samples) as a confidence proxy, or asking the model for a verbalized probability — which is itself biased and needs checking. You then measure calibration on a labeled dataset with **expected calibration error** or a reliability diagram: bucket predictions by stated confidence and compare against actual accuracy per bucket. Finally, pick decision thresholds from that data, and re-verify whenever you change models or prompts, because calibration does not transfer.
