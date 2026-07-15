import { BrowserRouter, Link, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './auth';
import { api } from './api';
import { RequireAdmin, RequireAuth } from './components/ui';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Lesson from './pages/Lesson';
import Leaderboard from './pages/Leaderboard';
import Settings from './pages/Settings';
import AdminUsers from './pages/AdminUsers';
import AdminUserDetail from './pages/AdminUserDetail';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminComments from './pages/AdminComments';
import AdminActivity from './pages/AdminActivity';
import AdminEmails from './pages/AdminEmails';
import NotFound from './pages/NotFound';

function Header() {
  const { user, refresh } = useAuth();
  const navigate = useNavigate();

  const logout = async () => {
    await api('/auth/logout', { method: 'POST' });
    await refresh(); // picks up the fresh session + CSRF token
    navigate('/');
  };

  const navLink = ({ isActive }: { isActive: boolean }) =>
    `rounded px-2 py-1 text-sm hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 ${
      isActive ? 'font-semibold text-blue-700' : 'text-zinc-600'
    }`;

  return (
    <header className="border-b border-zinc-200 bg-white">
      <nav aria-label="Main" className="mx-auto flex max-w-4xl flex-wrap items-center gap-2 px-4 py-3">
        <Link
          to="/"
          className="mr-auto flex items-center gap-2 text-base font-bold tracking-tight focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <span aria-hidden="true" className="grid size-7 place-items-center rounded-lg bg-accent-600 text-sm font-bold text-white">
            AI
          </span>
          The AI Course
        </Link>
        <NavLink to="/" className={navLink} end>
          Course
        </NavLink>
        {user && (
          <NavLink to="/leaderboard" className={navLink}>
            Leaderboard
          </NavLink>
        )}
        {user && (
          <NavLink to="/settings" className={navLink}>
            Settings
          </NavLink>
        )}
        {user?.is_admin && (
          <NavLink to="/admin/users" className={navLink}>
            Admin
          </NavLink>
        )}
        {user ? (
          <button
            onClick={logout}
            className="rounded px-2 py-1 text-sm text-zinc-600 hover:text-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            Log out
          </button>
        ) : (
          <>
            <NavLink to="/login" className={navLink}>
              Log in
            </NavLink>
            <NavLink to="/register" className={navLink}>
              Sign up
            </NavLink>
          </>
        )}
      </nav>
    </header>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="flex min-h-dvh flex-col">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-2 focus:top-2 focus:z-50 focus:rounded focus:bg-blue-600 focus:px-3 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        <Header />
        <main id="main" className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/lessons/:slug" element={<RequireAuth><Lesson /></RequireAuth>} />
            <Route path="/leaderboard" element={<RequireAuth><Leaderboard /></RequireAuth>} />
            <Route path="/settings" element={<RequireAuth><Settings /></RequireAuth>} />
            <Route path="/admin/users" element={<RequireAdmin><AdminUsers /></RequireAdmin>} />
            <Route path="/admin/users/:id" element={<RequireAdmin><AdminUserDetail /></RequireAdmin>} />
            <Route path="/admin/analytics" element={<RequireAdmin><AdminAnalytics /></RequireAdmin>} />
            <Route path="/admin/comments" element={<RequireAdmin><AdminComments /></RequireAdmin>} />
            <Route path="/admin/activity" element={<RequireAdmin><AdminActivity /></RequireAdmin>} />
            <Route path="/admin/emails" element={<RequireAdmin><AdminEmails /></RequireAdmin>} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <footer className="flex h-14 items-center justify-center border-t border-zinc-200 px-4 text-center text-sm text-zinc-500">
          © 2026 Abu Hurayra
        </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}
