import type { Radio } from '../../types/radio';
import { RadioCard } from './RadioCard';

interface RadioGridProps {
  title?: string;
  radios: Radio[];
  emptyMessage?: string;
  isFavorite?: (radioId: string) => boolean;
  onToggleFavorite?: (radioId: string) => void;
}

export function RadioGrid({ title, radios, emptyMessage, isFavorite, onToggleFavorite }: RadioGridProps) {
  return (
    <section className="flex flex-col gap-3 px-4">
      {title && <h2 className="text-lg font-bold text-text-primary">{title}</h2>}

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
              onToggleFavorite={onToggleFavorite ? () => onToggleFavorite(radio.id) : undefined}
            />
          ))}
        </div>
      )}
    </section>
  );
}
