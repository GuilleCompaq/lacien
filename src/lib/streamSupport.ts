/**
 * Clasifica una `stream_url` antes de intentar reproducirla.
 *
 * Solo detecta lo que se puede saber con certeza desde la URL y las capacidades
 * del navegador. Todo lo demás (host caído, geobloqueo, una URL que resulta ser
 * una página y no audio) lo reporta el evento `error` del <audio> en runtime:
 * mantener acá una lista negra de casos adivinados sería frágil y envejecería mal.
 */
export type StreamIssue = 'missing' | 'insecure' | 'playlist' | 'unsupported-format';

const PLACEHOLDER = 'PENDIENTE';

let nativeHls: boolean | null = null;
let mseHls: boolean | null = null;

/** Safari reproduce HLS nativo; el resto necesita Media Source Extensions. */
function browserPlaysHlsNatively(): boolean {
  if (nativeHls !== null) return nativeHls;
  if (typeof document === 'undefined') return (nativeHls = false);
  const probe = document.createElement('audio');
  nativeHls = probe.canPlayType('application/vnd.apple.mpegurl') !== '';
  return nativeHls;
}

/**
 * `hls.js` cubre HLS en Chrome, Firefox y Edge vía MSE. Se comprueba la API en
 * vez de importar la librería, para no traerla si no se va a usar: la carga real
 * es dinámica y solo ocurre al reproducir una señal `.m3u8`.
 */
export function browserCanPlayHlsViaMse(): boolean {
  if (mseHls !== null) return mseHls;
  const mse = globalThis.MediaSource;
  mseHls = typeof mse !== 'undefined' && typeof mse.isTypeSupported === 'function';
  return mseHls;
}

export function isHlsUrl(streamUrl: string): boolean {
  try {
    const parsed = new URL(streamUrl.trim());
    return /\.m3u8(\?|$)/i.test(parsed.pathname + parsed.search);
  } catch {
    return false;
  }
}

/** Devuelve el impedimento conocido, o `null` si la señal debería poder sonar. */
export function getStreamIssue(streamUrl: string | undefined): StreamIssue | null {
  const url = streamUrl?.trim();
  if (!url || url === PLACEHOLDER) return 'missing';

  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return 'missing';
  }

  // `.m3u` es un archivo de texto con una lista de URLs, no una señal de audio.
  if (/\.m3u(\?|$)/i.test(parsed.pathname + parsed.search)) return 'playlist';

  // http:// dentro de una página https queda bloqueado por contenido mixto.
  if (parsed.protocol === 'http:' && globalThis.location?.protocol === 'https:') {
    return 'insecure';
  }

  // HLS solo queda fuera si el navegador no lo reproduce nativo *y* no soporta MSE.
  if (isHlsUrl(url) && !browserPlaysHlsNatively() && !browserCanPlayHlsViaMse()) {
    return 'unsupported-format';
  }

  return null;
}

export function isStreamPlayable(streamUrl: string | undefined): boolean {
  return getStreamIssue(streamUrl) === null;
}

/** `true` cuando hay que montar hls.js en vez de asignar `audio.src` directo. */
export function needsHlsShim(streamUrl: string): boolean {
  return isHlsUrl(streamUrl) && !browserPlaysHlsNatively() && browserCanPlayHlsViaMse();
}

/** Nombra el problema y, cuando existe, la salida. */
export function describeStreamIssue(issue: StreamIssue): string {
  switch (issue) {
    case 'missing':
      return 'Todavía no cargamos la señal de esta emisora.';
    case 'insecure':
      return 'La señal de esta emisora no viaja cifrada y el navegador la bloquea.';
    case 'playlist':
      return 'El enlace de esta emisora es una lista de reproducción, no una señal.';
    case 'unsupported-format':
      return 'Tu navegador no puede reproducir el formato de esta señal.';
  }
}
