// Fetches topic titles, roadmap ordering, and resource links (NEVER descriptions —
// roadmap.sh prose is copyrighted) from kamranahmedse/developer-roadmap.
// Output: src/data/raw-topics.json. Run manually: node scripts/fetch-roadmaps.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

// Repo was transferred (kamranahmedse -> nilbuild); the API follows renames but
// raw.githubusercontent.com does not, so resolve the canonical name first.
const REPO = JSON.parse(
  execFileSync('gh', ['api', 'repos/kamranahmedse/developer-roadmap', '--jq', '{full_name}']).toString()
).full_name;
const ROADMAPS = ['ai-engineer', 'ai-agents', 'prompt-engineering'];
const RESOURCE_RE = /\[@(\w+)@([^\]]+)\]\(([^)]+)\)/g;

// Known synonym merges across roadmaps: normalized title -> canonical normalized title.
// Iterate after eyeballing the near-miss report this script prints.
const MERGE_MAP = {
  'agents': 'ai agents',
  'chain of thought cot': 'chain of thought cot prompting',
  'cot': 'chain of thought cot prompting',
  'context windows': 'context window',
  'embedding': 'embeddings',
  'fine tuning vs prompt engg': 'fine tuning vs prompt engineering',
  'gemini': 'google gemini',
  'models on hugging face': 'hugging face models',
  'large language model llm': 'llm',
  'how llms work': 'llms and how they work',
  'llama index': 'llamaindex',
  'max length': 'max tokens',
  'mcp host': 'mcp hosts',
  'mcp server': 'mcp servers',
  'building an mcp server': 'creating mcp servers',
  'few shot': 'one shot few shot prompting',
  'zero shot': 'zero shot prompting',
  'tools function calling': 'function calling',
  'prompt injection attacks': 'prompt injection',
  'prompt injection jailbreaks': 'prompt injection',
  'rags': 'rag',
  'understand the basics of rag': 'rag',
  'react': 'react reason act', // the ReAct agent pattern, not the JS framework
  'react prompting': 'react reason act',
  'streamed vs unstreamed responses': 'streaming responses',
  'structured output': 'structured outputs',
  'tree of thought': 'tree of thoughts tot prompting',
  'vector database': 'vector databases',
  'vector dbs': 'vector databases',
  'tokens': 'tokenization',
  'anthropic': 'anthropic claude',
  'meta': 'meta llama',
  'manual from scratch': 'manual implementation',
  'constrains': 'constraining outputs and inputs',
  'stopping criteria': 'stop sequences',
  'safety red team testing': 'ai red teaming',
};

const gh = (path) => JSON.parse(execFileSync('gh', ['api', path], { maxBuffer: 64 * 1024 * 1024 }).toString());

const normalize = (title) =>
  title
    .toLowerCase()
    .replace(/^what (is|are) /, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const slugify = (title) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');

const stripUtm = (url) => {
  try {
    const u = new URL(url);
    [...u.searchParams.keys()].filter((k) => k.startsWith('utm_')).forEach((k) => u.searchParams.delete(k));
    return u.toString().replace(/\?$/, '');
  } catch {
    return url;
  }
};

async function fetchRoadmap(slug) {
  const base = `src/data/roadmaps/${slug}`;
  // Live graph from roadmap.sh — the repo copy is stale for some roadmaps (legacy mockup format)
  const graph = await fetch(`https://roadmap.sh/${slug}.json`).then((r) => r.json());

  // Order content-bearing nodes by visual position (top-to-bottom, then left-to-right)
  const nodes = graph.nodes
    .filter((n) => (n.type === 'topic' || n.type === 'subtopic') && n.data?.label)
    .sort((a, b) => a.position.y - b.position.y || a.position.x - b.position.x);
  const orderById = new Map(nodes.map((n, i) => [n.id, { order: i, label: n.data.label.trim(), type: n.type }]));

  const files = gh(`repos/${REPO}/contents/${base}/content`);
  const topics = [];
  // Chunked parallel downloads to be polite to the CDN
  for (let i = 0; i < files.length; i += 20) {
    const chunk = files.slice(i, i + 20);
    const bodies = await Promise.all(chunk.map((f) => fetch(f.download_url).then((r) => r.text())));
    chunk.forEach((f, j) => {
      const nodeId = f.name.match(/@([^@]+)\.md$/)?.[1];
      const node = nodeId && orderById.get(nodeId);
      if (!node) return; // content for label/section nodes or stale files — not course topics
      const resources = [...bodies[j].matchAll(RESOURCE_RE)].map(([, type, title, url]) => ({
        type,
        title: title.trim(),
        url: stripUtm(url.trim()),
      }));
      topics.push({ title: node.label, roadmap: slug, order: node.order, nodeType: node.type, resources });
    });
  }
  topics.sort((a, b) => a.order - b.order);
  console.log(`${slug}: ${files.length} content files -> ${topics.length} topics`);
  return topics;
}

const all = (await Promise.all(ROADMAPS.map(fetchRoadmap))).flat();

// Dedup across roadmaps by normalized title (+ MERGE_MAP synonyms)
const merged = new Map();
for (const t of all) {
  let key = normalize(t.title);
  key = MERGE_MAP[key] ?? key;
  if (!merged.has(key)) {
    merged.set(key, { slug: slugify(t.title), title: t.title, sources: {}, resources: [] });
  }
  const m = merged.get(key);
  m.sources[t.roadmap] = t.order;
  for (const r of t.resources) {
    if (!m.resources.some((x) => x.url === r.url)) m.resources.push(r);
  }
}

// Guarantee unique slugs
const seen = new Set();
for (const m of merged.values()) {
  let s = m.slug;
  for (let n = 2; seen.has(s); n++) s = `${m.slug}-${n}`;
  m.slug = s;
  seen.add(s);
}

const out = [...merged.values()];
writeFileSync('src/data/raw-topics.json', JSON.stringify(out, null, 2) + '\n');
console.log(`\nTotal: ${all.length} topics -> ${out.length} after dedup (${all.length - out.length} merged)`);
console.log(`Resources: ${out.reduce((n, t) => n + t.resources.length, 0)}; topics with none: ${out.filter((t) => !t.resources.length).length}`);

// Near-miss report: sorted normalized titles so synonym candidates sit adjacent
console.log('\n--- sorted normalized titles (eyeball for near-misses) ---');
[...merged.keys()].sort().forEach((k) => console.log(k));
