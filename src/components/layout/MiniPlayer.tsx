import { usePlayer } from '../../hooks/usePlayer';
import { AlertIcon, CloseIcon, SpinnerIcon } from '../icons';
import { PlayButton } from '../player/PlayButton';
import { RadioCover } from '../home/RadioCover';

export function MiniPlayer() {
  const { currentRadio, status, errorMessage, stop } = usePlayer();

  if (!currentRadio) return null;

  return (
    <div
      // Se apoya justo encima de la nav usando su altura real más el área segura.
      // Con el `bottom-16` fijo anterior quedaba una franja de ~12px por la que se
      // veía pasar el contenido de la página.
      className="app-bar z-20 flex items-center gap-3 border-t border-white/5 bg-bg-surfaceAlt px-4"
      style={{
        bottom: 'calc(var(--nav-h) + var(--safe-bottom))',
        height: 'var(--player-h)',
      }}
      role="region"
      aria-label="Reproductor"
    >
      <div
        className={`flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-bg-surface text-xl ${
          status === 'error' ? 'opacity-50 grayscale' : ''
        }`}
      >
        <RadioCover radio={currentRadio} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-semibold text-text-primary">{currentRadio.name}</p>
        <StatusLine
          status={status}
          errorMessage={errorMessage}
          track={currentRadio.currentTrack}
          frequency={currentRadio.frequency}
        />
      </div>

      <PlayButton radio={currentRadio} />

      <button
        type="button"
        onClick={stop}
        aria-label={`Cerrar el reproductor y dejar de escuchar ${currentRadio.name}`}
        className="-m-1.5 shrink-0 rounded-full p-3 text-text-muted transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <CloseIcon className="h-4 w-4" />
      </button>
    </div>
  );
}

interface StatusLineProps {
  status: string;
  errorMessage: string | null;
  track?: { artist: string; title: string };
  frequency: string;
}

/**
 * Única fuente de verdad visible sobre qué está pasando con el audio.
 * `aria-live` la anuncia a lectores de pantalla cuando el estado cambia.
 */
function StatusLine({ status, errorMessage, track, frequency }: StatusLineProps) {
  if (status === 'error') {
    return (
      <p className="flex items-start gap-1.5 text-xs text-state-live" role="alert">
        <AlertIcon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
        <span className="truncate">{errorMessage ?? 'No pudimos conectar con la señal.'}</span>
      </p>
    );
  }

  if (status === 'connecting') {
    return (
      <p className="flex items-center gap-1.5 text-xs text-text-secondary" aria-live="polite">
        <SpinnerIcon className="h-3.5 w-3.5 shrink-0" />
        Conectando…
      </p>
    );
  }

  return (
    <p className="truncate text-xs text-text-muted" aria-live="polite">
      {status === 'playing' && (
        <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-state-success align-middle" />
      )}
      {track ? `${track.artist} • ${track.title}` : frequency}
    </p>
  );
}
