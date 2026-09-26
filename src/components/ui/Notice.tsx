import { useEffect } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import { AlertIcon, CloseIcon, HeartIcon } from '../icons';
import { aboveNav, abovePlayer } from '../../lib/playerLayout';

export interface NoticeData {
  kind: 'success' | 'error';
  message: string;
  /** Acción de recuperación. Un error sin salida es solo una mala noticia. */
  onRetry?: () => void;
}

interface NoticeProps extends NoticeData {
  onDismiss: () => void;
}

/**
 * Aviso breve para acciones que antes fallaban o tenían éxito en silencio.
 *
 * Se apoya encima de las barras fijas usando las mismas variables de alto, así
 * que nunca queda tapado por el reproductor ni por la navegación.
 */
export function Notice({ kind, message, onRetry, onDismiss }: NoticeProps) {
  const hasRadio = usePlayerStore((s) => s.currentRadio !== null);
  const playerStatus = usePlayerStore((s) => s.status);
  const isError = kind === 'error';

  useEffect(() => {
    // Un error con reintento espera: cerrarlo solo sería esconder la salida.
    if (isError && onRetry) return;
    const timeout = setTimeout(onDismiss, isError ? 8000 : 4000);
    return () => clearTimeout(timeout);
  }, [isError, onRetry, onDismiss]);

  return (
    <div
      className="app-bar z-30 px-4"
      style={{
        bottom: `calc(${hasRadio ? abovePlayer(playerStatus) : aboveNav()} + 0.5rem)`,
      }}
    >
      <div
        role={isError ? 'alert' : 'status'}
        className="animate-sheet-in flex items-center gap-2.5 rounded-xl border border-white/10 bg-bg-surfaceAlt px-3 py-2.5 shadow-lg shadow-black/40"
      >
        <span className={`shrink-0 ${isError ? 'text-state-live' : 'text-state-success'}`}>
          {isError ? <AlertIcon className="h-4 w-4" /> : <HeartIcon className="h-4 w-4" filled />}
        </span>

        <p className="min-w-0 flex-1 text-sm text-text-primary">{message}</p>

        {onRetry && (
          <button
            type="button"
            onClick={onRetry}
            className="shrink-0 rounded-lg px-2 py-1 text-sm font-semibold text-accent-hover transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Reintentar
          </button>
        )}

        <button
          type="button"
          onClick={onDismiss}
          aria-label="Cerrar aviso"
          className="-m-1 shrink-0 rounded-full p-3 text-text-muted transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <CloseIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}
