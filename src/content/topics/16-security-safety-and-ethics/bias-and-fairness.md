---
{
  "title": "Bias and Fairness",
  "module": "security-safety-and-ethics",
  "order": 9,
  "sources": [
    "ai-engineer"
  ],
  "resources": [
    {
      "type": "article",
      "title": "What Do We Do About the Biases in AI?",
      "url": "https://hbr.org/2019/10/what-do-we-do-about-the-biases-in-ai"
    },
    {
      "type": "article",
      "title": "AI Bias - What Is It and How to Avoid It?",
      "url": "https://levity.ai/blog/ai-bias-how-to-avoid"
    },
    {
      "type": "article",
      "title": "What about fairness, bias and discrimination?",
      "url": "https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/artificial-intelligence/guidance-on-ai-and-data-protection/how-do-we-ensure-fairness-in-ai/what-about-fairness-bias-and-discrimination/"
    }
  ]
}
---

**Bias** in an AI system is a systematic skew in its outputs that treats some groups differently from others — and **fairness** is the discipline of measuring and correcting it. LLMs learn from internet-scale text, so they absorb the stereotypes and historical inequities baked into that data: associating professions with genders, defaulting to certain cultural norms, or performing worse in some dialects and languages. Bias also enters through your own choices — the few-shot examples you pick, the retrieval corpus you index, the feedback data you fine-tune on.

This stops being abstract the moment your model output influences a decision. Screening résumés, scoring loan applications, triaging support tickets, or summarizing medical notes with a skewed model can produce **disparate impact** — systematically worse outcomes for a protected group — which is illegal in hiring, credit, and housing in most jurisdictions regardless of whether a human or a model made the call. Regulators (the EEOC, the ICO under GDPR, the EU AI Act) have made clear that "the vendor's model did it" does not transfer liability away from you.

Your job here is measurement and honest system design, distinct from the runtime filtering covered in the next topic. You'll build **counterfactual evaluations** — run identical inputs with only a name, gender, or dialect swapped and diff the outputs — and disaggregate your quality metrics by demographic slice instead of trusting one global average. You'll audit training and few-shot data for representation gaps, document known limitations, and keep humans in the loop on consequential decisions.
