import { Fragment, useEffect, useState } from 'react';
import { api } from '../api';
import { formatDateTime } from '../format';
import {
  AdminNav,
  PageTitle,
  Pagination,
  Spinner,
  tableClass,
  tableWrapClass,
  tdClass,
  thClass,
  trZebraClass,
} from '../components/ui';

interface Email {
  id: number;
  recipient: string;
  subject: string;
  body: string;
  status: 'sent' | 'failed' | 'logged';
  created_at: string;
}

interface EmailsPage {
  emails: Email[];
  total: number;
  page: number;
  per_page: number;
}

const STATUS_STYLES: Record<Email['status'], string> = {
  sent: 'bg-green-100 text-green-800',
  failed: 'bg-red-100 text-red-800',
  logged: 'bg-zinc-100 text-zinc-600',
};

export default function AdminEmails() {
  const [data, setData] = useState<EmailsPage | null>(null);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    api<EmailsPage>(`/admin/emails?page=${page}`).then(setData);
  }, [page]);

  if (!data) return <Spinner label="Loading emails" />;

  return (
    <div>
      <PageTitle>Admin — Emails</PageTitle>
      <AdminNav />
      <p role="status" className="mt-4 text-sm text-zinc-600">
        {data.total} outgoing email{data.total === 1 ? '' : 's'} logged, most recent first
      </p>

      <div className={`mt-2 ${tableWrapClass}`}>
        <table className={tableClass}>
          <caption className="sr-only">Outgoing email log</caption>
          <thead>
            <tr>
              <th scope="col" className={thClass}>Recipient</th>
              <th scope="col" className={thClass}>Subject</th>
              <th scope="col" className={thClass}>Status</th>
              <th scope="col" className={thClass}>When</th>
              <th scope="col" className={thClass}>
                <span className="sr-only">Body</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {data.emails.map((email) => (
              <Fragment key={email.id}>
                <tr className={trZebraClass}>
                  <td className={tdClass}>{email.recipient}</td>
                  <td className={tdClass}>{email.subject}</td>
                  <td className={tdClass}>
                    <span className={`rounded px-1.5 py-0.5 text-xs font-medium ${STATUS_STYLES[email.status]}`}>
                      {email.status}
                    </span>
                  </td>
                  <td className={`${tdClass} whitespace-nowrap`}>{formatDateTime(email.created_at)}</td>
                  <td className={tdClass}>
                    <button
                      onClick={() => setExpanded(expanded === email.id ? null : email.id)}
                      aria-expanded={expanded === email.id}
                      className="text-sm text-blue-700 underline focus:outline-none focus:ring-2 focus:ring-blue-400"
                    >
                      {expanded === email.id ? 'Hide body' : 'View body'}
                    </button>
                  </td>
                </tr>
                {expanded === email.id && (
                  <tr>
                    <td colSpan={5} className="border-b border-zinc-100 bg-zinc-50 px-4 py-3">
                      <pre className="overflow-x-auto whitespace-pre-wrap break-words text-xs text-zinc-700">
                        {email.body}
                      </pre>
                    </td>
                  </tr>
                )}
              </Fragment>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination page={data.page} total={data.total} perPage={data.per_page} onPage={setPage} />
    </div>
  );
}
