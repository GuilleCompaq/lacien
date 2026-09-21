import { useMemo, useState } from 'react';
import { FeaturedCard } from '../components/home/FeaturedCard';
import { FilterPills, type BandFilter } from '../components/home/FilterPills';
import { RadioGrid } from '../components/home/RadioGrid';
import { StoriesBar } from '../components/home/StoriesBar';
import { useFavoriteGate } from '../hooks/useFavoriteGate';
import { SaveFavoriteSheet } from '../components/auth/SaveFavoriteSheet';
import { Notice } from '../components/ui/Notice';
import { useRadios } from '../hooks/useRadios';
import { bandFromFrequency } from '../types/radio';
import { isStreamPlayable } from '../lib/streamSupport';

export default function Home() {
  const { radios, loading, error } = useRadios();
  const { isFavorite, requestToggleFavorite, gateRadio, closeGate, notice, dismissNotice } =
    useFavoriteGate(radios);
  const [band, setBand] = useState<BandFilter>('todas');
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

  if (loading) {
    return <p className="px-4 py-8 text-center text-text-muted">Cargando radios…</p>;
  }

  if (error) {
    return <p className="px-4 py-8 text-center text-state-live" role="alert">
        {error}
      </p>;
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
        onToggleFavorite={requestToggleFavorite}
      />

      {notice && <Notice {...notice} onDismiss={dismissNotice} />}
      {gateRadio && <SaveFavoriteSheet radio={gateRadio} onClose={closeGate} />}
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
