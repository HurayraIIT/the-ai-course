import { Link } from 'react-router-dom';
import { PageTitle } from '../components/ui';

export default function NotFound() {
  return (
    <div>
      <PageTitle>Page not found</PageTitle>
      <p className="mt-4 text-zinc-600">
        <Link to="/" className="text-blue-700 underline">
          Back to the course
        </Link>
      </p>
    </div>
  );
}
