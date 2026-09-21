/**
 * Traduce los errores de Supabase a castellano rioplatense.
 *
 * Supabase responde en inglés y con vocabulario de backend ("Invalid login
 * credentials", "User already registered"). Eso aparecía tal cual en la única
 * pantalla donde se le pide confianza al usuario, dentro de una app que por lo
 * demás está íntegramente en es-AR.
 *
 * Misma forma que `usePlayer` usa para los errores de medios: nombrar el problema
 * y, cuando existe, la salida.
 */

interface SupabaseLikeError {
  message?: string;
  code?: string;
  status?: number;
}

const BY_CODE: Record<string, string> = {
  invalid_credentials: 'Email o contraseña incorrectos.',
  user_already_exists: 'Ese email ya tiene una cuenta. Probá iniciar sesión.',
  email_exists: 'Ese email ya tiene una cuenta. Probá iniciar sesión.',
  weak_password: 'La contraseña necesita al menos 6 caracteres.',
  email_not_confirmed: 'Todavía no confirmaste tu email. Revisá tu correo.',
  over_email_send_rate_limit: 'Enviamos varios correos seguidos. Esperá unos minutos.',
  over_request_rate_limit: 'Demasiados intentos seguidos. Esperá un momento.',
  validation_failed: 'Revisá los datos: hay algo con formato incorrecto.',
  same_password: 'La contraseña nueva tiene que ser distinta de la anterior.',
};

/** Respaldo por texto: los códigos no existen en todas las versiones del SDK. */
const BY_MESSAGE: [RegExp, string][] = [
  [/invalid login credentials/i, 'Email o contraseña incorrectos.'],
  [/user already registered|already been registered/i, 'Ese email ya tiene una cuenta. Probá iniciar sesión.'],
  [/password should be at least/i, 'La contraseña necesita al menos 6 caracteres.'],
  [/email not confirmed/i, 'Todavía no confirmaste tu email. Revisá tu correo.'],
  [/unable to validate email address|invalid format/i, 'Revisá el email: el formato no es válido.'],
  [/for security purposes|rate limit|too many requests/i, 'Demasiados intentos seguidos. Esperá un momento.'],
  [/new password should be different/i, 'La contraseña nueva tiene que ser distinta de la anterior.'],
  [/failed to fetch|network|timeout/i, 'No pudimos conectar. Revisá tu conexión y probá de nuevo.'],
];

export function translateAuthError(error: SupabaseLikeError | null | undefined): string | null {
  if (!error) return null;

  if (error.code && BY_CODE[error.code]) return BY_CODE[error.code];

  const message = error.message ?? '';
  for (const [pattern, translation] of BY_MESSAGE) {
    if (pattern.test(message)) return translation;
  }

  if (error.status === 429) return 'Demasiados intentos seguidos. Esperá un momento.';

  // Sin coincidencia: un mensaje genérico en el idioma del usuario es mejor que
  // el string crudo del backend, que no le dice nada y rompe la ilusión.
  return 'No pudimos completar la acción. Probá de nuevo en un momento.';
}

/** Para errores de datos que no son de autenticación (catálogo, favoritos). */
export function translateDataError(error: SupabaseLikeError | null | undefined): string | null {
  if (!error) return null;
  const message = error.message ?? '';
  if (/failed to fetch|network|timeout/i.test(message)) {
    return 'No pudimos conectar. Revisá tu conexión y probá de nuevo.';
  }
  return 'No pudimos cargar los datos. Probá de nuevo en un momento.';
}
