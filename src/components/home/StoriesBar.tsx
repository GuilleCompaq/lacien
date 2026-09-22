import { usePlayerStore } from '../../store/playerStore';
import type { Radio } from '../../types/radio';
import { StoryCircle } from './StoryCircle';

interface StoriesBarProps {
  radios: Radio[];
}

/**
 * Atajo a lo que ya escuchaste.
 *
 * Antes mostraba el catálogo entero: ~40 círculos idénticos en un solo punto de
 * decisión, ordenados por una columna que vale cero en todas las filas, así que
 * el orden no significaba nada. Ahora son las últimas escuchadas — dato real,
 * personal, que varía — y cuando no hay historial la sección no aparece.
 */
export function StoriesBar({ radios }: StoriesBarProps) {
  const play = usePlayerStore((s) => s.play);

  if (radios.length === 0) return null;

  return (
    <section aria-labelledby="recientes-titulo" className="flex flex-col gap-2">
      <h2 id="recientes-titulo" className="px-4 text-sm font-semibold text-text-secondary">
        Recientes
      </h2>
      <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 pb-1">
        {radios.map((radio) => (
          <StoryCircle key={radio.id} radio={radio} onSelect={play} />
        ))}
      </div>
    </section>
  );
}
