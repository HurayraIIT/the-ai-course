import { useCallback, useEffect, useState, type FormEvent } from 'react';
import { api } from '../api';
import { formatDateTime } from '../format';
import { Avatar, buttonClass, ErrorMessage, inputClass } from './ui';

interface Comment {
  id: number;
  body: string;
  created_at: string;
  username: string;
  avatar_hash: string;
  is_mine: boolean;
  ups: number;
  downs: number;
  my_reaction: 'up' | 'down' | null;
}

export default function Comments({ lessonId }: { lessonId: number }) {
  const [comments, setComments] = useState<Comment[]>([]);
  const [body, setBody] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const load = useCallback(() => {
    api<{ comments: Comment[] }>(`/lessons/${lessonId}/comments`).then((d) => setComments(d.comments));
  }, [lessonId]);

  useEffect(load, [load]);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      await api(`/lessons/${lessonId}/comments`, { method: 'POST', body: { body } });
      setBody('');
      load();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const react = async (comment: Comment, reaction: 'up' | 'down') => {
    const next = comment.my_reaction === reaction ? null : reaction;
    await api(`/comments/${comment.id}/reaction`, { method: 'PUT', body: { reaction: next } });
    load();
  };

  const remove = async (comment: Comment) => {
    await api(`/comments/${comment.id}`, { method: 'DELETE' });
    load();
  };

  return (
    <section aria-labelledby="comments-heading" className="mt-10 border-t border-zinc-200 pt-6">
      <h2 id="comments-heading" className="text-lg font-semibold">
        Comments ({comments.length})
      </h2>

      <form onSubmit={submit} className="mt-4">
        <label htmlFor="comment-body" className="mb-1 block text-sm font-medium">
          Add a comment
        </label>
        <textarea
          id="comment-body"
          required
          maxLength={2000}
          rows={3}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          className={inputClass}
        />
        <ErrorMessage error={error} />
        <button type="submit" disabled={busy || body.trim() === ''} className={`mt-2 ${buttonClass}`}>
          {busy ? 'Posting…' : 'Post comment'}
        </button>
      </form>

      <ul className="mt-6 space-y-4">
        {comments.map((comment) => (
          <li key={comment.id} className="flex gap-3">
            <Avatar hash={comment.avatar_hash} username={comment.username} />
            <div className="min-w-0 flex-1">
              <p className="text-sm">
                <span className="font-medium">{comment.username}</span>{' '}
                <time dateTime={comment.created_at} className="text-xs text-zinc-500">
                  {formatDateTime(comment.created_at)}
                </time>
              </p>
              <p className="mt-1 whitespace-pre-wrap break-words text-sm text-zinc-800">{comment.body}</p>
              <div className="mt-2 flex items-center gap-2">
                <button
                  onClick={() => react(comment, 'up')}
                  aria-pressed={comment.my_reaction === 'up'}
                  aria-label={`Thumbs up, ${comment.ups}`}
                  className={`rounded px-2 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    comment.my_reaction === 'up' ? 'bg-blue-100 text-blue-800' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  👍 {comment.ups}
                </button>
                <button
                  onClick={() => react(comment, 'down')}
                  aria-pressed={comment.my_reaction === 'down'}
                  aria-label={`Thumbs down, ${comment.downs}`}
                  className={`rounded px-2 py-0.5 text-xs focus:outline-none focus:ring-2 focus:ring-blue-400 ${
                    comment.my_reaction === 'down' ? 'bg-blue-100 text-blue-800' : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200'
                  }`}
                >
                  👎 {comment.downs}
                </button>
                {comment.is_mine && (
                  <button
                    onClick={() => remove(comment)}
                    className="rounded px-2 py-0.5 text-xs text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                  >
                    Delete
                  </button>
                )}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
