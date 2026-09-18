import { Link } from 'react-router';

export function Header() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-bg-surface px-4 py-3">
      <Link
        to="/"
        className="bg-brand-gradient bg-clip-text text-xl font-extrabold text-transparent"
      >
        LaCienRadios
      </Link>
      <button
        type="button"
        aria-label="Notificaciones"
        className="rounded-full p-2 text-text-secondary hover:text-text-primary"
      >
        🔔
      </button>
    </header>
  );
}
