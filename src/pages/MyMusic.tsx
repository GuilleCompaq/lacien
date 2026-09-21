import { useMemo } from 'react';
import { Link } from 'react-router';
import { RadioGrid } from '../components/home/RadioGrid';
import { Notice } from '../components/ui/Notice';
import { UserIcon } from '../components/icons';
import { useAuth } from '../hooks/useAuth';
import { useFavoriteGate } from '../hooks/useFavoriteGate';
import { useRadios } from '../hooks/useRadios';

export default function MyMusic() {
  const { user, loading: authLoading } = useAuth();
  const { radios, loading: radiosLoading } = useRadios();
  const {
    favoriteIds,
    isFavorite,
    requestToggleFavorite,
    loading: favoritesLoading,
    error: favoritesError,
    notice,
    dismissNotice,
  } = useFavoriteGate(radios);

  const favorites = useMemo(
    () => radios.filter((radio) => favoriteIds.has(radio.id)),
    [radios, favoriteIds],
  );

  // La sesión se resuelve de forma asíncrona. Sin esperarla, un usuario con cuenta
  // veía el muro de registro en cada recarga: la app le decía que no es miembro.
  if (authLoading) {
    return <p className="px-4 py-8 text-center text-text-muted">Cargando tu cuenta…</p>;
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-surfaceAlt text-text-muted">
          <UserIcon className="h-8 w-8" />
        </div>
        <h1 className="text-lg font-bold text-text-primary">Guardá tus radios</h1>
        <p className="text-sm text-text-muted">
          Con una cuenta tus radios te siguen a cualquier dispositivo.
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            to="/login"
            state={{ from: '/mi-musica' }}
            className="rounded-xl bg-bg-surfaceAlt px-4 py-2 text-sm font-semibold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Iniciar sesión
          </Link>
          <Link
            to="/registro"
            state={{ from: '/mi-musica' }}
            className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-bg-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Crear cuenta
          </Link>
        </div>
      </div>
    );
  }

  // Esperar ambas consultas: mostrar el estado vacío con los favoritos en vuelo
  // afirmaría que no hay ninguna antes de saberlo.
  if (radiosLoading || favoritesLoading) {
    return <p className="px-4 py-8 text-center text-text-muted">Cargando tus radios…</p>;
  }

  // Una consulta fallida no es una lista vacía: caer en el estado vacío le decía
  // al usuario que nunca guardó nada.
  if (favoritesError) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-12 text-center" role="alert">
        <h1 className="text-lg font-bold text-text-primary">No pudimos traer tus favoritas</h1>
        <p className="text-sm text-text-muted">
          Tus radios siguen guardadas. Revisá tu conexión y volvé a intentar.
        </p>
        <button
          type="button"
          onClick={() => globalThis.location.reload()}
          className="mt-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-bg-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="py-4">
      <RadioGrid
        title="Mis favoritas"
        radios={favorites}
        emptyMessage="Todavía no guardaste ninguna radio. Tocá el corazón en cualquier emisora."
        isFavorite={isFavorite}
        onToggleFavorite={requestToggleFavorite}
      />

      {notice && <Notice {...notice} onDismiss={dismissNotice} />}
    </div>
  );
}
