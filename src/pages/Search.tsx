import { useEffect, useMemo, useState } from 'react';
import { RadioGrid } from '../components/home/RadioGrid';
import { useFavoriteGate } from '../hooks/useFavoriteGate';
import { SaveFavoriteSheet } from '../components/auth/SaveFavoriteSheet';
import { Notice } from '../components/ui/Notice';
import { useRadios } from '../hooks/useRadios';
import { genreLabel, type Radio } from '../types/radio';

/** Sin tildes y en minúscula: "Clásica", copiado de la propia app, debe encontrar `clasica`. */
function normalize(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .trim();
}

/** El dial es como el oyente nombra la emisora, así que tiene que ser buscable. */
function haystack(radio: Radio): string {
  return normalize(`${radio.name} ${radio.frequency} ${genreLabel(radio.genre)}`);
}

export default function Search() {
  const { radios, loading, error } = useRadios();
  const { isFavorite, requestToggleFavorite, gateRadio, closeGate, notice, dismissNotice } =
    useFavoriteGate(radios);
  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  useEffect(() => {
    const timeout = setTimeout(() => setDebouncedQuery(normalize(query)), 300);
    return () => clearTimeout(timeout);
  }, [query]);

  const results = useMemo(() => {
    if (!debouncedQuery) return radios;
    return radios.filter((radio) => haystack(radio).includes(debouncedQuery));
  }, [radios, debouncedQuery]);

  return (
    <div className="flex flex-col gap-4 py-4">
      <div className="px-4">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Buscar radios por nombre, dial o género"
          placeholder="Buscar por nombre, dial o género…"
          className="w-full rounded-xl border border-white/10 bg-bg-surface px-4 py-2.5 text-text-primary placeholder:text-text-muted focus-visible:border-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        />
      </div>

      {loading ? (
        <p className="px-4 py-8 text-center text-text-muted">Cargando radios…</p>
      ) : error ? (
        // Antes este caso caía en "No se encontraron radios": un estado vacío
        // que reportaba una caída del backend como una búsqueda sin resultados.
        <p className="px-4 py-8 text-center text-state-live" role="alert">
          No se pudieron cargar las radios. Revisá tu conexión y probá de nuevo.
        </p>
      ) : (
        <>
          {debouncedQuery && (
            <p className="px-4 text-sm text-text-muted" role="status">
              {resultsSummary(results.length)}
            </p>
          )}
          <RadioGrid
            radios={results}
            emptyMessage={`No encontramos radios para "${query.trim()}".`}
            isFavorite={isFavorite}
            onToggleFavorite={requestToggleFavorite}
          />
        </>
      )}

      {notice && <Notice {...notice} onDismiss={dismissNotice} />}
      {gateRadio && <SaveFavoriteSheet radio={gateRadio} onClose={closeGate} />}
    </div>
  );
}

function resultsSummary(count: number): string {
  if (count === 0) return 'Sin resultados';
  if (count === 1) return '1 radio encontrada';
  return `${count.toLocaleString('es-AR')} radios encontradas`;
}
