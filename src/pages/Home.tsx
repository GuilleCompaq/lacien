import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FeaturedCard } from '../components/home/FeaturedCard';
import { FilterPills, type GenreFilter } from '../components/home/FilterPills';
import { RadioGrid } from '../components/home/RadioGrid';
import { StoriesBar } from '../components/home/StoriesBar';
import { useFavorites } from '../hooks/useFavorites';
import { useRadios } from '../hooks/useRadios';

export default function Home() {
  const { radios, loading, error } = useRadios();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [genre, setGenre] = useState<GenreFilter>('todo');
  const navigate = useNavigate();
  const location = useLocation();

  const liveRadios = useMemo(() => radios.filter((r) => r.isLive), [radios]);
  const featured = liveRadios[0];
  const filtered = useMemo(
    () => (genre === 'todo' ? radios : radios.filter((r) => r.genre === genre)),
    [radios, genre],
  );

  async function handleToggleFavorite(radioId: string) {
    const { error } = await toggleFavorite(radioId);
    if (error === 'auth-required') {
      navigate('/login', { state: { from: location.pathname } });
    }
  }

  if (loading) {
    return <p className="px-4 py-8 text-center text-text-muted">Cargando radios…</p>;
  }

  if (error) {
    return <p className="px-4 py-8 text-center text-state-live">No se pudieron cargar las radios: {error}</p>;
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      <StoriesBar radios={liveRadios} />
      {featured && <FeaturedCard radio={featured} />}
      <FilterPills value={genre} onChange={setGenre} />
      <RadioGrid
        title="Populares"
        radios={filtered}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}
