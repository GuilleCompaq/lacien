import { useState } from 'react';
import type { Radio } from '../types/radio';
import { useFavorites } from './useFavorites';

/**
 * Favoritos más el muro de autenticación. Cuando falta sesión no navega a ningún
 * lado: devuelve la emisora para que la página abra la hoja sobre el contenido.
 */
export function useFavoriteGate() {
  const { favoriteIds, isFavorite, toggleFavorite, loading } = useFavorites();
  const [gateRadio, setGateRadio] = useState<Radio | null>(null);

  async function requestToggleFavorite(radio: Radio) {
    const { error } = await toggleFavorite(radio.id);
    if (error === 'auth-required') setGateRadio(radio);
  }

  return {
    favoriteIds,
    isFavorite,
    loading,
    requestToggleFavorite,
    gateRadio,
    closeGate: () => setGateRadio(null),
  };
}
