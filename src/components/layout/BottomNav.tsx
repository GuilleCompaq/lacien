import { NavLink } from 'react-router';
import { HeartIcon, HomeIcon, SearchIcon, UserIcon } from '../icons';

/**
 * Iconos dibujados, no emoji. Además del problema de forma y peso por plataforma,
 * los emoji no se pueden teñir: el estado activo es de color, así que con glifos
 * el icono nunca cambiaba al seleccionar la pestaña — solo la etiqueta.
 */
const items = [
  { to: '/', label: 'Inicio', Icon: HomeIcon },
  { to: '/buscar', label: 'Buscar', Icon: SearchIcon },
  { to: '/mi-musica', label: 'Mis favoritas', Icon: HeartIcon },
  { to: '/perfil', label: 'Perfil', Icon: UserIcon },
];

export function BottomNav() {
  return (
    <nav
      // El relleno inferior de área segura evita que las etiquetas queden bajo el
      // indicador de inicio del iPhone; la altura fija es la que usa el resto del
      // layout para calcular su espacio.
      className="app-bar bottom-0 z-20 flex border-t border-white/5 bg-bg-surface"
      style={{ paddingBottom: 'var(--safe-bottom)' }}
      aria-label="Navegación principal"
    >
      {items.map(({ to, label, Icon }) => (
        <NavLink
          key={to}
          to={to}
          end={to === '/'}
          className={({ isActive }) =>
            // El peso de la etiqueta acompaña al color: la señal de activo no
            // depende solo del matiz.
            `flex flex-1 flex-col items-center justify-center gap-1 text-xs transition-colors focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent ${
              isActive ? 'font-semibold text-accent' : 'text-text-muted hover:text-text-secondary'
            }`
          }
          style={{ height: 'var(--nav-h)' }}
        >
          <Icon className="h-5 w-5" />
          {label}
        </NavLink>
      ))}
    </nav>
  );
}
