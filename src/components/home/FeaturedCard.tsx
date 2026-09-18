import { usePlayerStore } from '../../store/playerStore';
import type { Radio } from '../../types/radio';
import { RadioCover } from './RadioCover';

interface FeaturedCardProps {
  radio: Radio;
}

export function FeaturedCard({ radio }: FeaturedCardProps) {
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
    <div className="relative mx-4 overflow-hidden rounded-3xl bg-brand-gradient p-5">
      <div className="rounded-[1.35rem] bg-bg-base/80 p-4 backdrop-blur-sm">
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-state-live px-2 py-0.5 text-xs font-bold text-white">
            LIVE
          </span>
          <span className="text-xs text-text-muted">{radio.frequency}</span>
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-surfaceAlt text-2xl">
              <RadioCover radio={radio} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-text-primary">{radio.name}</p>
              <p className="mt-0.5 truncate text-sm text-text-secondary">
                {radio.currentTrack
                  ? `${radio.currentTrack.artist} • ${radio.currentTrack.title}`
                  : `${radio.listeners.toLocaleString('es-AR')} oyentes`}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={handlePlayClick}
            aria-label={isThisPlaying ? 'Pausar' : 'Reproducir'}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-accent text-2xl text-white shadow-lg hover:bg-accent-hover active:bg-accent-active"
          >
            {isThisPlaying ? '⏸' : '▶'}
          </button>
        </div>
      </div>
    </div>
  );
}
