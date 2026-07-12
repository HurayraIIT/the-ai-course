import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { api } from '../api';
import { formatDateTime } from '../format';
import {
  AdminNav,
  Avatar,
  buttonClass,
  buttonDangerClass,
  buttonSecondaryClass,
  ErrorMessage,
  inputClass,
  PageTitle,
  Pagination,
  Spinner,
} from '../components/ui';

interface AdminComment {
  id: number;
  body: string;
  created_at: string;
  user_id: number;
  username: string;
  avatar_hash: string;
  lesson_slug: string;
  lesson_title: string;
}

interface CommentsPage {
  comments: AdminComment[];
  total: number;
  page: number;
  per_page: number;
}

export default function AdminComments() {
  const [data, setData] = useState<CommentsPage | null>(null);
  const [page, setPage] = useState(1);
  const [editing, setEditing] = useState<number | null>(null);
  const [editBody, setEditBody] = useState('');
  const [deleting, setDeleting] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(() => {
    api<CommentsPage>(`/admin/comments?page=${page}`).then(setData);
  }, [page]);

  useEffect(load, [load]);

  if (!data) return <Spinner label="Loading comments" />;

  const saveEdit = async (id: number) => {
    setError(null);
    try {
      await api(`/admin/comments/${id}`, { method: 'PUT', body: { body: editBody } });
      setEditing(null);
      load();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const remove = async (id: number) => {
    setError(null);
    try {
      await api(`/comments/${id}`, { method: 'DELETE' });
      setDeleting(null);
      load();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div>
      <PageTitle>Admin — Comments</PageTitle>
      <AdminNav />
      <p role="status" className="mt-4 text-sm text-zinc-600">
        {data.total} comment{data.total === 1 ? '' : 's'}
      </p>
      <ErrorMessage error={error} />

      <ul className="mt-4 space-y-4">
        {data.comments.map((comment) => (
          <li key={comment.id} className="rounded-md border border-zinc-200 p-4 odd:bg-white even:bg-zinc-50">
            <div className="flex flex-wrap items-center gap-2 text-sm">
              <Avatar hash={comment.avatar_hash} username={comment.username} size={24} />
              <Link to={`/admin/users/${comment.user_id}`} className="font-medium text-blue-700 underline">
                {comment.username}
              </Link>
              <span className="text-zinc-400">on</span>
              <Link to={`/lessons/${comment.lesson_slug}`} className="text-blue-700 underline">
                {comment.lesson_title}
              </Link>
              <time dateTime={comment.created_at} className="text-xs text-zinc-500">
                {formatDateTime(comment.created_at)}
              </time>
            </div>

            {editing === comment.id ? (
              <div className="mt-2">
                <label htmlFor={`edit-${comment.id}`} className="sr-only">
                  Edit comment
                </label>
                <textarea
                  id={`edit-${comment.id}`}
                  rows={3}
                  maxLength={2000}
                  value={editBody}
                  onChange={(e) => setEditBody(e.target.value)}
                  className={inputClass}
                />
                <div className="mt-2 flex gap-2">
                  <button onClick={() => saveEdit(comment.id)} className={buttonClass}>
                    Save
                  </button>
                  <button onClick={() => setEditing(null)} className={buttonSecondaryClass}>
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <>
                <p className="mt-2 whitespace-pre-wrap break-words text-sm text-zinc-800">{comment.body}</p>
                <div className="mt-2 flex gap-2">
                  <button
                    onClick={() => {
                      setEditing(comment.id);
                      setEditBody(comment.body);
                    }}
                    className={buttonSecondaryClass}
                  >
                    Edit
                  </button>
                  {deleting === comment.id ? (
                    <>
                      <button onClick={() => remove(comment.id)} className={buttonDangerClass}>
                        Yes, delete
                      </button>
                      <button onClick={() => setDeleting(null)} className={buttonSecondaryClass}>
                        Cancel
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => setDeleting(comment.id)}
                      className="rounded-md px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-400"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      <Pagination page={data.page} total={data.total} perPage={data.per_page} onPage={setPage} />
    </div>
  );
}
