export type Genre = 'rock' | 'pop' | 'folklore' | 'tango' | 'clasica' | 'deportiva' | 'general';

export type Band = 'AM' | 'FM';

/** El género ya no se filtra, así que la tarjeta es el único lugar donde se lee. */
const GENRE_LABELS: Record<Genre, string> = {
  rock: 'Rock',
  pop: 'Pop',
  folklore: 'Folklore',
  tango: 'Tango',
  clasica: 'Clásica',
  deportiva: 'Deportiva',
  general: 'General',
};

export function genreLabel(genre: Genre): string {
  return GENRE_LABELS[genre] ?? 'General';
}

/**
 * La banda se deriva de `frequency` en vez de guardarse aparte: el dato ya está
 * ahí ("AM 700", "99.9 FM") y una columna paralela solo podría desincronizarse.
 */
export function bandFromFrequency(frequency: string): Band | null {
  const value = frequency.trim().toUpperCase();
  if (value.startsWith('AM')) return 'AM';
  if (value.endsWith('FM')) return 'FM';
  return null;
}

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
