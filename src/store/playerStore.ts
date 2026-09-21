import { create } from 'zustand';
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

export const usePlayerStore = create<PlayerState>((set, get) => ({
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

  setStatus: (status) => set({ status, errorMessage: status === 'error' ? get().errorMessage : null }),

  fail: (message) => set({ status: 'error', errorMessage: message }),
}));

/** `true` solo cuando esta emisora es la que está sonando o conectando. */
export function isActiveRadio(currentId: string | undefined, radioId: string) {
  return currentId === radioId;
}
