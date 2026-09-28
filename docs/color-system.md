# Sistema de Colores — LaCienRadios

> Paleta oscura inspirada en Instagram (fondo violáceo de tres pisos, gradiente
> cálido→magenta→púrpura, un solo acento rosa). La fuente de verdad es
> [`src/theme/colors.ts`](../src/theme/colors.ts); este documento la describe.
> Para el sistema de diseño completo (tipografía, forma, componentes, reglas),
> ver **[DESIGN.md](../DESIGN.md)**.

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

  // Paradas del gradiente de marca (fuente única del brand-gradient)
  gradient: {
    from: '#FEDA75',
    via1: '#FA7E1E',
    via2: '#D62976',
    to: '#962FBF',
  },
} as const;
```

## 2. Configuración Tailwind

Archivo: `tailwind.config.ts` (TypeScript, no `.js`)

```ts
import { colors } from './src/theme/colors';

// ...
theme: {
  extend: {
    colors: {
      bg: colors.bg,
      text: colors.text,
      accent: colors.accent,
      state: colors.state,
    },
    backgroundImage: {
      // Construido desde colors.gradient: los hexes viven en un solo lugar.
      'brand-gradient': `linear-gradient(135deg, ${colors.gradient.from} 0%, ${colors.gradient.via1} 35%, ${colors.gradient.via2} 70%, ${colors.gradient.to} 100%)`,
    },
  },
},
```

El gradiente ya no se escribe con literales sueltos: se arma a partir de
`colors.gradient`, así que hay un solo lugar donde cambiar sus paradas.

## 3. Mapeo por componente

Refleja el build real al 2026-09-28. Los géneros de radio existen en el tipo
`Radio` pero **no tienen color propio**: no hay tarjetas de categoría en la app.

| Componente | Uso de color |
|---|---|
| Header / Logo | Texto con `bg-brand-gradient` + `bg-clip-text text-transparent`; header sobre `bg-surface` |
| StoryCircle | Aro con `bg-brand-gradient` cuando `isLive`; si no, `bg-white/10` |
| FeaturedCard | Marco exterior `bg-brand-gradient`, panel interior sólido `bg-bg-base` |
| FilterPills | Activo: `bg-accent` + `text-bg-base`. Inactivo: `bg-surfaceAlt` + `text-secondary` |
| PlayButton | `bg-accent`, `hover:bg-accent-hover`, `active:bg-accent-active` |
| Botón primario (auth) | Igual que PlayButton, con `text-bg-base` |
| BottomNav | Fondo `bg-surfaceAlt`; ítem activo `text-accent`; inactivo `text-muted` |
| Dial / frecuencia | `text-primary` o `text-muted` con `tabular-nums`; **nunca** `text-accent` |
| Error de reproducción | `state.live`; confirmación de guardado: `state.success` |

## 4. Reglas de uso

- `accent` se reserva para elementos interactivos y estados activos, **nunca**
  para texto decorativo ni para el dial.
- Los tres tonos de `accent` cumplen una función: `DEFAULT` en reposo, `hover`
  al apuntar, `active` al pulsar. Un botón que use `hover` también para `active`
  no distingue pulsar de apuntar — corregido en todos los botones primarios.
- `brand-gradient` se limita a logo, aros de historias y el marco de la tarjeta
  destacada. Nunca detrás de texto largo: sobre sus paradas claras el texto
  secundario cae por debajo del contraste mínimo (ver la Regla del Panel Sólido
  en [DESIGN.md](../DESIGN.md)).
- `state.live` es rojo de falla, no de "en vivo". El estado en vivo se comunica
  con el aro de gradiente, no con rojo.
- No introducir hex fuera de `colors.ts`; cualquier color nuevo entra como token.
