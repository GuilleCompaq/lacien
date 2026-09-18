import { usePlayerStore } from '../../store/playerStore';
import type { Radio } from '../../types/radio';
import { RadioCover } from './RadioCover';

interface RadioCardProps {
  radio: Radio;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function RadioCard({ radio, isFavorite, onToggleFavorite }: RadioCardProps) {
  const currentRadio = usePlayerStore((s) => s.currentRadio);
  const isPlaying = usePlayerStore((s) => s.isPlaying);
  const play = usePlayerStore((s) => s.play);
  const togglePlay = usePlayerStore((s) => s.togglePlay);

  const isThisPlaying = currentRadio?.id === radio.id && isPlaying;

  function handlePlayClick() {
    if (currentRadio?.id === radio.id) {
      togglePlay();
    } else {
      play(radio);
    }
  }

  return (
    <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-bg-surface p-3">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-bg-surfaceAlt text-2xl">
        <RadioCover radio={radio} />
      </div>

      <div className="min-w-0 flex-1">
        <p className="truncate font-semibold text-text-primary">{radio.name}</p>
        <p className="truncate text-xs text-text-muted">
          {radio.listeners.toLocaleString('es-AR')} oyentes ·{' '}
          <span className="text-accent">{radio.frequency}</span>
        </p>
      </div>

      {onToggleFavorite && (
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
          aria-pressed={isFavorite}
          className={`shrink-0 text-lg ${isFavorite ? 'text-accent' : 'text-text-muted'}`}
        >
          {isFavorite ? '♥' : '♡'}
        </button>
      )}

      <button
        type="button"
        onClick={handlePlayClick}
        aria-label={isThisPlaying ? 'Pausar' : 'Reproducir'}
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover active:bg-accent-active"
      >
        {isThisPlaying ? '⏸' : '▶'}
      </button>
    </div>
  );
}
