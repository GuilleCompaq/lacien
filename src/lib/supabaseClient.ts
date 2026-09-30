import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    'Faltan VITE_SUPABASE_URL / VITE_SUPABASE_ANON_KEY. Copiá .env.example a .env.local y completá tus credenciales de Supabase.',
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    /**
     * PKCE en lugar del `implicit` que trae supabase-js por defecto.
     *
     * Con implicit, el enlace de confirmación y el de reseteo vuelven con el
     * `access_token` y —peor— el `refresh_token` de larga vida en el fragmento
     * de la URL (`#access_token=…`). Eso queda en el historial del navegador y
     * es un token de sesión completo tirado en texto plano.
     *
     * Con PKCE el enlace vuelve con un `?code=…` de un solo uso, que supabase-js
     * canjea por los tokens vía POST usando un verificador guardado localmente.
     * El token nunca aparece en la URL. `detectSessionInUrl` hace el canje solo,
     * así que el código de la app no cambia; ya asumíamos "abrí el enlace en el
     * mismo navegador", que es justo lo que PKCE necesita.
     *
     * No elimina el riesgo de fondo (la sesión igual termina en localStorage,
     * legible por un XSS: eso es SEC-2, arquitectural en una SPA sin backend),
     * pero cierra la exposición del refresh_token en la URL del redirect.
     */
    flowType: 'pkce',
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});
