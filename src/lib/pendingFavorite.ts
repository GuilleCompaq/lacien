/**
 * Guarda la intención que disparó el muro de autenticación.
 *
 * Sin esto, tocar ♡ sin sesión mandaba al login y, al volver, el favorito nunca
 * se aplicaba: el usuario tenía que reencontrar una fila entre 43 y tocar de nuevo.
 *
 * Vive en sessionStorage para sobrevivir a la vuelta desde el mail de confirmación
 * en la misma pestaña. `take` lee y borra, así que si varios componentes lo
 * reclaman a la vez solo uno se lo lleva.
 */
const KEY = 'lacienradios:pending-favorite';

export function setPendingFavorite(radioId: string): void {
  try {
    sessionStorage.setItem(KEY, radioId);
  } catch {
    // Modo privado o almacenamiento bloqueado: se pierde la intención, no el flujo.
  }
}

export function takePendingFavorite(): string | null {
  try {
    const value = sessionStorage.getItem(KEY);
    if (value) sessionStorage.removeItem(KEY);
    return value;
  } catch {
    return null;
  }
}

export function clearPendingFavorite(): void {
  try {
    sessionStorage.removeItem(KEY);
  } catch {
    // sin acción
  }
}
