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
   * El historial guarda ids; acá se resuelve contra el catálogo el más reciente
   * que todavía pueda sonar. Alcanza con uno: el carrusel de recientes se dio de
   * baja y la tarjeta destacada es su único consumidor.
   *
   * Se recorre en vez de tomar `recentIds[0]` porque la última escuchada puede
   * haber salido del catálogo o haberse quedado sin señal usable, y en ese caso
   * la tarjeta debe caer a la anterior, no desaparecer.
   */
  const featured = useMemo(() => {
    const byId = new Map(radios.map((radio) => [radio.id, radio]));
    for (const id of recentIds) {
      const radio = byId.get(id);
      if (radio && isStreamPlayable(radio.streamUrl)) return radio;
    }
    return undefined;
  }, [radios, recentIds]);

  /**
   * Top 10 editorial, ordenado por el `score` que asigna el administrador.
   *
   * El filtro `score > 0` es lo que mantiene honesta la sección: sin puntajes
   * cargados no hay ranking que mostrar y el carrusel no aparece, en vez de
   * rotular como "Top 10" a las diez primeras emisoras del abecedario.
   *
   * El desempate por nombre importa: `score` es un entero que se repite con
   * facilidad, y sin segundo criterio el orden de dos emisoras empatadas
   * dependería de cómo vino la respuesta, cambiando entre cargas.
   */
  const topRadios = useMemo(
    () =>
      radios
        .filter((r) => r.score > 0 && isStreamPlayable(r.streamUrl))
        .sort((a, b) => b.score - a.score || a.name.localeCompare(b.name, 'es'))
        .slice(0, 10),
    [radios],
  );

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

      {/* Ninguna de las dos piezas de arriba se dibuja vacía: el Top 10 espera a
          que haya puntajes cargados y la tarjeta a que haya historial. En una
          instalación nueva, Inicio arranca directo en los filtros y la lista —
          nada inventado ocupando la primera pantalla. */}
      <StoriesBar title="Top 10" radios={topRadios} />
      {featured && (
        <FeaturedCard
          radio={featured}
          isFavorite={isFavorite(featured.id)}
          onToggleFavorite={() => requestToggleFavorite(featured)}
        />
      )}
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
