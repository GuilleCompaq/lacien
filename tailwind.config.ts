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
        category: colors.category,
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #FEDA75 0%, #FA7E1E 35%, #D62976 70%, #962FBF 100%)',
      },
    },
  },
  plugins: [],
} satisfies Config;
