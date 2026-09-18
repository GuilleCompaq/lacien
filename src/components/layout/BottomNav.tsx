import { NavLink } from 'react-router';

const items = [
  { to: '/', label: 'Inicio', icon: '🏠' },
  { to: '/buscar', label: 'Buscar', icon: '🔍' },
  { to: '/mi-musica', label: 'Mi Música', icon: '❤️' },
  { to: '/perfil', label: 'Perfil', icon: '👤' },
];

export function BottomNav() {
  return (
    <nav className="fixed inset-x-0 bottom-0 z-20 flex bg-bg-surface">
      {items.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/'}
          className={({ isActive }) =>
            `flex flex-1 flex-col items-center gap-0.5 py-2 text-xs ${
              isActive ? 'text-accent' : 'text-text-muted'
            }`
          }
        >
          <span className="text-lg leading-none">{item.icon}</span>
          {item.label}
        </NavLink>
      ))}
    </nav>
  );
}
