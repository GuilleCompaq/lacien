import { Link } from 'react-router';
import { useAuth } from '../hooks/useAuth';
import { useFavorites } from '../hooks/useFavorites';
import { ChevronRightIcon, UserIcon } from '../components/icons';

export default function Profile() {
  const { user, signOut } = useAuth();
  const { favoriteIds, loading } = useFavorites();

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-bg-surfaceAlt text-text-muted">
          <UserIcon className="h-9 w-9" />
        </div>
        <h1 className="text-lg font-bold text-text-primary">Todavía no iniciaste sesión</h1>
        <p className="text-sm text-text-muted">
          Iniciá sesión para guardar radios y encontrarlas desde cualquier dispositivo.
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            to="/login"
            state={{ from: '/perfil' }}
            className="rounded-xl bg-bg-surfaceAlt px-4 py-2 text-sm font-semibold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/registro"
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-bg-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4 px-4 py-8">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-brand-gradient text-2xl font-bold text-bg-base">
        {initialsFrom(user.email)}
      </div>

      <div className="text-center">
        <p className="font-semibold text-text-primary">{user.email}</p>
        <p className="text-xs text-text-muted">{memberSince(user.created_at)}</p>
      </div>

      {/* El conteo real reemplaza a las estadísticas inventadas, y de paso lleva
          a donde están las radios en vez de ser solo un número. */}
      <Link
        to="/mi-musica"
        className="flex w-full items-center justify-between gap-3 rounded-2xl bg-bg-surface p-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <span className="min-w-0">
          <span className="block font-semibold text-text-primary">Mis favoritas</span>
          <span className="block text-xs text-text-muted">
            {loading ? 'Contando…' : favoritesSummary(favoriteIds.size)}
          </span>
        </span>
        <ChevronRightIcon className="h-5 w-5 shrink-0 text-text-muted" />
      </Link>

      <button
        type="button"
        onClick={signOut}
        className="mt-2 rounded-xl bg-bg-surfaceAlt px-4 py-2 text-sm font-semibold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        Cerrar sesión
      </button>
    </div>
  );
}

/** Sin avatar real, las iniciales del email personalizan con un dato verdadero. */
function initialsFrom(email: string | undefined): string {
  const local = email?.split('@')[0] ?? '';
  const parts = local.split(/[.\-_]+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[1][0] : local.slice(0, 2);
  return letters.toUpperCase() || '—';
}

function memberSince(createdAt: string | undefined): string {
  if (!createdAt) return 'Miembro de LaCienRadios';
  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) return 'Miembro de LaCienRadios';
  return `Miembro desde ${date.toLocaleDateString('es-AR', { month: 'long', year: 'numeric' })}`;
}

function favoritesSummary(count: number): string {
  if (count === 0) return 'Todavía no guardaste ninguna';
  if (count === 1) return '1 radio guardada';
  return `${count.toLocaleString('es-AR')} radios guardadas`;
}
