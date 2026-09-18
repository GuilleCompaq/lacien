# Sistema de Colores — LaCienRadios

> Paleta de colores inspirada en Instagram (modo oscuro, gradiente cálido→magenta→púrpura), definida como fuente de verdad para la implementación en React.

## 1. Tokens de color

Archivo: `src/theme/colors.ts`

```ts
export const colors = {
  // Fondos y superficies
  bg: {
    base: '#0A0A0F',       // fondo principal de la app
    surface: '#16121F',    // tarjetas, header, bottom nav
    surfaceAlt: '#1A1625', // tarjetas elevadas / modales
  },

  // Texto
  text: {
    primary: '#FFFFFF',
    secondary: '#B8B8C4',
    muted: '#8E8E9A',
  },

  // Acento principal (acciones, botones activos)
  accent: {
    DEFAULT: '#E4318C',
    hover: '#F0459C',
    active: '#C71F76',
  },

  // Estados semánticos
  state: {
    live: '#FF4D6D',
    success: '#3DDC97',
  },

  // Colores por categoría (tarjetas de género)
  category: {
    rock: '#1E3A5F',
    pop: '#3B1E5F',
    jazz: '#7A3B1E',
    lofi: '#1E5F3B',
  },

  // Paradas del gradiente de marca
  gradient: {
    from: '#FEDA75',
    via1: '#FA7E1E',
    via2: '#D62976',
    to: '#962FBF',
  },
} as const;
```

## 2. Configuración Tailwind

Archivo: `tailwind.config.js`

```js
const { colors } = require('./src/theme/colors.ts');

module.exports = {
  theme: {
    extend: {
      colors: {
        bg: colors.bg,
        text: colors.text,
        accent: colors.accent,
        state: colors.state,
        category: colors.category,
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #FEDA75 0%, #FA7E1E 35%, #D62976 70%, #962FBF 100%)',
      },
    },
  },
};
```

## 3. Mapeo por componente

| Componente | Uso de color |
|---|---|
| Header / Logo | Texto con `bg-brand-gradient` + `bg-clip-text text-transparent`; fondo del header en `bg-surface` |
| StoryCircle (aros "EN VIVO") | Borde con `bg-brand-gradient`; badge "LIVE" en `state.live` |
| FilterPills ("Todo", "Rock"...) | Activo: `bg-accent` + texto blanco. Inactivo: `bg-surfaceAlt` + `text-secondary` |
| CategoryCard | Gradiente `from-category-{genre} to-bg-base` |
| PlayButton | `bg-accent`, `hover:bg-accent-hover`, `active:bg-accent-active` |
| BottomNav | Fondo `bg-surface`; ítem activo `text-accent`; inactivo `text-muted` |
| Texto de frecuencia/precio | `text-accent` |

## 4. Ejemplo de componente React

```tsx
function CategoryCard({ genre, name, listeners, freq }: CategoryCardProps) {
  return (
    <div className={`rounded-2xl p-4 bg-gradient-to-br from-category-${genre} to-bg-base border border-white/5`}>
      <h3 className="text-text-primary font-bold">{name}</h3>
      <p className="text-text-muted text-sm">{listeners} oyentes</p>
      <span className="text-accent font-semibold">{freq}</span>
    </div>
  );
}
```

## 5. Reglas de uso

- `accent` se reserva exclusivamente para elementos interactivos y estados activos, nunca para texto decorativo.
- `brand-gradient` se limita a logo, aros de historias y como máximo un CTA destacado por vista.
- Los colores de `category` siempre degradan hacia `bg.base` en los bordes de la tarjeta, para mantener cohesión con el fondo general.
- No introducir nuevos valores hex fuera de `colors.ts`; cualquier color nuevo debe agregarse como token.
