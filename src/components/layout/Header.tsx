import { Link } from 'react-router';

/**
 * Sin campana de notificaciones: el control existía sin handler y sin sistema
 * detrás. Un control muerto enseña que acá los controles son decorativos.
 */
export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center bg-bg-surface px-4 py-3">
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
