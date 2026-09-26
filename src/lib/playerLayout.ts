import type { PlaybackStatus } from '../store/playerStore';

/**
 * Alto del mini player según su estado.
 *
 * En error el mensaje necesita dos renglones: antes se truncaba a media palabra
 * ("Esta emisora no está transmitie…") y el único canal que explica por qué no
 * sonó quedaba ilegible. La barra crece en vez de recortar el texto.
 *
 * Lo leen el propio reproductor, el relleno inferior de `<main>` y la posición de
 * los avisos, así que vive acá para que los tres no puedan desincronizarse.
 */
export function playerHeight(status: PlaybackStatus): string {
  return status === 'error' ? 'var(--player-h-error)' : 'var(--player-h)';
}

/** Distancia desde el borde inferior hasta arriba del reproductor. */
export function aboveNav(): string {
  return 'calc(var(--nav-h) + var(--safe-bottom))';
}

/** Distancia desde el borde inferior hasta arriba de todo lo fijo. */
export function abovePlayer(status: PlaybackStatus): string {
  return `calc(var(--nav-h) + ${playerHeight(status)} + var(--safe-bottom))`;
}
