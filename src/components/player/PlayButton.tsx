import { usePlayerStore } from '../../store/playerStore';
import type { Radio } from '../../types/radio';
import { AlertIcon, PauseIcon, PlayIcon, RetryIcon, SpinnerIcon } from '../icons';

interface PlayButtonProps {
  radio: Radio;
  size?: 'sm' | 'lg';
}

/**
 * Un solo control para los cuatro estados. El área táctil es de 44px aunque el
 * disco se vea de 36: el margen negativo la expande sin mover el layout.
 */
export function PlayButton({ radio, size = 'sm' }: PlayButtonProps) {
  const currentRadio = usePlayerStore((s) => s.currentRadio);
  const status = usePlayerStore((s) => s.status);
  const play = usePlayerStore((s) => s.play);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const retry = usePlayerStore((s) => s.retry);

  const isCurrent = currentRadio?.id === radio.id;
  const state = isCurrent ? status : 'idle';

  const disc = size === 'lg' ? 'h-14 w-14' : 'h-9 w-9';
  const glyph = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  // El disco de 56px ya supera el mínimo táctil; el de 36 necesita el colchón.
  const hitArea = size === 'lg' ? '' : 'p-1 -m-1';

  function handleClick() {
    if (state === 'error') return retry();
    if (isCurrent && (state === 'playing' || state === 'connecting')) return togglePlay();
    play(radio);
  }

  const { label, icon, tone } = describe(state, radio.name, glyph);

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label={label}
      className={`shrink-0 rounded-full ${hitArea} focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent`}
    >
      <span className={`flex ${disc} items-center justify-center rounded-full transition-colors ${tone}`}>
        {icon}
      </span>
    </button>
  );
}

function describe(state: string, name: string, glyph: string) {
  switch (state) {
    case 'connecting':
      return {
        label: `Conectando con ${name}`,
        icon: <SpinnerIcon className={glyph} />,
        tone: 'bg-accent text-white',
      };
    case 'playing':
      return {
        label: `Pausar ${name}`,
        icon: <PauseIcon className={glyph} />,
        tone: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-active',
      };
    case 'error':
      return {
        label: `Reintentar ${name}`,
        icon: <RetryIcon className={glyph} />,
        tone: 'bg-state-live/15 text-state-live hover:bg-state-live/25',
      };
    default:
      return {
        label: `Reproducir ${name}`,
        icon: <PlayIcon className={glyph} />,
        tone: 'bg-accent text-white hover:bg-accent-hover active:bg-accent-active',
      };
  }
}

/**
 * Reemplaza al botón cuando la señal no puede sonar. No ofrecemos una acción
 * que el sistema ya sabe que falla.
 *
 * Ocupa la misma ranura de 36px que el botón para no romper el ritmo de la fila:
 * una etiqueta con texto se comía el nombre de la emisora en pantallas angostas.
 * El motivo viaja en el nombre accesible y en el tooltip.
 */
export function NoSignalChip({ reason, size = 'sm' }: { reason: string; size?: 'sm' | 'lg' }) {
  const disc = size === 'lg' ? 'h-14 w-14' : 'h-9 w-9';
  const glyph = size === 'lg' ? 'h-6 w-6' : 'h-4 w-4';
  return (
    <span
      role="img"
      aria-label={`Sin señal. ${reason}`}
      title={reason}
      className={`flex ${disc} shrink-0 items-center justify-center rounded-full bg-white/5 text-text-muted`}
    >
      <AlertIcon className={glyph} />
    </span>
  );
}
