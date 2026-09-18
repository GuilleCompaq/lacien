import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';

/**
 * Envuelve un único <audio> nativo (persistente entre renders del MiniPlayer)
 * y lo sincroniza con playerStore. El MiniPlayer se monta una sola vez en
 * App.tsx, por lo que este audio sobrevive a la navegación entre rutas.
 */
export function usePlayer() {
  const { currentRadio, isPlaying, togglePlay, stop } = usePlayerStore();
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const audio = new Audio();
    audioRef.current = audio;
    return () => {
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentRadio) {
      audio.pause();
      audio.removeAttribute('src');
      return;
    }
    if (audio.src !== currentRadio.streamUrl) {
      audio.src = currentRadio.streamUrl;
    }
  }, [currentRadio]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentRadio) return;

    if (isPlaying) {
      audio.play().catch(() => {
        // autoplay bloqueado por el navegador o error de red al conectar al stream
        usePlayerStore.setState({ isPlaying: false });
      });
    } else {
      audio.pause();
    }
  }, [isPlaying, currentRadio]);

  return { currentRadio, isPlaying, togglePlay, stop };
}
