import { Link } from 'react-router';

/**
 * Sin campana de notificaciones: el control existía sin handler y sin sistema
 * detrás. Un control muerto enseña que acá los controles son decorativos.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center bg-bg-surface px-4 py-3">
      {/* En Inicio hay decenas de botones antes del contenido: sin esto, navegar
          por teclado obliga a recorrer el carrusel entero en cada ruta. */}
      <a
        href="#contenido"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-30 focus:rounded-lg focus:bg-accent focus:px-3 focus:py-2 focus:text-sm focus:font-semibold focus:text-bg-base"
      >
        Saltar al contenido
      </a>
      <Link
        to="/"
        aria-label="LaCienRadios, ir al inicio"
        className="rounded bg-brand-gradient bg-clip-text text-xl font-extrabold text-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
      >
        LaCienRadios
      </Link>
    </header>
  );
}
