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

  // Colores por categoría (tarjetas de género)
  category: {
    rock: '#1E3A5F',
    pop: '#3B1E5F',
    folklore: '#7A5F1E',
    tango: '#5F1E3B',
    clasica: '#1E5F5F',
    deportiva: '#1E5F3B',
    general: '#3B3B3B',
  },

  // Paradas del gradiente de marca
  gradient: {
    from: '#FEDA75',
    via1: '#FA7E1E',
    via2: '#D62976',
    to: '#962FBF',
  },
} as const;
