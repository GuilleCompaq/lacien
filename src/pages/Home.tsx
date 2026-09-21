import { useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router';
import { FeaturedCard } from '../components/home/FeaturedCard';
import { FilterPills, type BandFilter } from '../components/home/FilterPills';
import { RadioGrid } from '../components/home/RadioGrid';
import { StoriesBar } from '../components/home/StoriesBar';
import { useFavorites } from '../hooks/useFavorites';
import { useRadios } from '../hooks/useRadios';
import { bandFromFrequency } from '../types/radio';
import { isStreamPlayable } from '../lib/streamSupport';

export default function Home() {
  const { radios, loading, error } = useRadios();
  const { isFavorite, toggleFavorite } = useFavorites();
  const [band, setBand] = useState<BandFilter>('todas');
  const navigate = useNavigate();
  const location = useLocation();

  // Destacados y el carrusel solo muestran señales que realmente pueden sonar:
  // son los dos lugares donde la app invita a reproducir sin que el usuario elija.
  const liveRadios = useMemo(
    () => radios.filter((r) => r.isLive && isStreamPlayable(r.streamUrl)),
    [radios],
  );
  const featured = liveRadios[0];
  const filtered = useMemo(
    () => (band === 'todas' ? radios : radios.filter((r) => bandFromFrequency(r.frequency) === band)),
    [radios, band],
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
      <FilterPills value={band} onChange={setBand} />
      <RadioGrid
        title={bandTitle(band)}
        radios={filtered}
        isFavorite={isFavorite}
        onToggleFavorite={handleToggleFavorite}
      />
    </div>
  );
}

/** El título nombra lo que el filtro devuelve; "Populares" afirmaba un orden por
 *  una columna que vale cero en las 43 filas. */
function bandTitle(band: BandFilter): string {
  if (band === 'AM') return 'Radios AM';
  if (band === 'FM') return 'Radios FM';
  return 'Todas las radios';
}
