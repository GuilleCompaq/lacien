import { useId } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import type { Radio } from '../../types/radio';
import { StoryCircle } from './StoryCircle';

interface StoriesBarProps {
  title: string;
  radios: Radio[];
}

/**
 * Carrusel de emisoras en formato story, con encabezado propio.
 *
 * Hoy lo usa una sola sección, el "Top 10"; el carrusel de recientes se dio de
 * baja. Sigue recibiendo el título por parámetro porque la pieza es genérica y
 * fijarlo acá no ahorraría nada.
 *
 * No se dibuja vacío: sin contenido la sección no aparece, en lugar de dejar un
 * título sobre la nada.
 */
export function StoriesBar({ title, radios }: StoriesBarProps) {
  const play = usePlayerStore((s) => s.play);
  const titleId = useId();

  if (radios.length === 0) return null;

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-2">
      <h2 id={titleId} className="px-4 text-sm font-semibold text-text-secondary">
        {title}
      </h2>
      <div className="scrollbar-none flex gap-3 overflow-x-auto px-4 pb-1">
        {radios.map((radio) => (
          <StoryCircle key={radio.id} radio={radio} onSelect={play} />
        ))}
      </div>
    </section>
  );
}
