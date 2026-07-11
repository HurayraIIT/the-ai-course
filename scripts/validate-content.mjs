// Checks every topic file has valid frontmatter and an authored overview body.
import { readFileSync, readdirSync } from 'node:fs';
import { join } from 'node:path';

const raw = JSON.parse(readFileSync('src/data/raw-topics.json', 'utf8'));
const root = 'src/content/topics';
const errors = [];
const found = new Set();

for (const dir of readdirSync(root)) {
  for (const file of readdirSync(join(root, dir))) {
    const path = join(root, dir, file);
    const text = readFileSync(path, 'utf8');
    const match = text.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
    if (!match) {
      errors.push(`${path}: missing frontmatter`);
      continue;
    }
    const [, fm, body] = match;
    try {
      const data = JSON.parse(fm);
      if (!data.title || !data.module || !Array.isArray(data.resources)) throw new Error('bad shape');
    } catch (e) {
      errors.push(`${path}: invalid frontmatter (${e.message})`);
    }
    if (body.includes('TODO')) errors.push(`${path}: body still has TODO`);
    const words = body.trim().split(/\s+/).filter(Boolean).length;
    if (words < 100) errors.push(`${path}: body too short (${words} words)`);
    if (/^#\s/m.test(body)) errors.push(`${path}: body contains an H1 (page supplies the title)`);
    found.add(file.replace(/\.md$/, ''));
  }
}

for (const t of raw) {
  if (!found.has(t.slug)) errors.push(`missing content file for topic: ${t.slug}`);
}

if (errors.length) {
  console.error(errors.join('\n'));
  console.error(`\n${errors.length} problem(s).`);
  process.exit(1);
}
console.log(`All ${found.size} topic files valid.`);
