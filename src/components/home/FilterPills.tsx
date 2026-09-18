import type { Genre } from '../../types/radio';

export type GenreFilter = Genre | 'todo';

const filters: { value: GenreFilter; label: string }[] = [
  { value: 'todo', label: 'Todo' },
  { value: 'rock', label: 'Rock' },
  { value: 'pop', label: 'Pop' },
  { value: 'folklore', label: 'Folklore' },
  { value: 'tango', label: 'Tango' },
  { value: 'clasica', label: 'Clásica' },
  { value: 'deportiva', label: 'Deportiva' },
  { value: 'general', label: 'General' },
];

interface FilterPillsProps {
  value: GenreFilter;
  onChange: (value: GenreFilter) => void;
}

export function FilterPills({ value, onChange }: FilterPillsProps) {
  return (
    <div className="scrollbar-none flex gap-2 overflow-x-auto px-4 pb-1">
      {filters.map((filter) => {
        const isActive = filter.value === value;
        return (
          <button
            key={filter.value}
            type="button"
            onClick={() => onChange(filter.value)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium ${
              isActive ? 'bg-accent text-white' : 'bg-bg-surfaceAlt text-text-secondary'
            }`}
          >
            {filter.label}
          </button>
        );
      })}
    </div>
  );
}
