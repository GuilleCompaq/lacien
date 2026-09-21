import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';

export default function SignUp() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function handleSignUp(email: string, password: string) {
    const { error, needsEmailConfirmation } = await signUp(email, password);
    if (!error) setNeedsConfirmation(needsEmailConfirmation);
    return { error };
  }

  if (needsConfirmation) {
    return (
      <div className="flex flex-col gap-3 px-4 py-6">
        <h1 className="text-2xl font-bold text-text-primary">¡Ya casi!</h1>
        <p className="text-sm text-text-secondary">
          Te enviamos un email de confirmación. Confirmá tu cuenta y después iniciá sesión.
        </p>
        <Link to="/login" className="text-accent">
          Ir a iniciar sesión
        </Link>
      </div>
    );
  }

  return (
    <AuthForm
      title="Crear cuenta"
      submitLabel="Crear cuenta"
      onSubmit={handleSignUp}
      onSuccess={() => navigate('/perfil', { replace: true })}
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
