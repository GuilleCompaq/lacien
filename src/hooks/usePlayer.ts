import { useEffect, useRef } from 'react';
import { usePlayerStore } from '../store/playerStore';
import { describeStreamIssue, getStreamIssue, needsHlsShim } from '../lib/streamSupport';
import type Hls from 'hls.js';

/**
 * Envuelve un único <audio> nativo (persistente entre renders del MiniPlayer)
 * y lo sincroniza con playerStore. El MiniPlayer se monta una sola vez en
 * App.tsx, por lo que este audio sobrevive a la navegación entre rutas.
 *
 * El elemento es la fuente de verdad del estado: la UI refleja lo que el audio
 * reporta (`waiting`, `playing`, `error`), no lo que la app supone.
 */
export function usePlayer() {
  const currentRadio = usePlayerStore((s) => s.currentRadio);
  const status = usePlayerStore((s) => s.status);
  const errorMessage = usePlayerStore((s) => s.errorMessage);
  const togglePlay = usePlayerStore((s) => s.togglePlay);
  const stop = usePlayerStore((s) => s.stop);
  const retry = usePlayerStore((s) => s.retry);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  /** Instancia de hls.js viva, solo para señales .m3u8 fuera de Safari. */
  const hlsRef = useRef<Hls | null>(null);
  useEffect(() => {
    const audio = new Audio();
    audio.preload = 'none';
    audioRef.current = audio;

    const { setStatus, fail } = usePlayerStore.getState();

    const onWaiting = () => {
      // Solo degradar a "conectando" si creíamos estar sonando.
      if (usePlayerStore.getState().status === 'playing') setStatus('connecting');
    };
    const onPlaying = () => setStatus('playing');
    const onPause = () => {
      const current = usePlayerStore.getState().status;
      if (current === 'playing' || current === 'connecting') setStatus('paused');
    };
    const onError = () => {
      switch (audio.error?.code) {
        case 2: // MEDIA_ERR_NETWORK
          return fail('Se cortó la conexión con la señal. Probá de nuevo.');
        case 4: // MEDIA_ERR_SRC_NOT_SUPPORTED
          return fail('Esta emisora no está transmitiendo en un formato que el navegador pueda reproducir.');
        default:
          return fail('No pudimos conectar con la señal.');
      }
    };

    audio.addEventListener('waiting', onWaiting);
    audio.addEventListener('stalled', onWaiting);
    audio.addEventListener('playing', onPlaying);
    audio.addEventListener('pause', onPause);
    audio.addEventListener('error', onError);

    return () => {
      audio.removeEventListener('waiting', onWaiting);
      audio.removeEventListener('stalled', onWaiting);
      audio.removeEventListener('playing', onPlaying);
      audio.removeEventListener('pause', onPause);
      audio.removeEventListener('error', onError);
      audio.pause();
      audioRef.current = null;
    };
  }, []);

  // Cargar la señal de la emisora activa.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (!currentRadio) {
      audio.pause();
      audio.removeAttribute('src');
      audio.load();
      return;
    }

    const issue = getStreamIssue(currentRadio.streamUrl);
    if (issue) {
      // No intentamos reproducir algo que ya sabemos que va a fallar.
      audio.pause();
      audio.removeAttribute('src');
      usePlayerStore.getState().fail(describeStreamIssue(issue));
      return;
    }

    const next = currentRadio.streamUrl.trim();

    // Desmontar cualquier shim anterior antes de cambiar de emisora.
    hlsRef.current?.destroy();
    hlsRef.current = null;

    if (!needsHlsShim(next)) {
      if (audio.getAttribute('src') !== next) {
        audio.src = next;
      }
      return;
    }

    /**
     * HLS fuera de Safari. La librería se importa de forma dinámica para que no
     * entre en el bundle inicial: solo la paga quien reproduce una de estas
     * señales, y son 8 de 43.
     */
    let cancelled = false;
    audio.removeAttribute('src');

    void import('hls.js').then(({ default: HlsCtor }) => {
      if (cancelled || !audioRef.current) return;
      if (!HlsCtor.isSupported()) {
        usePlayerStore.getState().fail('Tu navegador no puede reproducir el formato de esta señal.');
        return;
      }
      const instance = new HlsCtor({ enableWorker: true });
      hlsRef.current = instance;
      instance.on(HlsCtor.Events.ERROR, (_event, data) => {
        if (!data.fatal) return;
        usePlayerStore.getState().fail('Se cortó la conexión con la señal. Probá de nuevo.');
      });
      // El efecto de estado ya corrió y salió temprano, porque en ese momento no
      // había ni `src` ni instancia. Así que la reproducción se retoma acá, una
      // vez que el manifiesto está listo y el elemento tiene con qué sonar.
      instance.on(HlsCtor.Events.MANIFEST_PARSED, () => {
        if (cancelled) return;
        if (usePlayerStore.getState().status !== 'connecting') return;
        audioRef.current?.play().catch(() => {
          if (usePlayerStore.getState().status !== 'error') {
            usePlayerStore.getState().fail('No pudimos conectar con la señal.');
          }
        });
      });

      instance.loadSource(next);
      instance.attachMedia(audioRef.current);
    });

    return () => {
      cancelled = true;
      hlsRef.current?.destroy();
      hlsRef.current = null;
    };
  }, [currentRadio]);

  // Sincronizar la intención (status) con el elemento.
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !currentRadio) return;
    // Con el shim de HLS el `src` lo gestiona la librería, no el atributo.
    if (!audio.getAttribute('src') && !hlsRef.current) return;

    if (status === 'connecting') {
      audio.play().catch((error: unknown) => {
        const name = error instanceof Error ? error.name : '';
        // Un `error` del elemento ya habrá disparado su propio mensaje.
        if (usePlayerStore.getState().status !== 'error') {
          usePlayerStore
            .getState()
            .fail(
              name === 'NotAllowedError'
                ? 'El navegador bloqueó la reproducción. Tocá reproducir otra vez.'
                : 'No pudimos conectar con la señal.',
            );
        }
      });
    } else if (status === 'paused' || status === 'idle' || status === 'error') {
      audio.pause();
    }
  }, [status, currentRadio]);

  // Controles del sistema: pantalla de bloqueo, centro de notificaciones, botones
  // del auricular y del auto. Para una radio en el teléfono esa es la superficie
  // de control real, porque el aparato termina en el bolsillo.
  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    const session = navigator.mediaSession;

    if (!currentRadio) {
      session.metadata = null;
      session.playbackState = 'none';
      return;
    }

    session.metadata = new MediaMetadata({
      title: currentRadio.name,
      artist: currentRadio.currentTrack
        ? `${currentRadio.currentTrack.artist} • ${currentRadio.currentTrack.title}`
        : currentRadio.frequency,
      album: 'LaCienRadios',
      artwork: currentRadio.coverImage
        ? [{ src: new URL(currentRadio.coverImage, globalThis.location.origin).href }]
        : [],
    });

    const { togglePlay: toggle, stop: halt, retry: again } = usePlayerStore.getState();
    session.setActionHandler('play', () => {
      const current = usePlayerStore.getState().status;
      if (current === 'error') again();
      else if (current !== 'playing') toggle();
    });
    session.setActionHandler('pause', () => {
      if (usePlayerStore.getState().status !== 'paused') toggle();
    });
    session.setActionHandler('stop', halt);

    return () => {
      session.setActionHandler('play', null);
      session.setActionHandler('pause', null);
      session.setActionHandler('stop', null);
    };
  }, [currentRadio]);

  useEffect(() => {
    if (!('mediaSession' in navigator)) return;
    navigator.mediaSession.playbackState =
      status === 'playing' ? 'playing' : status === 'idle' ? 'none' : 'paused';
  }, [status]);

  return { currentRadio, status, errorMessage, togglePlay, stop, retry };
}
