import { Link, useLocation } from 'react-router';
import { ChevronRightIcon } from '../icons';
import { RadioCover } from '../home/RadioCover';

/** Lo mínimo para recordar la emisora sin volver a consultarla. */
export interface PendingIntent {
  name: string;
  frequency: string;
  coverImage?: string;
}

interface AuthIntentProps {
  /** Verbo de la pantalla: "guardar", "volver a guardar". */
  action?: string;
}

function readIntent(state: unknown): PendingIntent | null {
  const radio = (state as { radio?: PendingIntent } | null)?.radio;
  return radio?.name ? radio : null;
}

function readFrom(state: unknown, fallback: string): string {
  return (state as { from?: string } | null)?.from ?? fallback;
}

/**
 * Recuerda por qué el usuario está en una pantalla de auth, y le da una salida.
 *
 * La hoja de favoritos promete "Guardá Aspen" y hasta ahora la pantalla siguiente
 * era un formulario pelado, sin mención de la emisora ni forma de volver: el
 * momento de mayor fricción del producto era también el de menor tranquilidad.
 */
export function AuthIntent({ action = 'guardar' }: AuthIntentProps) {
  const location = useLocation();
  const intent = readIntent(location.state);
  const from = readFrom(location.state, '/');

  if (!intent) return null;

  return (
    <div className="flex flex-col gap-3">
      <Link
        to={from}
        className="-ml-1 inline-flex w-fit items-center gap-1 rounded-lg py-2 pl-1 pr-2 text-sm text-text-secondary transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
      >
        <ChevronRightIcon className="h-4 w-4 rotate-180" />
        Volver
      </Link>

      <div className="flex items-center gap-3 rounded-2xl border border-white/5 bg-bg-surface p-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-bg-surfaceAlt">
          <RadioCover radio={intent} />
        </div>
        <div className="min-w-0">
          <p className="truncate text-sm text-text-secondary">
            Para {action} <span className="font-semibold text-text-primary">{intent.name}</span>
          </p>
          <p className="truncate text-sm font-medium tabular-nums text-text-muted">
            {intent.frequency}
          </p>
        </div>
      </div>
    </div>
  );
}
