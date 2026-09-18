import type { Radio } from '../../types/radio';
import { RadioCover } from './RadioCover';

interface StoryCircleProps {
  radio: Radio;
  onSelect: (radio: Radio) => void;
}

export function StoryCircle({ radio, onSelect }: StoryCircleProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(radio)}
      className="flex w-16 shrink-0 flex-col items-center gap-1"
    >
      <div
        className={`relative flex h-16 w-16 items-center justify-center rounded-full text-2xl ${
          radio.isLive ? 'bg-brand-gradient p-0.5' : 'bg-white/10 p-0.5'
        }`}
      >
        <div className="flex h-full w-full items-center justify-center overflow-hidden rounded-full bg-bg-surface">
          <RadioCover radio={radio} />
        </div>
        {radio.isLive && (
          <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-state-live px-1.5 py-0.5 text-[9px] font-bold leading-none text-white">
            LIVE
          </span>
        )}
      </div>
      <span className="w-full truncate text-center text-xs text-text-secondary">{radio.name}</span>
    </button>
  );
}
