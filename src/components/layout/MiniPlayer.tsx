import { usePlayer } from '../../hooks/usePlayer';
import { RadioCover } from '../home/RadioCover';

export function MiniPlayer() {
  const { currentRadio, isPlaying, togglePlay } = usePlayer();

  if (!currentRadio) return null;

  return (
    <div className="fixed inset-x-0 bottom-16 z-20 border-t border-white/5 bg-bg-surfaceAlt px-4 py-2">
      <div className="mb-2 h-0.5 w-full overflow-hidden rounded-full bg-white/10">
        <div
          className={`h-full w-1/3 bg-brand-gradient ${isPlaying ? 'animate-pulse' : ''}`}
        />
      </div>
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-bg-surface text-xl">
          <RadioCover radio={currentRadio} />
        </div>
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-text-primary">{currentRadio.name}</p>
          <p className="truncate text-xs text-text-muted">
            {currentRadio.currentTrack
              ? `${currentRadio.currentTrack.artist} • ${currentRadio.currentTrack.title}`
              : currentRadio.frequency}
          </p>
        </div>
        <button
          type="button"
          onClick={togglePlay}
          aria-label={isPlaying ? 'Pausar' : 'Reproducir'}
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent text-white hover:bg-accent-hover active:bg-accent-active"
        >
          {isPlaying ? '⏸' : '▶'}
        </button>
      </div>
    </div>
  );
}
