import { useId, useState, type FormEvent, type ReactNode } from 'react';

interface AuthFormProps {
  title: string;
  submitLabel: string;
  onSubmit: (email: string, password: string) => Promise<{ error: string | null }>;
  onSuccess: () => void;
  footer: ReactNode;
  /**
   * `new-password` en registro para que el gestor ofrezca generar y guardar una.
   * Estaba fijo en `current-password`, así que en el alta no ofrecía nada.
   */
  passwordAutoComplete?: 'current-password' | 'new-password';
}

const FIELD_CLASS =
  'rounded-xl border border-white/10 bg-bg-surface px-3 py-2 text-text-primary focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent';

export function AuthForm({
  title,
  submitLabel,
  onSubmit,
  onSuccess,
  footer,
  passwordAutoComplete = 'current-password',
}: AuthFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const hintId = useId();

  const isNewPassword = passwordAutoComplete === 'new-password';

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
          aria-invalid={error ? true : undefined}
          className={FIELD_CLASS}
        />
      </label>

      <label className="flex flex-col gap-1 text-sm text-text-secondary">
        Contraseña
        <input
          type="password"
          required
          minLength={6}
          autoComplete={passwordAutoComplete}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={isNewPassword ? hintId : undefined}
          className={FIELD_CLASS}
        />
        {/* La regla se lee antes de enviar, no después de que el navegador rechace. */}
        {isNewPassword && (
          <span id={hintId} className="text-xs text-text-muted">
            Al menos 6 caracteres.
          </span>
        )}
      </label>

      {error && (
        <p className="text-sm text-state-live" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-accent py-2.5 font-semibold text-bg-base transition-colors hover:bg-accent-hover active:bg-accent-hover disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {submitting ? 'Un momento…' : submitLabel}
      </button>

      {footer}
    </form>
  );
}
