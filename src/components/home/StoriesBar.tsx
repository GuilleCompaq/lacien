import { useCallback, useEffect, useId, useRef, useState, type ReactNode } from 'react';
import { usePlayerStore } from '../../store/playerStore';
import type { Radio } from '../../types/radio';
import { ChevronLeftIcon, ChevronRightIcon } from '../icons';
import { StoryCircle } from './StoryCircle';

interface StoriesBarProps {
  title: string;
  radios: Radio[];
}

/**
 * Carrusel de emisoras en formato story, con encabezado propio.
 *
 * Hoy lo usa una sola sección, el "Top 10"; el carrusel de recientes se dio de
 * baja. Sigue recibiendo el título por parámetro porque la pieza es genérica y
 * fijarlo acá no ahorraría nada.
 *
 * No se dibuja vacío: sin contenido la sección no aparece, en lugar de dejar un
 * título sobre la nada.
 */
export function StoriesBar({ title, radios }: StoriesBarProps) {
  const play = usePlayerStore((s) => s.play);
  const titleId = useId();
  const trackRef = useRef<HTMLDivElement>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(false);

  /** Una flecha solo aparece si del otro lado queda algo por ver. */
  const updateEdges = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 1);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  }, []);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    updateEdges();
    el.addEventListener('scroll', updateEdges, { passive: true });
    const observer = new ResizeObserver(updateEdges);
    observer.observe(el);
    return () => {
      el.removeEventListener('scroll', updateEdges);
      observer.disconnect();
    };
  }, [updateEdges, radios.length]);

  const scrollByPage = (direction: -1 | 1) => {
    const el = trackRef.current;
    if (!el) return;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    el.scrollBy({
      // Deja a la vista parte de lo que ya se vio, para no perder el hilo.
      left: direction * el.clientWidth * 0.8,
      behavior: reduceMotion ? 'auto' : 'smooth',
    });
  };

  if (radios.length === 0) return null;

  return (
    <section aria-labelledby={titleId} className="flex flex-col gap-2">
      <h2 id={titleId} className="px-4 text-sm font-semibold text-text-secondary">
        {title}
      </h2>
      <div className="relative">
        <div ref={trackRef} className="scrollbar-none flex gap-3 overflow-x-auto px-4 pb-1">
          {radios.map((radio) => (
            <StoryCircle key={radio.id} radio={radio} onSelect={play} />
          ))}
        </div>
        {/*
          Con la barra oculta, en PC la rueda mueve la página y el mouse no arrastra:
          el carrusel no tenía cómo avanzar. Las flechas solo existen con puntero
          fino y hover; en táctil sobra el gesto. Quedan fuera del orden de Tab
          porque el teclado ya recorre las emisoras y el foco las trae a la vista.
        */}
        {canPrev && (
          <CarouselArrow side="left" onClick={() => scrollByPage(-1)}>
            <ChevronLeftIcon />
          </CarouselArrow>
        )}
        {canNext && (
          <CarouselArrow side="right" onClick={() => scrollByPage(1)}>
            <ChevronRightIcon />
          </CarouselArrow>
        )}
      </div>
    </section>
  );
}

interface CarouselArrowProps {
  side: 'left' | 'right';
  onClick: () => void;
  children: ReactNode;
}

function CarouselArrow({ side, onClick, children }: CarouselArrowProps) {
  return (
    <div
      className={`pointer-events-none absolute top-0 hidden h-16 items-center [@media(hover:hover)_and_(pointer:fine)]:flex ${
        side === 'left' ? 'left-1' : 'right-1'
      }`}
    >
      <button
        type="button"
        tabIndex={-1}
        aria-hidden="true"
        onClick={onClick}
        className="pointer-events-auto flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-bg-surface text-text-primary shadow-lg transition-colors hover:bg-bg-surfaceAlt"
      >
        {children}
      </button>
    </div>
  );
}
