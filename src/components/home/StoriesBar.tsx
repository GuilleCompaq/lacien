import { usePlayerStore } from '../../store/playerStore';
import type { Radio } from '../../types/radio';
import { StoryCircle } from './StoryCircle';

interface StoriesBarProps {
  radios: Radio[];
}

export function StoriesBar({ radios }: StoriesBarProps) {
  const play = usePlayerStore((s) => s.play);

  if (radios.length === 0) return null;

  return (
    <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 py-2">
      {radios.map((radio) => (
        <StoryCircle key={radio.id} radio={radio} onSelect={play} />
      ))}
    </div>
  );
}
