import type { Radio } from '../../types/radio';

interface RadioCoverProps {
  radio: Pick<Radio, 'name' | 'coverImage' | 'coverEmoji'>;
}

/** Imagen real de la radio si existe `coverImage`; si no, cae al emoji placeholder. */
export function RadioCover({ radio }: RadioCoverProps) {
  if (radio.coverImage) {
    return (
      <img
        src={radio.coverImage}
        alt={radio.name}
        loading="lazy"
        className="h-full w-full object-cover"
      />
    );
  }
  return <span>{radio.coverEmoji ?? '📻'}</span>;
}
