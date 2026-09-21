import { Link, useLocation, useNavigate } from 'react-router';
import { AuthForm } from '../components/auth/AuthForm';
import { useAuth } from '../hooks/useAuth';

export default function Login() {
  const { signIn } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = (location.state as { from?: string } | null)?.from ?? '/perfil';

  return (
    <AuthForm
      title="Iniciar sesión"
      submitLabel="Iniciar sesión"
      onSubmit={signIn}
      onSuccess={() => navigate(from, { replace: true })}
      footer={
        <>
          <p className="text-center text-sm">
            <Link to="/recuperar" className="text-accent">
              ¿Olvidaste tu contraseña?
            </Link>
          </p>
          <p className="text-center text-sm text-text-muted">
            ¿No tenés cuenta?{' '}
            <Link to="/registro" className="text-accent">
              Registrate
            </Link>
          </p>
        </>
      }
    />
  );
}
