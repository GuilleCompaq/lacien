export type Genre = 'rock' | 'pop' | 'folklore' | 'tango' | 'clasica' | 'deportiva' | 'general';

export interface Radio {
  id: string;
  name: string; // ej. "FM-100"
  genre: Genre;
  frequency: string; // ej. "99.9 FM"
  listeners: number; // ej. 12400
  streamUrl: string;
  coverEmoji?: string; // placeholder visual (guitarra, saxofón, etc.)
  coverImage?: string; // opcional si luego hay imágenes reales
  isLive: boolean;
  currentTrack?: {
    artist: string;
    title: string;
  };
}

/** Fila cruda tal como la devuelve la tabla `radios` de Supabase (snake_case). */
export interface RadioRow {
  id: string;
  name: string;
  genre: Genre;
  frequency: string;
  listeners: number;
  stream_url: string;
  cover_emoji: string | null;
  cover_image: string | null;
  is_live: boolean;
  current_track: { artist: string; title: string } | null;
}

export function mapRadioRow(row: RadioRow): Radio {
  return {
    id: row.id,
    name: row.name,
    genre: row.genre,
    frequency: row.frequency,
    listeners: row.listeners,
    streamUrl: row.stream_url,
    coverEmoji: row.cover_emoji ?? undefined,
    coverImage: row.cover_image ?? undefined,
    isLive: row.is_live,
    currentTrack: row.current_track ?? undefined,
  };
}
