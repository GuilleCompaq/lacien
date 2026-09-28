import type { Config } from 'tailwindcss';
import { colors } from './src/theme/colors';

export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
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
        // Los porcentajes y el ángulo son geometría del gradiente, no color.
        'brand-gradient': `linear-gradient(135deg, ${colors.gradient.from} 0%, ${colors.gradient.via1} 35%, ${colors.gradient.via2} 70%, ${colors.gradient.to} 100%)`,
      },
    },
  },
  plugins: [],
} satisfies Config;
