import type { Radio } from '../../types/radio';
import { RadioDeviceIcon } from '../icons';

interface RadioCoverProps {
  radio: Pick<Radio, 'name' | 'coverImage'>;
}

/**
 * Imagen real de la emisora, o el aparato dibujado si todavía no hay tapa.
 *
 * El placeholder era el emoji 📻, el único glifo que le quedaba al producto
 * después de fix007. Un emoji cambia de forma, color y peso en cada plataforma,
 * así que no se puede alinear ni teñir: dentro de un círculo de story quedaba
 * descentrado y a contramano de la paleta. El SVG hereda `currentColor`.
 */
export function RadioCover({ radio }: RadioCoverProps) {
  if (radio.coverImage) {
    return (
      <img
        src={radio.coverImage}
        alt={radio.name}
        loading="lazy"
        className="h-full w-full object-contain p-0.5"
      />
    );
  }
  return <RadioDeviceIcon className="h-full w-full p-[22%] text-text-muted" />;
}
