import { useMemo, useState } from 'react';
import { FeaturedCard } from '../components/home/FeaturedCard';
import { FilterPills, type BandFilter } from '../components/home/FilterPills';
import { RadioGrid } from '../components/home/RadioGrid';
import { StoriesBar } from '../components/home/StoriesBar';
import { useFavoriteGate } from '../hooks/useFavoriteGate';
import { SaveFavoriteSheet } from '../components/auth/SaveFavoriteSheet';
import { Notice } from '../components/ui/Notice';
import { useRadios } from '../hooks/useRadios';
import { usePlayerStore } from '../store/playerStore';
import { bandFromFrequency } from '../types/radio';
import { isStreamPlayable } from '../lib/streamSupport';

export default function Home() {
  const { radios, loading, error } = useRadios();
  const { isFavorite, requestToggleFavorite, gateRadio, closeGate, notice, dismissNotice } =
    useFavoriteGate(radios);
  const [band, setBand] = useState<BandFilter>('todas');
  const recentIds = usePlayerStore((s) => s.recentIds);

  /**
   * El historial guarda ids; acá se resuelven contra el catálogo, conservando el
   * orden de escucha y descartando lo que ya no puede sonar. La más reciente va
   * al destacado y el resto al carrusel, así ninguna aparece dos veces arriba.
   */
  const recent = useMemo(() => {
    const byId = new Map(radios.map((radio) => [radio.id, radio]));
    return recentIds
      .map((id) => byId.get(id))
      .filter((radio): radio is NonNullable<typeof radio> => Boolean(radio))
      .filter((radio) => isStreamPlayable(radio.streamUrl));
  }, [radios, recentIds]);

  const [featured, ...olderRecent] = recent;

  const filtered = useMemo(
    () => (band === 'todas' ? radios : radios.filter((r) => bandFromFrequency(r.frequency) === band)),
    [radios, band],
  );

  if (loading) {
    return <p className="px-4 py-8 text-center text-text-muted">Cargando radios…</p>;
  }

  if (error) {
    return (
      <p className="px-4 py-8 text-center text-state-live" role="alert">
        {error}
      </p>
    );
  }

  return (
    <div className="flex flex-col gap-4 py-4">
      {/* Las secciones de arriba son h2, así que el encabezado de la página tiene
          que precederlas en el DOM aunque no se dibuje. */}
      <h1 className="sr-only">Radios</h1>

      {/* Sin historial, Inicio arranca en los filtros y la lista: nada inventado
          ocupando la primera pantalla. Las dos secciones aparecen con el uso. */}
      {featured && <FeaturedCard radio={featured} />}
      <StoriesBar radios={olderRecent} />
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
