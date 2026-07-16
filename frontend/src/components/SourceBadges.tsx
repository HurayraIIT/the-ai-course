// Spans, not links: badges often sit inside an <a> row and anchors can't nest.
const META: Record<string, { label: string; classes: string; title: string }> = {
  'ai-engineer': {
    label: 'AI Engineer',
    classes: 'bg-accent-100 text-accent-800',
    title: 'From the roadmap.sh AI Engineer roadmap',
  },
  'ai-agents': {
    label: 'AI Agents',
    classes: 'bg-emerald-100 text-emerald-800',
    title: 'From the roadmap.sh AI Agents roadmap',
  },
  'prompt-engineering': {
    label: 'Prompt Engineering',
    classes: 'bg-amber-100 text-amber-800',
    title: 'From the roadmap.sh Prompt Engineering roadmap',
  },
  new: {
    label: 'New',
    classes: 'bg-violet-100 text-violet-800',
    title: 'Recently added lesson, written for this course',
  },
};

export default function SourceBadges({ sources }: { sources: string[] }) {
  if (sources.length === 0) return null;
  return (
    <span className="inline-flex shrink-0 flex-wrap justify-end gap-1.5">
      {sources.map((source) => {
        const meta = META[source];
        if (!meta) return null;
        return (
          <span
            key={source}
            className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${meta.classes}`}
            title={meta.title}
          >
            {meta.label}
          </span>
        );
      })}
    </span>
  );
}
