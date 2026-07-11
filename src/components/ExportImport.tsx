import { useRef, useState } from 'react';
import { $lastVisited, $progress, type Progress } from '../lib/progress';

export default function ExportImport() {
  const fileRef = useRef<HTMLInputElement>(null);
  const [status, setStatus] = useState('');

  const exportProgress = () => {
    const data = JSON.stringify(
      { version: 1, progress: $progress.get(), lastVisited: $lastVisited.get() },
      null,
      2
    );
    const url = URL.createObjectURL(new Blob([data], { type: 'application/json' }));
    const a = Object.assign(document.createElement('a'), { href: url, download: 'the-ai-course-progress.json' });
    a.click();
    URL.revokeObjectURL(url);
  };

  const importProgress = async (file: File) => {
    try {
      const data = JSON.parse(await file.text());
      const progress = data?.progress as Progress;
      if (typeof progress?.topics !== 'object' || progress.topics === null) throw new Error('bad shape');
      $progress.set(progress);
      if (typeof data.lastVisited === 'string') $lastVisited.set(data.lastVisited);
      setStatus(`Imported progress for ${Object.keys(progress.topics).length} topics.`);
    } catch {
      setStatus('Import failed — that file does not look like an exported progress file.');
    }
  };

  return (
    <div className="rounded-2xl border border-zinc-200 p-6 dark:border-zinc-800">
      <h2 className="text-lg font-semibold">Your progress data</h2>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        Progress is stored only in this browser (localStorage). Export it as a JSON file to back it up or
        move it to another device, then import it there.
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={exportProgress}
          className="rounded-lg bg-accent-600 px-4 py-2 text-sm font-medium text-white hover:bg-accent-700"
        >
          Export progress
        </button>
        <button
          type="button"
          onClick={() => fileRef.current?.click()}
          className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium hover:bg-zinc-50 dark:border-zinc-700 dark:hover:bg-zinc-900"
        >
          Import progress
        </button>
        <input
          ref={fileRef}
          type="file"
          accept="application/json"
          className="hidden"
          onChange={(e) => e.target.files?.[0] && importProgress(e.target.files[0])}
        />
      </div>
      {status && <p className="mt-3 text-sm text-zinc-600 dark:text-zinc-400">{status}</p>}
    </div>
  );
}
