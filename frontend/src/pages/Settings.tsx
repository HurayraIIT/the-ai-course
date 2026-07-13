import { useState, type FormEvent } from 'react';
import { api, type User } from '../api';
import { useAuth } from '../auth';
import { Avatar, buttonClass, ErrorMessage, inputClass, PageTitle } from '../components/ui';

export default function Settings() {
  const { user, setUser } = useAuth();
  const [username, setUsername] = useState(user!.username);
  const [phone, setPhone] = useState(user!.phone);
  const [optIn, setOptIn] = useState(user!.leaderboard_opt_in);
  const [profileMsg, setProfileMsg] = useState<string | null>(null);
  const [profileErr, setProfileErr] = useState<string | null>(null);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordMsg, setPasswordMsg] = useState<string | null>(null);
  const [passwordErr, setPasswordErr] = useState<string | null>(null);

  const saveProfile = async (e: FormEvent) => {
    e.preventDefault();
    setProfileMsg(null);
    setProfileErr(null);
    try {
      const data = await api<{ user: User }>('/profile', {
        method: 'PUT',
        body: { username, phone, leaderboard_opt_in: optIn },
      });
      setUser(data.user);
      setProfileMsg('Profile saved.');
    } catch (err: any) {
      setProfileErr(err.message);
    }
  };

  const savePassword = async (e: FormEvent) => {
    e.preventDefault();
    setPasswordMsg(null);
    setPasswordErr(null);
    try {
      await api('/profile/password', {
        method: 'PUT',
        body: { current_password: currentPassword, new_password: newPassword },
      });
      setCurrentPassword('');
      setNewPassword('');
      setPasswordMsg('Password updated.');
    } catch (err: any) {
      setPasswordErr(err.message);
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <PageTitle>Settings</PageTitle>

      <section aria-labelledby="avatar-heading" className="mt-6 flex items-center gap-4 rounded-md border border-zinc-200 p-4">
        <Avatar hash={user!.avatar_hash} username={user!.username} size={48} />
        <div>
          <h2 id="avatar-heading" className="text-sm font-semibold">
            Profile picture
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Your avatar comes from Gravatar, based on your email.{' '}
            <a
              href="https://gravatar.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 underline"
            >
              Change it on gravatar.com
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </p>
        </div>
      </section>

      <section aria-labelledby="profile-heading" className="mt-8">
        <h2 id="profile-heading" className="text-lg font-semibold">
          Profile
        </h2>
        <form onSubmit={saveProfile} className="mt-4 space-y-4">
          <div>
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              disabled
              value={user!.email}
              className={`${inputClass} cursor-not-allowed bg-zinc-100 text-zinc-500`}
              aria-describedby="email-hint"
            />
            <p id="email-hint" className="mt-1 text-xs text-zinc-500">
              Your email can't be changed.
            </p>
          </div>
          <div>
            <label htmlFor="username" className="mb-1 block text-sm font-medium">
              Username
            </label>
            <input
              id="username"
              required
              minLength={3}
              maxLength={50}
              pattern="[a-zA-Z0-9_\-]+"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className={inputClass}
              aria-describedby="username-hint"
            />
            <p id="username-hint" className="mt-1 text-xs text-zinc-500">
              Shown publicly on the leaderboard and comments.
            </p>
          </div>
          <div>
            <label htmlFor="phone" className="mb-1 block text-sm font-medium">
              Phone number
            </label>
            <input
              id="phone"
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className={inputClass}
            />
          </div>
          <div className="flex items-start gap-2">
            <input
              id="opt-in"
              type="checkbox"
              checked={optIn}
              onChange={(e) => setOptIn(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-zinc-300 focus:ring-2 focus:ring-blue-400"
            />
            <label htmlFor="opt-in" className="text-sm">
              Show me on the global leaderboard
            </label>
          </div>
          <ErrorMessage error={profileErr} />
          {profileMsg && (
            <p role="status" className="text-sm text-green-700">
              {profileMsg}
            </p>
          )}
          <button type="submit" className={buttonClass}>
            Save profile
          </button>
        </form>
      </section>

      <section aria-labelledby="password-heading" className="mt-10">
        <h2 id="password-heading" className="text-lg font-semibold">
          Change password
        </h2>
        <form onSubmit={savePassword} className="mt-4 space-y-4">
          <div>
            <label htmlFor="current-password" className="mb-1 block text-sm font-medium">
              Current password
            </label>
            <input
              id="current-password"
              type="password"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="new-password" className="mb-1 block text-sm font-medium">
              New password
            </label>
            <input
              id="new-password"
              type="password"
              required
              minLength={8}
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
          </div>
          <ErrorMessage error={passwordErr} />
          {passwordMsg && (
            <p role="status" className="text-sm text-green-700">
              {passwordMsg}
            </p>
          )}
          <button type="submit" className={buttonClass}>
            Update password
          </button>
        </form>
      </section>
    </div>
  );
}
