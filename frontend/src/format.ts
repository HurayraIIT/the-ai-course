const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

function parse(mysqlDate: string): Date {
  return new Date(mysqlDate.replace(' ', 'T'));
}

/** `July 12, 2026` */
export function formatDate(mysqlDate: string | null): string {
  if (!mysqlDate) return '—';
  const d = parse(mysqlDate);
  return `${MONTHS[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`;
}

/** `July 12, 2026, 7.15 p.m.` */
export function formatDateTime(mysqlDate: string | null): string {
  if (!mysqlDate) return '—';
  const d = parse(mysqlDate);
  const hours24 = d.getHours();
  const hours = hours24 % 12 || 12;
  const minutes = String(d.getMinutes()).padStart(2, '0');
  const meridiem = hours24 < 12 ? 'a.m.' : 'p.m.';
  return `${formatDate(mysqlDate)}, ${hours}.${minutes} ${meridiem}`;
}
