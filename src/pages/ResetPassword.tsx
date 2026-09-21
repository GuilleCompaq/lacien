import { useState, type FormEvent } from 'react';
import { Link, useNavigate } from 'react-router';
import { useAuth } from '../hooks/useAuth';

/**
 * Dos momentos en una ruta: pedir el mail de recuperación y, al volver desde el
 * enlace, fijar la contraseña nueva. `isRecovering` distingue cuál mostrar.
 */
export default function ResetPassword() {
  const { requestPasswordReset, updatePassword, isRecovering } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);

  async function handleRequest(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await requestPasswordReset(email);
    setSubmitting(false);
    if (result.error) setError(result.error);
    else setSent(true);
  }

  async function handleUpdate(event: FormEvent) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);
    const result = await updatePassword(password);
    setSubmitting(false);
    if (result.error) setError(result.error);
    else navigate('/perfil', { replace: true });
  }

  if (isRecovering) {
    return (
      <form onSubmit={handleUpdate} className="flex flex-col gap-4 px-4 py-6">
        <h1 className="text-2xl font-bold text-text-primary">Elegí una contraseña nueva</h1>

        <label className="flex flex-col gap-1 text-sm text-text-secondary">
          Contraseña nueva
          <input
            type="password"
            required
            minLength={6}
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-describedby="reset-hint"
            className="rounded-xl border border-white/10 bg-bg-surface px-3 py-2 text-text-primary focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          <span id="reset-hint" className="text-xs text-text-muted">
            Al menos 6 caracteres.
          </span>
        </label>

        {error && (
          <p className="text-sm text-state-live" role="alert">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-xl bg-accent py-2.5 font-semibold text-bg-base hover:bg-accent-hover active:bg-accent-hover disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          {submitting ? 'Guardando…' : 'Guardar contraseña'}
        </button>
      </form>
    );
  }

  if (sent) {
    return (
      <div className="flex flex-col gap-3 px-4 py-6">
        <h1 className="text-2xl font-bold text-text-primary">Revisá tu correo</h1>
        <p className="text-sm text-text-secondary">
          Si <span className="font-medium text-text-primary">{email}</span> tiene una cuenta, le
          enviamos un enlace para elegir una contraseña nueva.
        </p>
        <Link
          to="/login"
          className="text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Volver a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleRequest} className="flex flex-col gap-4 px-4 py-6">
      <h1 className="text-2xl font-bold text-text-primary">Recuperar contraseña</h1>
      <p className="text-sm text-text-secondary">
        Escribí tu email y te mandamos un enlace para elegir una nueva.
      </p>

      <label className="flex flex-col gap-1 text-sm text-text-secondary">
        Email
        <input
          type="email"
          required
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="rounded-xl border border-white/10 bg-bg-surface px-3 py-2 text-text-primary focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </label>

      {error && (
        <p className="text-sm text-state-live" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="rounded-xl bg-accent py-2.5 font-semibold text-bg-base hover:bg-accent-hover active:bg-accent-hover disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        {submitting ? 'Enviando…' : 'Enviar enlace'}
      </button>

      <p className="text-center text-sm text-text-muted">
        ¿Te acordaste?{' '}
        <Link to="/login" className="text-accent">
          Iniciar sesión
        </Link>
      </p>
    </form>
  );
}
