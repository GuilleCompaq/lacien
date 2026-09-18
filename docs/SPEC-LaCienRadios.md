# Spec funcional — LaCienRadios (React)

> Complementa a `docs/color-system.md`. Este documento define arquitectura, modelo de datos y comportamiento de componentes para reconstruir LaCienRadios en React.
>
> **Nota para Claude Code**: este archivo es la fuente de verdad funcional del proyecto. Antes de generar o modificar código, revisar también `docs/color-system.md` (sistema de colores/tema). No introducir valores hex nuevos fuera de `src/theme/colors.ts`.

## 1. Stack técnico

- **Bundler**: Vite
- **Lenguaje**: React + TypeScript
- **Estilos**: Tailwind CSS (usando `docs/color-system.md` como theme)
- **Routing**: React Router (4 rutas principales)
- **Estado global**: Zustand (para el reproductor persistente)
- **Audio**: elemento `<audio>` nativo envuelto en un hook custom `usePlayer`

## 2. Estructura de carpetas

```
src/
  components/
    layout/
      Header.tsx
      BottomNav.tsx
      MiniPlayer.tsx
    home/
      StoriesBar.tsx
      StoryCircle.tsx
      FilterPills.tsx
      FeaturedCard.tsx
      RadioCard.tsx
      RadioGrid.tsx
    auth/
      AuthForm.tsx
  pages/
    Home.tsx
    Search.tsx
    MyMusic.tsx
    Profile.tsx
    Login.tsx
    SignUp.tsx
  hooks/
    usePlayer.ts
    useRadios.ts
    useFavorites.ts
    useAuth.ts
  store/
    playerStore.ts
  context/
    auth-context.ts
    AuthContext.tsx
  lib/
    supabaseClient.ts
  theme/
    colors.ts
  types/
    radio.ts
  App.tsx
  main.tsx
```

Además, en la raíz del repo: `supabase/migrations/0001_init.sql` y `supabase/seed.sql` (ver sección 9).

## 3. Modelo de datos

Archivo: `src/types/radio.ts`

```ts
export interface Radio {
  id: string;
  name: string;           // ej. "La 100"
  genre: 'rock' | 'pop' | 'folklore' | 'tango' | 'clasica' | 'deportiva' | 'general';
  frequency: string;      // ej. "99.9 FM"
  listeners: number;      // ej. 12400
  streamUrl: string;
  coverEmoji?: string;    // placeholder visual si no hay logo (fallback)
  coverImage?: string;    // logo real de la radio, ej. "/radios/la-100.webp"
  isLive: boolean;
  currentTrack?: {
    artist: string;
    title: string;
  };
}
```

Catálogo real (radios argentinas) en `supabase/seed.sql`, con logos en `public/radios/*`. `RadioCover` (`src/components/home/RadioCover.tsx`) renderiza `coverImage` si existe; si no, cae a `coverEmoji` (o 📻 por defecto).

## 4. Estado global del reproductor

Archivo: `src/store/playerStore.ts` (Zustand)

```ts
interface PlayerState {
  currentRadio: Radio | null;
  isPlaying: boolean;
  play: (radio: Radio) => void;
  togglePlay: () => void;
  stop: () => void;
}
```

El estado debe persistir entre rutas (Home, Buscar, Mi Música, Perfil) para que el `MiniPlayer` se mantenga visible y funcional sin reiniciar el audio al navegar.

## 5. Páginas y componentes

### Home (`/`)

- `StoriesBar`: fila horizontal scrolleable de `StoryCircle`, cada uno con borde `brand-gradient` si `isLive`, emoji/ícono de género, y badge "LIVE".
- `FilterPills`: chips de género ("Todo", "Rock", "Pop"...), filtran el `RadioGrid` sin recargar la página.
- `FeaturedCard`: tarjeta grande con la radio destacada en vivo, botón de play flotante.
- `RadioGrid`: sección "Populares" con `RadioCard` (nombre, oyentes, frecuencia, botón play/pause que llama a `usePlayer`).

### Buscar (`/buscar`)

- Input de texto con debounce que filtra `data/radios.ts` por nombre o género.
- Reutiliza `RadioCard` para resultados.
- Estado vacío ("No se encontraron radios") cuando no hay coincidencias.

