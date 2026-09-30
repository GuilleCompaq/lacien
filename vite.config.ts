import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rolldownOptions: {
      output: {
        codeSplitting: {
          /**
           * Las librerías cambian poco entre deploys; el código de la app, en
           * cada uno. Separarlas en chunks propios hace que quien vuelve después
           * de un deploy solo baje de nuevo el chunk de la app: react y supabase
           * siguen en caché porque su hash no cambió.
           *
           * No hay grupo general para `node_modules` a propósito: arrastraría a
           * hls.js al chunk inicial y rompería su carga diferida (usePlayer.ts).
           */
          groups: [
            {
              name: 'react',
              test: /node_modules[\\/](react|react-dom|react-router|scheduler)[\\/]/,
              priority: 20,
            },
            {
              name: 'supabase',
              test: /node_modules[\\/]@supabase[\\/]/,
              priority: 10,
            },
          ],
        },
      },
    },
    /**
     * El default de 500 kB salta por hls.js (~575 kB), que se carga diferido y
     * solo para señales HLS fuera de Safari: no pesa en la carga inicial.
     */
    chunkSizeWarningLimit: 600,
  },
})
