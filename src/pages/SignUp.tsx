import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';
import { AuthIntent } from '../components/auth/AuthIntent';

type ResendState = 'idle' | 'sending' | 'sent' | 'error';

export default function SignUp() {
  const { signUp, resendConfirmation } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  // Volver a donde estaba: ahí está la emisora que quiso guardar.
  const from = (location.state as { from?: string } | null)?.from ?? '/';

  // Se guarda el email para poder reenviar la confirmación y para mostrárselo:
  // si se equivocó al tipearlo, es la única forma de que se dé cuenta.
  const [pendingEmail, setPendingEmail] = useState<string | null>(null);
  const [resend, setResend] = useState<ResendState>('idle');
  const [resendError, setResendError] = useState<string | null>(null);

  async function handleSignUp(email: string, password: string) {
    const { error, needsEmailConfirmation } = await signUp(email, password, from);
    if (!error && needsEmailConfirmation) setPendingEmail(email);
    // Con confirmación pendiente no hay sesión: avanzar sería mandarlo a una
    // pantalla que lo va a tratar como anónimo.
    return { error, handled: !error && needsEmailConfirmation };
  }

  async function handleResend() {
    if (!pendingEmail) return;
    setResend('sending');
    setResendError(null);
    const { error } = await resendConfirmation(pendingEmail, from);
    if (error) {
      setResend('error');
      setResendError(error);
    } else {
      setResend('sent');
    }
  }

  if (pendingEmail) {
    return (
      <div className="flex flex-col gap-4 px-4 py-6">
        <h1 className="text-2xl font-bold text-text-primary">Revisá tu correo</h1>
        <p className="text-sm text-text-secondary">
          Te enviamos un enlace de confirmación a{' '}
          <span className="font-medium text-text-primary">{pendingEmail}</span>. Abrilo desde este
          mismo navegador y volvés directo a donde estabas.
        </p>

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={handleResend}
            disabled={resend === 'sending' || resend === 'sent'}
            className="rounded-xl bg-bg-surfaceAlt py-2.5 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 disabled:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            {resend === 'sending'
              ? 'Enviando…'
              : resend === 'sent'
                ? 'Enlace reenviado'
                : 'No me llegó, reenviar'}
          </button>

          {/* Un email mal tipeado dejaba la cuenta en una dirección ajena y sin salida. */}
          <button
            type="button"
            onClick={() => {
              setPendingEmail(null);
              setResend('idle');
              setResendError(null);
            }}
            className="rounded-xl py-2.5 text-sm font-semibold text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Usar otro email
          </button>
        </div>

        {resend === 'sent' && (
          <p className="text-sm text-state-success" role="status">
            Listo. Si tampoco llega, revisá la carpeta de spam.
          </p>
        )}
        {resendError && (
          <p className="text-sm text-state-live" role="alert">
            {resendError}
          </p>
        )}

        <p className="text-center text-sm text-text-muted">
          ¿Ya confirmaste?{' '}
          <Link to="/login" className="text-accent">
            Iniciar sesión
          </Link>
        </p>
      </div>
    );
  }

  return (
    <AuthForm
      title="Crear cuenta"
      submitLabel="Crear cuenta"
      passwordAutoComplete="new-password"
      intro={<AuthIntent />}
      onSubmit={handleSignUp}
      onSuccess={() => navigate(from, { replace: true })}
      footer={
        <p className="text-center text-sm text-text-muted">
          ¿Ya tenés cuenta?{' '}
          <Link to="/login" className="text-accent">
            Iniciá sesión
          </Link>
        </p>
      }
    />
  );
}
