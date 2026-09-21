import { useCallback, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { useAuth } from './useAuth';
import { takePendingFavorite } from '../lib/pendingFavorite';

/**
 * Favoritos persistidos en Supabase, ligados al usuario autenticado.
 * Sin sesión, favoriteIds queda vacío y toggleFavorite devuelve
 * { error: 'auth-required' } para que `useFavoriteGate` abra la hoja de registro
 * sobre la página, sin sacar al usuario de donde está.
 */
export function useFavorites() {
  const { user } = useAuth();
  const [favoriteIds, setFavoriteIds] = useState<Set<string>>(new Set());
  // Arranca en true: con false, la UI afirmaría "no tenés favoritas" durante el
  // primer render, antes de haber consultado. Un cero sin confirmar es una mentira.
  const [loading, setLoading] = useState(true);
  /**
   * Una consulta fallida no es una lista vacía. Sin este estado, un backend caído
   * se renderizaba como "todavía no agregaste ninguna" — la misma mentira que el
   * comentario de arriba dice evitar, servida por la ruta de error.
   */
  const [error, setError] = useState<string | null>(null);
  /** Id del favorito pendiente que se acaba de aplicar, para poder confirmarlo. */
  const [claimedId, setClaimedId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      setFavoriteIds(new Set());
      setError(null);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);
    setError(null);

    supabase
      .from('favorites')
      .select('radio_id')
      .eq('user_id', user.id)
      .then(({ data, error: fetchError }) => {
        if (cancelled) return;

        if (fetchError) {
          setError(fetchError.message);
          setLoading(false);
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
            .insert({ user_id: user.id, radio_id: pending })
            .then(({ error: insertError }) => {
              if (cancelled) return;
              if (insertError) {
                setFavoriteIds((prev) => {
                  const next = new Set(prev);
                  next.delete(pending);
                  return next;
                });
              } else {
                setClaimedId(pending);
              }
            });
        }

        setFavoriteIds(ids);
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [user]);

  const isFavorite = useCallback((radioId: string) => favoriteIds.has(radioId), [favoriteIds]);

  const toggleFavorite = useCallback(
    async (radioId: string): Promise<{ error: string | 'auth-required' | null }> => {
      if (!user) return { error: 'auth-required' };

      const wasFavorite = favoriteIds.has(radioId);

      setFavoriteIds((prev) => {
        const next = new Set(prev);
        if (wasFavorite) {
          next.delete(radioId);
        } else {
          next.add(radioId);
        }
        return next;
      });

      const { error: writeError } = wasFavorite
        ? await supabase.from('favorites').delete().eq('user_id', user.id).eq('radio_id', radioId)
        : await supabase.from('favorites').insert({ user_id: user.id, radio_id: radioId });

      if (writeError) {
        // revertir la actualización optimista si Supabase rechazó el cambio
        setFavoriteIds((prev) => {
          const next = new Set(prev);
          if (wasFavorite) {
            next.add(radioId);
          } else {
            next.delete(radioId);
          }
          return next;
        });
      }

      return { error: writeError?.message ?? null };
    },
    [favoriteIds, user],
  );

  const clearClaimed = useCallback(() => setClaimedId(null), []);

  return { favoriteIds, isFavorite, toggleFavorite, loading, error, claimedId, clearClaimed };
}
