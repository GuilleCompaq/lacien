import type { Radio } from '../../types/radio';
import { RadioCard } from './RadioCard';

interface RadioGridProps {
  title?: string;
  radios: Radio[];
  emptyMessage?: string;
  isFavorite?: (radioId: string) => boolean;
  /** Recibe la emisora entera: el muro de autenticación necesita tapa y nombre. */
  onToggleFavorite?: (radio: Radio) => void;
  /** La página que lo usa decide si su título es el encabezado principal. */
  headingLevel?: 1 | 2;
}

export function RadioGrid({
  title,
  radios,
  emptyMessage,
  isFavorite,
  onToggleFavorite,
  headingLevel = 2,
}: RadioGridProps) {
  const Heading = headingLevel === 1 ? 'h1' : 'h2';
  return (
    <section className="flex flex-col gap-3 px-4">
      {title && (
        <Heading className="text-lg font-bold text-text-primary">
          {title}
          {radios.length > 0 && (
            <span className="ml-2 text-sm font-medium tabular-nums text-text-muted">
              {radios.length}
            </span>
          )}
        </Heading>
      )}

      {radios.length === 0 ? (
        <p className="py-8 text-center text-sm text-text-muted">
          {emptyMessage ?? 'No se encontraron radios.'}
        </p>
      ) : (
        <div className="flex flex-col gap-2">
          {radios.map((radio) => (
            <RadioCard
              key={radio.id}
              radio={radio}
              isFavorite={isFavorite?.(radio.id)}
              onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(radio) : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
