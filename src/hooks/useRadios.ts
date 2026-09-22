import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { mapRadioRow, type Radio, type RadioRow } from '../types/radio';
import { translateDataError } from '../lib/authErrors';

export function useRadios() {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('radios')
      .select('*')
            // El orden por oyentes ya estaba, pero las 43 filas valen 0: sin desempate,
      // lo que se ve es orden de inserción. Con el nombre como segundo criterio la
      // lista es estable y escaneable hoy, y el día que haya oyentes reales manda
      // la popularidad sin tocar nada.
      .order('listeners', { ascending: false })
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setError(translateDataError(error));
        } else {
          setRadios((data as RadioRow[]).map(mapRadioRow));
        }
        setLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, []);

  return { radios, loading, error };
}
