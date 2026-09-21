import { usePlayer } from '../../hooks/usePlayer';
import { AlertIcon, SpinnerIcon } from '../icons';
import { PlayButton } from '../player/PlayButton';
import { RadioCover } from '../home/RadioCover';

export function MiniPlayer() {
  const { currentRadio, status, errorMessage } = usePlayer();

  if (!currentRadio) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-16 z-20 border-t border-white/5 bg-bg-surfaceAlt px-4 py-2.5"
      role="region"
      aria-label="Reproductor"
    >
      <div className="flex items-center gap-3">
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
      </div>
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
        <span className="line-clamp-2">{errorMessage ?? 'No pudimos conectar con la señal.'}</span>
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
