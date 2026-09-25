import { usePlayerStore } from '../../store/playerStore';
import { describeStreamIssue, getStreamIssue } from '../../lib/streamSupport';
import type { Radio } from '../../types/radio';
import { HeartIcon } from '../icons';
import { NoSignalChip, PlayButton } from '../player/PlayButton';
import { RadioCover } from './RadioCover';

interface FeaturedCardProps {
  radio: Radio;
  isFavorite?: boolean;
  onToggleFavorite?: () => void;
}

export function FeaturedCard({ radio, isFavorite, onToggleFavorite }: FeaturedCardProps) {
  const currentRadio = usePlayerStore((s) => s.currentRadio);
  const status = usePlayerStore((s) => s.status);

  const issue = getStreamIssue(radio.streamUrl);
  const isCurrent = currentRadio?.id === radio.id;

  return (
    <div className="relative mx-4 overflow-hidden rounded-3xl bg-brand-gradient p-5">
      {/* Panel sólido: con /80 el texto secundario se apoyaba en las paradas claras
          del gradiente y caía a 1.5:1. El blur no tenía nada que difuminar salvo el
          gradiente que dibujamos acá mismo. El marco de marca es el borde de afuera. */}
      <div className="rounded-[1.35rem] bg-bg-base p-4">
        {/* El slot dejó de ser `liveRadios[0]`, que era la fila cero de un orden
            arbitrario y se repetía en el carrusel y en la lista. Ahora es la última
            que escuchaste: una razón real para estar acá.
            El favorito va en esta fila, que tenía espacio libre a la derecha, en vez
            de apretarse contra el botón de reproducir: así el gesto principal de la
            tarjeta conserva su aire. */}
        <div className="mb-3 flex items-center gap-2">
          {/* "Seguir escuchando" es una invitación, y deja de tener sentido cuando la
              emisora ya está sonando. Durante la conexión sigue siendo invitación: la
              línea de estado de abajo es la que dice "Conectando…". */}
          <h2 className="text-sm font-semibold text-text-secondary">
            {isCurrent && status === 'playing' ? 'Sonando ahora' : 'Seguir escuchando'}
          </h2>
          <span className="text-sm font-medium tabular-nums text-text-muted">
            {radio.frequency}
          </span>

          {onToggleFavorite && (
            <button
              type="button"
              onClick={onToggleFavorite}
              aria-label={
                isFavorite
                  ? `Quitar ${radio.name} de favoritos`
                  : `Agregar ${radio.name} a favoritos`
              }
              aria-pressed={isFavorite}
              className={`-m-1.5 ml-auto shrink-0 rounded-full p-3 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
                isFavorite ? 'text-accent' : 'text-text-muted hover:text-text-secondary'
              }`}
            >
              <HeartIcon filled={isFavorite} />
            </button>
          )}
        </div>

        <div className="flex items-center justify-between gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-full bg-bg-surfaceAlt text-2xl">
              <RadioCover radio={radio} />
            </div>
            <div className="min-w-0">
              <p className="truncate text-lg font-bold text-text-primary">{radio.name}</p>
              <p className="mt-0.5 truncate text-sm text-text-secondary">
                {isCurrent && status === 'connecting'
                  ? 'Conectando…'
                  : isCurrent && status === 'error'
                    ? 'No pudimos conectar'
                    : radio.currentTrack
                      ? `${radio.currentTrack.artist} • ${radio.currentTrack.title}`
                      : 'Señal en directo'}
              </p>
            </div>
          </div>

          {issue ? (
            <NoSignalChip reason={describeStreamIssue(issue)} size="lg" />
          ) : (
            <PlayButton radio={radio} size="lg" />
          )}
        </div>
      </div>
    </div>
  );
}
