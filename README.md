<div align="center">

# 🎓 The AI Course

**One course for AI engineering, agents, and prompting.**

Three [roadmap.sh](https://roadmap.sh) roadmaps — [AI Engineer](https://roadmap.sh/ai-engineer) · [AI Agents](https://roadmap.sh/ai-agents) · [Prompt Engineering](https://roadmap.sh/prompt-engineering) — merged into a single, deduplicated, logically-ordered curriculum.

**240 topics · 17 modules · 745+ curated resources**

![Astro](https://img.shields.io/badge/Astro_7-BC52EE?logo=astro&logoColor=white)
![React](https://img.shields.io/badge/React_19-087EA4?logo=react&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_4-38BDF8?logo=tailwindcss&logoColor=white)
![No backend](https://img.shields.io/badge/backend-none-success)

*Free · self-paced · no signup · your progress never leaves your browser*

</div>

---

## ✨ What it does

Learning AI from the roadmap.sh roadmaps means hopping between three maps full of overlapping topics. This site fixes that:

- **One linear curriculum** — 304 roadmap topics deduplicated into 240, ordered so prerequisites always come first (LLM fundamentals before prompting, embeddings before RAG, tools before agents…).
- **Original overviews** — every topic gets a plain-English explainer: *what it is, why it matters, how you'll use it*. The site doesn't reteach everything; it orients you, then hands you the best external resources.
- **Curated resources** — 745+ articles, official docs, videos, and courses with per-resource checkboxes and type filters.
- **Progress that's yours** — completion state lives in `localStorage`. A resume button takes you back to where you left off, and you can export/import progress as JSON to move devices.
- **⌘K search** — instant client-side fuzzy search across all 240 topics.
- **Light & dark mode** — no-flash theme toggle, fully responsive down to small phones.

## 📚 Curriculum

| # | Module | Topics |
|---|--------|-------:|
| 01 | Getting Started | 9 |
| 02 | LLM Fundamentals | 17 |
| 03 | The Model Landscape | 23 |
| 04 | Prompt Engineering Fundamentals | 21 |
| 05 | Advanced Prompting & Context Engineering | 9 |
| 06 | Working with Model APIs | 19 |
| 07 | Embeddings & Vector Databases | 23 |
| 08 | Retrieval-Augmented Generation (RAG) | 8 |
| 09 | AI Agents | 18 |
| 10 | Tools & Function Calling | 13 |
| 11 | Agent Memory | 8 |
| 12 | Agent Frameworks & SDKs | 14 |
| 13 | Model Context Protocol (MCP) | 12 |
| 14 | Multimodal AI | 14 |
| 15 | Evaluation & Observability | 14 |
| 16 | Security, Safety & Ethics | 12 |
| 17 | AI Coding Tools | 6 |

## 🛠 Tech stack

- **[Astro 7](https://astro.build)** — fully static output (`243` prerendered pages), content collections for the topic files
- **React 19 islands** — only 4 of them: search palette, progress hero, resource checklist, export/import. Everything else is static HTML.
- **Tailwind CSS 4** — via the `@tailwindcss/vite` plugin, class-based dark mode
- **nanostores** + `@nanostores/persistent` — one progress store shared across islands, synced to `localStorage`
- **No backend, no database, no analytics** — deploys to any static host (built for Cloudflare Pages)

## 🚀 Getting started

```sh
npm install
npm run dev        # http://localhost:4321
npm run build      # static site → dist/
npm run preview    # preview the production build
```

## 🔄 Content pipeline

Topic titles, structure, and resource links are extracted from the roadmap.sh data; **all overview prose is original** (see licensing below).

```
roadmap.sh graphs + GitHub content files
  → scripts/fetch-roadmaps.mjs     titles, ordering, resource links ONLY
  → src/data/raw-topics.json       304 topics → 240 after synonym dedup
  → src/data/curriculum.ts         hand-curated module/order source of truth
  → scripts/scaffold-content.mjs   → src/content/topics/<NN-module>/<slug>.md
  → original overviews authored into each file's body
```

| Command | Action |
| --- | --- |
| `npm run data:fetch` | Re-fetch topics + resource links into `raw-topics.json` |
| `npm run data:scaffold` | Re-generate topic frontmatter (preserves authored bodies) |
| `npm run data:validate` | Check every topic file has valid frontmatter + an overview |

Topic URLs are flat (`/topics/<slug>/`) and stable across module reshuffles; all ordering flows from `curriculum.ts`.

## ⚖️ Licensing & credits

The [roadmap.sh repository](https://github.com/kamranahmedse/developer-roadmap)'s content is copyrighted — so this project **never republishes roadmap.sh prose**. It extracts only topic titles, structure, and resource links, and every overview on this site is original writing. Huge thanks to Kamran Ahmed and the roadmap.sh contributors for the incredible roadmaps that shaped this curriculum. All linked articles and videos belong to their respective authors.
