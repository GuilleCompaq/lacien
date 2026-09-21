import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Radio } from '../types/radio';

/**
 * La reproducción tiene cuatro estados reales, no dos. Un stream en vivo tarda
 * en conectar, se traba y se cae, y la UI necesita poder decir cuál de esas
 * cosas está pasando en vez de mostrar solo "sonando" o "no sonando".
 */
export type PlaybackStatus = 'idle' | 'connecting' | 'playing' | 'paused' | 'error';

interface PlayerState {
  currentRadio: Radio | null;
  status: PlaybackStatus;
  /** Mensaje de error listo para mostrar: nombra el problema y la salida. */
  errorMessage: string | null;
  play: (radio: Radio) => void;
  togglePlay: () => void;
  stop: () => void;
  retry: () => void;
  setStatus: (status: PlaybackStatus) => void;
  fail: (message: string) => void;
}

export const usePlayerStore = create<PlayerState>()(
  persist(
    (set, get) => ({
      currentRadio: null,
      status: 'idle',
      errorMessage: null,

      play: (radio) => {
        const isSame = get().currentRadio?.id === radio.id;
        set({
          currentRadio: radio,
          // Volver a tocar play sobre la emisora que ya suena no la reinicia.
          status: isSame && get().status === 'playing' ? 'playing' : 'connecting',
          errorMessage: null,
        });
      },

      togglePlay: () => {
        const { status } = get();
        if (status === 'playing' || status === 'connecting') {
          set({ status: 'paused' });
        } else {
          set({ status: 'connecting', errorMessage: null });
        }
      },

      stop: () => set({ currentRadio: null, status: 'idle', errorMessage: null }),

      retry: () => set({ status: 'connecting', errorMessage: null }),

      setStatus: (status) =>
        set({ status, errorMessage: status === 'error' ? get().errorMessage : null }),

      fail: (message) => set({ status: 'error', errorMessage: message }),
    }),
    {
      name: 'lacienradios:player',
      /**
       * Solo la emisora. El estado de reproducción no se persiste a propósito:
       * los navegadores bloquean el autoplay al cargar, así que restaurarlo
       * mostraría "sonando" sobre silencio. Al volver, el mini player aparece
       * con la emisora lista y el usuario decide reanudar.
       */
      partialize: (state) => ({ currentRadio: state.currentRadio }),
    },
  ),
);
