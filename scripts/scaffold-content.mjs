// Joins curriculum.ts + raw-topics.json into content collection markdown files.
// Idempotent for frontmatter: preserves an existing body (the authored overview),
// only rewrites frontmatter. Fails loudly on any curriculum/raw-topics mismatch.
import { readFileSync, writeFileSync, mkdirSync, existsSync } from 'node:fs';
import { join } from 'node:path';

const { modules } = await import('../src/data/curriculum.ts');
const raw = JSON.parse(readFileSync('src/data/raw-topics.json', 'utf8'));

const bySlug = new Map(raw.map((t) => [t.slug, t]));
const assigned = new Set();
const errors = [];

for (const m of modules) {
  for (const slug of m.topics) {
    if (!bySlug.has(slug)) errors.push(`curriculum references unknown topic: ${slug} (module ${m.slug})`);
    if (assigned.has(slug)) errors.push(`topic assigned twice: ${slug}`);
    assigned.add(slug);
  }
}
for (const t of raw) {
  if (!assigned.has(t.slug)) errors.push(`raw topic not assigned to any module: ${t.slug}`);
}
if (errors.length) {
  console.error(errors.join('\n'));
  process.exit(1);
}

let created = 0;
let updated = 0;
modules.forEach((m, mi) => {
  const dir = join('src/content/topics', `${String(mi + 1).padStart(2, '0')}-${m.slug}`);
  mkdirSync(dir, { recursive: true });
  m.topics.forEach((slug, ti) => {
    const t = bySlug.get(slug);
    const file = join(dir, `${slug}.md`);
    // JSON is valid YAML — write the object verbatim between the fences
    const frontmatter = [
      '---',
      JSON.stringify(
        {
          title: t.title,
          module: m.slug,
          order: ti,
          sources: Object.keys(t.sources),
          resources: t.resources,
        },
        null,
        2
      ),
      '---',
    ].join('\n');
    let body = '<!-- TODO: overview -->';
    if (existsSync(file)) {
      const existing = readFileSync(file, 'utf8');
      body = existing.replace(/^---\n[\s\S]*?\n---\n*/, '').trim() || body;
      updated++;
    } else {
      created++;
    }
    writeFileSync(file, `${frontmatter}\n\n${body}\n`);
  });
});
console.log(`${created} created, ${updated} updated across ${modules.length} modules`);
