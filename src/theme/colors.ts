export const colors = {
  // Fondos y superficies
  bg: {
    base: '#0A0A0F', // fondo principal de la app
    surface: '#16121F', // tarjetas, header, bottom nav
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

  // Paradas del gradiente de marca. Fuente única: tailwind.config.ts arma el
  // `brand-gradient` a partir de estos cuatro valores, no de literales sueltos.
  gradient: {
    from: '#FEDA75',
    via1: '#FA7E1E',
    via2: '#D62976',
    to: '#962FBF',
  },
} as const;
