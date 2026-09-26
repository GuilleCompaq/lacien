import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';
import { takePendingFavorite } from '../lib/pendingFavorite';
import { translateDataError } from '../lib/authErrors';

interface FavoritesState {
  ids: Set<string>;
  loading: boolean;
  error: string | null;
  /** Id del favorito pendiente que se acaba de aplicar, para poder confirmarlo. */
  claimedId: string | null;
  /**
   * De quién son estos datos. Es la clave de todo lo que sigue: sin esto, al
   * cerrar sesión quedaba un render mostrando los corazones del usuario anterior,
   * porque el estado solo se limpiaba después, desde un efecto.
   */
  forUser: string | null;
}

const NINGUNO: ReadonlySet<string> = new Set();

const INICIAL: FavoritesState = {
  ids: new Set(),
  loading: false,
  error: null,
  claimedId: null,
  forUser: null,
};

/**
 * Favoritos persistidos en Supabase, ligados al usuario autenticado.
 * Sin sesión, favoriteIds queda vacío y toggleFavorite devuelve
 * { error: 'auth-required' } para que `useFavoriteGate` abra la hoja de registro
 * sobre la página, sin sacar al usuario de donde está.
 */
export function useFavorites() {
  const { user } = useAuth();
  const userId = user?.id ?? null;
  const [state, setState] = useState<FavoritesState>(INICIAL);

  /**
   * Todo lo que se expone se deriva durante el render, no se guarda.
   *
   * Si el estado almacenado pertenece a otro usuario —o a ninguno— esta lectura
   * ya devuelve vacío, sin esperar a que corra ningún efecto. Eso elimina la
   * ventana en la que la UI mostraba datos que ya no correspondían, y de paso el
   * render extra que costaba limpiarlos.
   */
  const esDelUsuarioActual = state.forUser === userId;
  const favoriteIds = esDelUsuarioActual ? state.ids : NINGUNO;
  const error = esDelUsuarioActual ? state.error : null;
  const claimedId = esDelUsuarioActual ? state.claimedId : null;
  // Con sesión, mientras los datos no sean de este usuario todavía estamos
  // cargando. Sin sesión no hay nada que esperar.
  const loading = userId !== null && (!esDelUsuarioActual || state.loading);

  useEffect(() => {
    if (!userId) return;

    let cancelled = false;

    supabase
      .from('favorites')
      .select('radio_id')
      .eq('user_id', userId)
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;

        // Una consulta fallida no es una lista vacía: sin distinguirlas, un
        // backend caído se renderizaba como "todavía no agregaste ninguna".
        if (fetchError) {
          setState({
            ...INICIAL,
            error: translateDataError(fetchError),
            forUser: userId,
          });
          return;
        }

        const ids = new Set((data ?? []).map((row) => row.radio_id as string));

        // Aplicar el favorito que el usuario quiso guardar antes de tener cuenta.
        // `take` lee y borra, así que si hay varias instancias del hook montadas
        // solo una se lo lleva y no se inserta dos veces.
        const pending = takePendingFavorite();
        if (pending && !ids.has(pending)) {
          ids.add(pending);
          void supabase
            .from('favorites')
            .insert({ user_id: userId, radio_id: pending })
            .then(({ error: insertError }) => {
              if (cancelled) return;
              setState((prev) => {
                if (prev.forUser !== userId) return prev;
                if (!insertError) return { ...prev, claimedId: pending };
                const next = new Set(prev.ids);
                next.delete(pending);
                return { ...prev, ids: next };
              });
            });
        }

        setState({ ids, loading: false, error: null, claimedId: null, forUser: userId });
      });

    return () => {
      cancelled = true;
    };
  }, [userId]);

  const isFavorite = useCallback((radioId: string) => favoriteIds.has(radioId), [favoriteIds]);

  const toggleFavorite = useCallback(
    async (radioId: string): Promise<{ error: string | 'auth-required' | null }> => {
      if (!userId) return { error: 'auth-required' };

      const wasFavorite = favoriteIds.has(radioId);

      // Solo toca el estado si sigue siendo del mismo usuario: una sesión que
      // cambió a mitad de la escritura no debe recibir el cambio de la anterior.
      const aplicar = (agregar: boolean) =>
        setState((prev) => {
          if (prev.forUser !== userId) return prev;
          const next = new Set(prev.ids);
          if (agregar) next.add(radioId);
          else next.delete(radioId);
          return { ...prev, ids: next };
        });

      aplicar(!wasFavorite);

      const { error: writeError } = wasFavorite
        ? await supabase.from('favorites').delete().eq('user_id', userId).eq('radio_id', radioId)
        : await supabase.from('favorites').insert({ user_id: userId, radio_id: radioId });

      // revertir la actualización optimista si Supabase rechazó el cambio
      if (writeError) aplicar(wasFavorite);

      return { error: writeError?.message ?? null };
    },
    [favoriteIds, userId],
  );

  const clearClaimed = useCallback(
    () => setState((prev) => (prev.claimedId === null ? prev : { ...prev, claimedId: null })),
    [],
  );

  return { favoriteIds, isFavorite, toggleFavorite, loading, error, claimedId, clearClaimed };
}
