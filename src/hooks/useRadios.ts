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
      // Orden alfabético, y solo alfabético. Antes encabezaba `listeners`, con lo
      // cual el catálogo abría con las mismas emisoras que el carrusel de arriba
      // y en el mismo orden: dos secciones distintas mostrando lo mismo. El Top 10
      // ahora se ordena aparte, por `score`, así que esta lista puede ser lo único
      // que la otra no es: completa y escaneable.
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
