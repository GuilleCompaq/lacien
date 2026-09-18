import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';

export default function Profile() {
  const { user, signOut } = useAuth();

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-surfaceAlt text-3xl">
          👤
        </div>
        <h1 className="text-lg font-bold text-text-primary">Todavía no iniciaste sesión</h1>
        <div className="mt-2 flex gap-3">
          <Link
            to="/login"
            state={{ from: '/perfil' }}
            className="rounded-xl bg-bg-surfaceAlt px-4 py-2 text-sm font-semibold text-text-primary"
          >
            Iniciar sesión
          </Link>
          <Link to="/registro" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white">
            Registrarme
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-8 text-center">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-3xl">
        🎧
      </div>
      <div>
        <p className="font-semibold text-text-primary">{user.email}</p>
        <p className="text-xs text-text-muted">Miembro de LaCienRadios</p>
      </div>

      <div className="grid w-full grid-cols-2 gap-3">
        <div className="rounded-2xl bg-bg-surface p-4">
          <p className="text-xl font-bold text-text-primary">128h</p>
          <p className="text-xs text-text-muted">Escuchadas</p>
        </div>
        <div className="rounded-2xl bg-bg-surface p-4">
          <p className="text-xl font-bold text-text-primary">12</p>
          <p className="text-xs text-text-muted">Favoritas</p>
        </div>
      </div>

      <button
        type="button"
        onClick={signOut}
        className="mt-2 rounded-xl bg-bg-surfaceAlt px-4 py-2 text-sm font-semibold text-text-primary"
      >
        Cerrar sesión
      </button>
    </div>
  );
}
