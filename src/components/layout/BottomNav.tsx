import { NavLink } from 'react-router';

const items = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/buscar', label: 'Buscar', icon: '🔍' },
  { to: '/mi-musica', label: 'Mi Música', icon: '❤️' },
  { to: '/perfil', label: 'Perfil', icon: '👤' },
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
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center justify-center gap-0.5 text-xs transition-colors focus-visible:outline focus-visible:-outline-offset-2 focus-visible:outline-2 focus-visible:outline-accent ${
              isActive ? 'font-semibold text-accent' : 'text-text-muted hover:text-text-secondary'
            }`
          }
          style={{ height: 'var(--nav-h)' }}
        >
          <span className="text-lg leading-none" aria-hidden="true">
            {item.icon}
          </span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
