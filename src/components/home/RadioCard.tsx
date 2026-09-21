import { usePlayerStore } from '../../store/playerStore';
import { describeStreamIssue, getStreamIssue, shortStreamIssue } from '../../lib/streamSupport';
import type { Radio } from '../../types/radio';
import { HeartIcon } from '../icons';
import { NoSignalChip, PlayButton } from '../player/PlayButton';
import { RadioCover } from './RadioCover';

interface RadioCardProps {
  radio: Radio;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function RadioCard({ radio, isFavorite, onToggleFavorite }: RadioCardProps) {
  const currentRadio = usePlayerStore((s) => s.currentRadio);
  const status = usePlayerStore((s) => s.status);

  const issue = getStreamIssue(radio.streamUrl);
  const isCurrent = currentRadio?.id === radio.id;
  const isSounding = isCurrent && (status === 'playing' || status === 'connecting');

  return (
    <div
      className={`flex items-center gap-3 rounded-2xl border bg-bg-surface p-3 transition-colors ${
        isSounding ? 'border-accent/40' : 'border-white/5'
      }`}
    >
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-bg-surfaceAlt text-2xl ${
          issue ? 'opacity-40 grayscale' : ''
        }`}
      >
        <RadioCover radio={radio} />
      </div>

      <div className="min-w-0 flex-1">
        <p className={`truncate font-semibold ${issue ? 'text-text-secondary' : 'text-text-primary'}`}>
          {radio.name}
        </p>
        {/* El dial deja de ser gris chico al final de la línea: es el nombre que el
            oyente usa de verdad ("la 910", "la 2x4 en 92.7"). Cifras tabulares para
            que las frecuencias se alineen al escanear la lista.
            Va solo: el género dejó de ser eje de filtrado y `general` cubría 26 de 43,
            así que imprimirlo en cada fila era ruido que empujaba al dial contra el
            borde. Sigue en el modelo y se puede buscar por él. */}
        <p className="truncate text-sm">
          <span
            className={`font-medium tabular-nums ${issue ? 'text-text-muted' : 'text-text-primary'}`}
          >
            {radio.frequency}
          </span>
          {/* El motivo vivía solo en un `title`, que en táctil no existe: quien usa
              el teléfono veía un círculo gris sin explicación. */}
          {issue && <span className="text-text-muted"> · {shortStreamIssue(issue)}</span>}
        </p>
      </div>

      {onToggleFavorite && (
        <button
          type="button"
          onClick={onToggleFavorite}
          aria-label={isFavorite ? `Quitar ${radio.name} de favoritos` : `Agregar ${radio.name} a favoritos`}
          aria-pressed={isFavorite}
          className={`shrink-0 rounded-full p-3 -m-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
            isFavorite ? 'text-accent' : 'text-text-muted hover:text-text-secondary'
          }`}
        >
          <HeartIcon filled={isFavorite} />
        </button>
      )}

      {issue ? <NoSignalChip reason={describeStreamIssue(issue)} /> : <PlayButton radio={radio} />}
    </div>
  );
}
