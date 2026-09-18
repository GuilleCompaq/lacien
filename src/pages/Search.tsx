import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { RadioGrid } from '../components/home/RadioGrid';
import { useFavorites } from '../hooks/useFavorites';
import { useRadios } from '../hooks/useRadios';

export default function Search() {
  const { radios, loading } = useRadios();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const results = useMemo(() => {
    if (!debouncedQuery) return radios;
    return radios.filter(
      (radio) =>
        radio.name.toLowerCase().includes(debouncedQuery) ||
        radio.genre.toLowerCase().includes(debouncedQuery),
    );
  }, [radios, debouncedQuery]);

  async function handleToggleFavorite(radioId: string) {
    const { error } = await toggleFavorite(radioId);
    if (error === 'auth-required') {
      navigate('/login', { state: { from: location.pathname } });
    }
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="px-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Buscar por nombre o género…"
          className="w-full rounded-xl border border-white/10 bg-bg-surface px-4 py-2.5 text-text-primary outline-none focus:border-accent"
        />
      </div>

      {loading ? (
        <p className="px-4 py-8 text-center text-text-muted">Cargando radios…</p>
      ) : (
        <RadioGrid
          radios={results}
          emptyMessage="No se encontraron radios."
          isFavorite={isFavorite}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </div>
  );
}
