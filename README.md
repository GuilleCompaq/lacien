# LaCienRadios

App web que agrupa emisoras de radio: los usuarios pueden escucharlas, buscarlas por nombre/género y, una vez registrados, armar su propia lista de favoritas.

- **Frontend**: Vite + React + TypeScript + Tailwind CSS
- **Backend**: Supabase (Postgres + Auth) — catálogo de radios, autenticación y favoritos

Ver [docs/SPEC-LaCienRadios.md](docs/SPEC-LaCienRadios.md) (arquitectura y componentes) y [docs/color-system.md](docs/color-system.md) (sistema de colores) para el detalle funcional.

## Setup

1. Instalar dependencias:

   ```bash
   npm install
   ```

2. Crear un proyecto en [supabase.com](https://supabase.com), y en el **SQL Editor** ejecutar en orden:

   - [supabase/migrations/0001_init.sql](supabase/migrations/0001_init.sql) — crea las tablas `radios` y `favorites` con RLS.
   - [supabase/seed.sql](supabase/seed.sql) — carga las 43 radios argentinas del catálogo (con su logo). **`stream_url` queda en `'PENDIENTE'` para todas**: hay que completarlo con la URL de streaming real de cada emisora (y revisar las que tienen `frequency = 'Frecuencia pendiente'`) directamente en la tabla `radios` de Supabase.

3. Copiar `.env.example` a `.env.local` y completar con la URL y anon key de tu proyecto (Project Settings → API):

   ```bash
   cp .env.example .env.local
   ```

4. Levantar el entorno de desarrollo:

   ```bash
   npm run dev
   ```

## Scripts

- `npm run dev` — servidor de desarrollo
- `npm run build` — type-check (`tsc -b`) + build de producción
- `npm run lint` — oxlint
- `npm run preview` — sirve el build de producción localmente
