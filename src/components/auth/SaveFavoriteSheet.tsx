import { useEffect, useId, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router';
import type { Radio } from '../../types/radio';
import { setPendingFavorite } from '../../lib/pendingFavorite';
import { RadioCover } from '../home/RadioCover';
import { CloseIcon } from '../icons';

interface SaveFavoriteSheetProps {
  radio: Radio;
  onClose: () => void;
}

/**
 * El muro de autenticación, como hoja sobre la página en vez de un salto a /login.
 *
 * Antes, tocar ♡ sin sesión reemplazaba la página entera por dos campos vacíos sin
 * explicación ni forma de volver, y la intención se perdía. Acá el usuario ve qué
 * emisora estaba guardando, por qué hace falta una cuenta, y puede descartar.
 */
export function SaveFavoriteSheet({ radio, onClose }: SaveFavoriteSheetProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const titleId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const primaryRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null;
    primaryRef.current?.focus();

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault();
        onClose();
        return;
      }
      if (event.key !== 'Tab') return;

      // Mantener el foco dentro de la hoja mientras está abierta.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  function go(path: string) {
    // La intención sobrevive al desvío y se aplica sola al volver con sesión.
    setPendingFavorite(radio.id);
    navigate(path, { state: { from: location.pathname } });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Atajo del mouse, no un control: Escape y el botón de cerrar ya cubren el
          teclado, así que darle foco y etiqueta propia solo duplicaría el anuncio. */}
      <div
        aria-hidden="true"
        onClick={onClose}
        className="animate-backdrop-in absolute inset-0 bg-black/70"
      />

      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="animate-sheet-in relative w-full max-w-md rounded-t-3xl border-t border-white/10 bg-bg-surfaceAlt px-5 pb-[calc(1.5rem+env(safe-area-inset-bottom))] pt-5"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute right-3 top-3 rounded-full p-2.5 text-text-muted transition-colors hover:text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          <CloseIcon />
        </button>

        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-bg-surface text-2xl">
            <RadioCover radio={radio} />
          </div>
          <div className="min-w-0">
            <h2 id={titleId} className="truncate pr-8 text-base font-bold text-text-primary">
              Guardá {radio.name}
            </h2>
            <p className="truncate text-sm font-medium tabular-nums text-text-muted">
              {radio.frequency}
            </p>
          </div>
        </div>

        <p className="mb-5 text-sm text-text-secondary">
          Con una cuenta tus radios te siguen a cualquier dispositivo.
        </p>

        <div className="flex flex-col gap-2">
          <button
            ref={primaryRef}
            type="button"
            onClick={() => go('/registro')}
            className="rounded-xl bg-accent py-3 text-sm font-semibold text-bg-base transition-colors hover:bg-accent-hover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Crear cuenta
          </button>
          <button
            type="button"
            onClick={() => go('/login')}
            className="rounded-xl bg-bg-surface py-3 text-sm font-semibold text-text-primary transition-colors hover:bg-white/5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          >
            Ya tengo cuenta
          </button>
        </div>
      </div>
    </div>
  );
}
