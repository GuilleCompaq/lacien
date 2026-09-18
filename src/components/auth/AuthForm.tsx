import { useState, type FormEvent, type ReactNode } from 'react';

interface AuthFormProps {
  title: string;
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<{ error: string | null }>;
  onSuccess: () => void;
  footer: ReactNode;
}

export function AuthForm({ title, submitLabel, onSubmit, onSuccess, footer }: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const result = await onSubmit(email, password);

    if (result.error) {
      setError(result.error);
      setSubmitting(false);
    } else {
      onSuccess();
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-4 py-6">
      <h1 className="text-2xl font-bold text-text-primary">{title}</h1>

      <label className="flex flex-col gap-1 text-sm text-text-secondary">
        Email
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-white/10 bg-bg-surface px-3 py-2 text-text-primary outline-none focus:border-accent"
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-text-secondary">
        Contraseña
        <input
          type="password"
          required
          minLength={6}
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="rounded-xl border border-white/10 bg-bg-surface px-3 py-2 text-text-primary outline-none focus:border-accent"
        />
      </label>

      {error && <p className="text-sm text-state-live">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-accent py-2.5 font-semibold text-white hover:bg-accent-hover active:bg-accent-active disabled:opacity-60"
      >
        {submitting ? 'Un momento…' : submitLabel}
      </button>

      {footer}
    </form>
  );
}
