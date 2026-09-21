import { usePlayerStore } from '../../store/playerStore';
import { describeStreamIssue, getStreamIssue } from '../../lib/streamSupport';
import type { Radio } from '../../types/radio';
import { NoSignalChip, PlayButton } from '../player/PlayButton';
import { RadioCover } from './RadioCover';

interface FeaturedCardProps {
  radio: Radio;
}

export function FeaturedCard({ radio }: FeaturedCardProps) {
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
        <div className="mb-3 flex items-center gap-2">
          <span className="rounded-full bg-state-live px-2 py-0.5 text-xs font-bold text-bg-base">
            EN VIVO
          </span>
          <span className="text-xs text-text-secondary">{radio.frequency}</span>
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
                      : radio.listeners > 0
                        ? `${radio.listeners.toLocaleString('es-AR')} oyentes`
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
