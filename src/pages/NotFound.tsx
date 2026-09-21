import { Link } from 'react-router';
import { SearchIcon } from '../components/icons';

/**
 * Sin esta ruta, cualquier URL que no fuera una de las siete renderizaba el
 * encabezado y la navegación alrededor de un `<main>` vacío: un producto en
 * blanco con el cromo funcionando.
 */
export default function NotFound() {
  return (
    <div className="flex flex-col items-center gap-3 px-4 py-12 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-bg-surfaceAlt text-text-muted">
        <SearchIcon className="h-8 w-8" />
      </div>
      <h1 className="text-lg font-bold text-text-primary">No encontramos esta página</h1>
      <p className="text-sm text-text-muted">
        Puede que el enlace esté viejo o mal escrito.
      </p>
      <div className="mt-2 flex gap-3">
        <Link
          to="/"
          className="rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-bg-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Ir al inicio
        </Link>
        <Link
          to="/buscar"
          className="rounded-xl bg-bg-surfaceAlt px-4 py-2 text-sm font-semibold text-text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
        >
          Buscar una radio
        </Link>
      </div>
    </div>
  );
}
