import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { mapRadioRow, type Radio, type RadioRow } from '../types/radio';

export function useRadios() {
  const [radios, setRadios] = useState<Radio[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    supabase
      .from('radios')
      .select('*')
      .order('listeners', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return;
        if (error) {
          setError(error.message);
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
