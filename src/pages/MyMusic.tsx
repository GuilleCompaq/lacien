import { useMemo } from 'react';
import { Link } from 'react-router';
import { RadioGrid } from '../components/home/RadioGrid';
import { useAuth } from '../hooks/useAuth';
import { useFavoriteGate } from '../hooks/useFavoriteGate';
import { useRadios } from '../hooks/useRadios';

export default function MyMusic() {
  const { user } = useAuth();
  const { radios, loading: radiosLoading } = useRadios();
  const { favoriteIds, isFavorite, requestToggleFavorite, loading: favoritesLoading } = useFavoriteGate();

  const favorites = useMemo(
    () => radios.filter((radio) => favoriteIds.has(radio.id)),
    [radios, favoriteIds],
  );

  if (!user) {
    return (
      <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
        <p className="text-4xl">🔒</p>
        <h1 className="text-lg font-bold text-text-primary">Registrate para guardar favoritas</h1>
        <p className="text-sm text-text-muted">
          Creá una cuenta para armar tu propia lista de radios favoritas.
        </p>
        <div className="mt-2 flex gap-3">
          <Link
            to="/login"
            state={{ from: '/mi-musica' }}
            className="rounded-xl bg-bg-surfaceAlt px-4 py-2 text-sm font-semibold text-text-primary"
          >
            Iniciar sesión
          </Link>
          <Link to="/registro" className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-bg-base">
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

  return (
    <div className="py-4">
      <RadioGrid
        title="Mi Música"
        radios={favorites}
        emptyMessage="Todavía no agregaste radios favoritas."
        isFavorite={isFavorite}
        onToggleFavorite={requestToggleFavorite}
      />
    </div>
  );
}