### Mi Música (`/mi-musica`)

- Lista de radios marcadas como favoritas (estado local o `localStorage`, ej. `useFavorites` hook).
- Reutiliza `RadioCard` con un ícono de favorito activo.

### Perfil (`/perfil`)

- Datos básicos de usuario (nombre, avatar, estadísticas de escucha simuladas).
- Sin autenticación real en esta fase (placeholder estático).

### MiniPlayer (persistente, en todas las rutas)

- Fijo sobre el `BottomNav`.
- Muestra emoji/cover, nombre de radio, "artista • canción" si aplica, botón play/pause (`bg-accent`), barra de progreso simulada (indicador visual, no necesita ser precisa si es streaming en vivo).
- Se oculta si `currentRadio` es `null`.

## 6. Comportamiento de navegación

`BottomNav` usa React Router `NavLink` para resaltar la ruta activa (`text-accent` + ícono relleno) y navegar sin recargar. Cambiar de ruta **no** debe detener el audio si `isPlaying` es `true`.

## 7. Fuera de alcance

No incluir por ahora: analítica de oyentes en tiempo real, ni notificaciones push (el ícono de campana del header queda como UI estática). La autenticación y el catálogo de radios **sí** están en alcance desde el inicio (ver sección 9) — a diferencia de una versión anterior de este documento, no se implementó una fase 1 solo-mock.

## 8. Referencia de estilos

Todos los colores, gradientes y reglas de uso deben tomarse de `docs/color-system.md`. No introducir valores hex nuevos fuera de `src/theme/colors.ts`.

## 9. Backend (Supabase)

Supabase es la única fuente de datos: no hay mock estático de radios en el frontend. Cliente en `src/lib/supabaseClient.ts`, leyendo `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` desde `.env.local` (ver `.env.example`).

### Esquema (`supabase/migrations/0001_init.sql`)

- **`radios`**: catálogo público (`id, name, genre, frequency, listeners, stream_url, cover_emoji, cover_image, is_live, current_track jsonb`). RLS: lectura pública (`select using (true)`), sin políticas de escritura para `anon` (se administra desde el dashboard o `service_role`).
- **`favorites`**: `(user_id references auth.users, radio_id references radios, created_at)`, PK compuesta. RLS: cada usuario solo puede `select`/`insert`/`delete` sus propias filas (`auth.uid() = user_id`).

Catálogo real en `supabase/seed.sql`: 43 radios argentinas (Radio 10, La 100, Vorterix, Los 40 Principales, Cadena 3, etc.) con su logo en `public/radios/*.webp|png`. **Pendiente completar**: `stream_url` está en `'PENDIENTE'` para todas (no hay URL de streaming real cargada todavía), y varias tienen `frequency = 'Frecuencia pendiente'` cuando no había certeza del dato real. Actualizar esos valores directamente en la tabla `radios` de Supabase a medida que se consigan.

### Autenticación

- `src/context/AuthContext.tsx` + `src/hooks/useAuth.ts`: expone `user`, `session`, `signUp`, `signIn`, `signOut` vía `supabase.auth` (email + contraseña). Sesión inicial con `getSession()`, cambios reactivos con `onAuthStateChange`.
- Rutas `/login` y `/registro` (fuera de las 4 rutas principales de navegación). `signUp` puede requerir confirmación por email (`data.session === null`); en ese caso se muestra un mensaje en vez de redirigir.
- `Mi Música` y el botón de favorito en `RadioCard` requieren sesión: sin usuario autenticado, `useFavorites().toggleFavorite` devuelve `{ error: 'auth-required' }` y la UI redirige a `/login` (con `state.from` para volver a la ruta de origen tras iniciar sesión).

### Datos en el frontend

- `src/hooks/useRadios.ts`: trae todo `radios` una vez (ordenado por `listeners`); el filtrado por género (`FilterPills`) y la búsqueda (`Search`) se hacen en cliente sobre ese array, igual que en el diseño original con mock.
- `src/hooks/useFavorites.ts`: mantiene un `Set<string>` de `radio_id` del usuario actual, con actualización optimista al togglear (revierte si Supabase devuelve error).
