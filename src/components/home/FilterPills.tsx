import type { Band } from '../../types/radio';

export type BandFilter = Band | 'todas';

/**
 * Banda en lugar de género. El género ofrecía ocho opciones donde tres devolvían
 * una sola emisora y `general` cubría 26 de 43: no era un eje, era una lista.
 * AM/FM parte el catálogo en 11 y 32 y es el eje que un oyente usa de verdad.
 */
const filters: { value: BandFilter; label: string }[] = [
  { value: 'todas', label: 'Todas' },
  { value: 'AM', label: 'AM' },
  { value: 'FM', label: 'FM' },
];

interface FilterPillsProps {
  value: BandFilter;
  onChange: (value: BandFilter) => void;
}

export function FilterPills({ value, onChange }: FilterPillsProps) {
  return (
    <div className="flex gap-2 px-4" role="group" aria-label="Filtrar por banda">
      {filters.map((filter) => {
        const isActive = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            aria-pressed={isActive}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
              isActive
                ? // Texto oscuro sobre el rosa: con blanco daba 4.1:1 y no llegaba a AA.
                  'bg-accent text-bg-base'
                : 'bg-bg-surfaceAlt text-text-secondary hover:text-text-primary'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
