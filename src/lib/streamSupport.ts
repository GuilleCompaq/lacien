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

let hlsSupport: boolean | null = null;

/** Safari reproduce HLS nativo; Chrome, Firefox y Edge no, y fallan sin explicación. */
function browserPlaysHls(): boolean {
  if (hlsSupport !== null) return hlsSupport;
  if (typeof document === 'undefined') return (hlsSupport = false);
  const probe = document.createElement('audio');
  hlsSupport = probe.canPlayType('application/vnd.apple.mpegurl') !== '';
  return hlsSupport;
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

  if (/\.m3u8(\?|$)/i.test(parsed.pathname + parsed.search) && !browserPlaysHls()) {
    return 'unsupported-format';
  }

  return null;
}

export function isStreamPlayable(streamUrl: string | undefined): boolean {
  return getStreamIssue(streamUrl) === null;
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
      return 'Esta señal usa un formato que tu navegador no reproduce. Desde Safari funciona.';
  }
}
