import { create } from 'zustand';
import type { Radio } from '../types/radio';

interface PlayerState {
  currentRadio: Radio | null;
  isPlaying: boolean;
  play: (radio: Radio) => void;
  togglePlay: () => void;
  stop: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  currentRadio: null,
  isPlaying: false,
  play: (radio) => {
    if (get().currentRadio?.id === radio.id) {
      set({ isPlaying: true });
      return;
    }
    set({ currentRadio: radio, isPlaying: true });
  },
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  stop: () => set({ currentRadio: null, isPlaying: false }),
}));
