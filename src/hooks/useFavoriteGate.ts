import { useCallback, useState } from 'react';
import type { Radio } from '../types/radio';
import type { NoticeData } from '../components/ui/Notice';
import { useFavorites } from './useFavorites';

interface WriteFailure {
  radio: Radio;
  message: string;
}

/**
 * Favoritos más el muro de autenticación y el aviso de resultado.
 *
 * Cuando falta sesión no navega a ningún lado: devuelve la emisora para que la
 * página abra la hoja sobre el contenido. Cuando la escritura falla, produce un
 * aviso con reintento en vez de dejar que el corazón se vacíe en silencio.
 *
 * `radios` es opcional y solo sirve para nombrar la emisora en los avisos.
 */
export function useFavoriteGate(radios: Radio[] = []) {
  const { favoriteIds, isFavorite, toggleFavorite, loading, error, claimedId, clearClaimed } =
    useFavorites();
  const [gateRadio, setGateRadio] = useState<Radio | null>(null);
  // Se guarda la emisora, no la acción: el reintento se arma en el render, donde
  // `requestToggleFavorite` ya existe y no necesita capturarse a sí misma.
  const [failure, setFailure] = useState<WriteFailure | null>(null);

  const requestToggleFavorite = useCallback(
    async (radio: Radio) => {
      const wasFavorite = favoriteIds.has(radio.id);
      const result = await toggleFavorite(radio.id);

      if (result.error === 'auth-required') {
        setGateRadio(radio);
        return;
      }

      if (result.error) {
        setFailure({
          radio,
          message: wasFavorite
            ? `No pudimos quitar ${radio.name} de tus favoritas.`
            : `No pudimos guardar ${radio.name}.`,
        });
      } else {
        setFailure(null);
      }
    },
    [toggleFavorite, favoriteIds],
  );

  const dismissNotice = useCallback(() => {
    setFailure(null);
    clearClaimed();
  }, [clearClaimed]);

  /**
   * El aviso se deriva del estado en vez de fijarse en un efecto. El error manda
   * sobre la confirmación, porque es el único de los dos que ofrece una salida.
   */
  let notice: NoticeData | null = null;
  if (failure) {
    notice = {
      kind: 'error',
      message: failure.message,
      onRetry: () => {
        setFailure(null);
        void requestToggleFavorite(failure.radio);
      },
    };
  } else if (claimedId) {
    // Confirmar el favorito que sobrevivió al registro: era el pago de todo el
    // flujo del muro y hasta ahora aterrizaba sin que el usuario se enterara.
    const name = radios.find((radio) => radio.id === claimedId)?.name;
    notice = {
      kind: 'success',
      message: name ? `Guardamos ${name} en tus favoritas.` : 'Guardamos tu radio en favoritas.',
    };
  }

  return {
    favoriteIds,
    isFavorite,
    loading,
    error,
    requestToggleFavorite,
    gateRadio,
    closeGate: () => setGateRadio(null),
    notice,
    dismissNotice,
  };
}
