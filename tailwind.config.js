const designTokens = {
  colors: {
    brand: {
      50: '#edf2ff',
      100: '#dbe4ff',
      200: '#bac8ff',
      300: '#91a7ff',
      400: '#748ffc',
      500: '#5c7cfa',
      600: '#4c6ef5',
      700: '#4263eb',
      800: '#3b5bdb',
      900: '#364fc7'
    },
    accent: {
      100: '#ffe8cc',
      200: '#ffd8a8',
      400: '#ffa94d',
      500: '#ff922b',
      600: '#f76707'
    },
    surface: {
      base: '#ffffff',
      muted: '#f8fafc',
      raised: '#f1f5f9',
      border: '#e2e8f0'
    },
    neutral: {
      25: '#f8fafc',
      50: '#f1f5f9',
      100: '#e2e8f0',
      200: '#cbd5f5',
      300: '#94a3b8',
      400: '#64748b',
      500: '#475569',
      600: '#334155',
      700: '#1e293b',
      800: '#0f172a'
    },
    intent: {
      success: '#22c55e',
      warning: '#eab308',
      danger: '#ef4444',
      info: '#0ea5e9'
    }
  },
  spacing: {
    '3xs': '0.25rem',
    '2xs': '0.5rem',
    xs: '0.75rem',
    sm: '1rem',
    md: '1.5rem',
    lg: '2rem',
    xl: '3rem',
    '2xl': '4rem'
  },
  radii: {
    xs: '0.25rem',
    sm: '0.375rem',
    md: '0.625rem',
    lg: '0.875rem',
    xl: '1.25rem'
  },
  fontSize: {
    'label-sm': ['0.75rem', { lineHeight: '1rem', letterSpacing: '0.02em' }],
    'body-sm': ['0.875rem', { lineHeight: '1.4' }],
    'body-md': ['1rem', { lineHeight: '1.5' }],
    'title-sm': ['1.125rem', { lineHeight: '1.4' }],
    'title-md': ['1.25rem', { lineHeight: '1.35' }],
    'display-sm': ['1.5rem', { lineHeight: '1.25' }],
    'display-md': ['1.875rem', { lineHeight: '1.25' }],
    'display-lg': ['2.5rem', { lineHeight: '1.2' }]
  }
};

module.exports = {
  content: [
    './templates/**/*.{html,js}',
    './components/**/*.{html,js}',
    './partials/**/*.{html,js}',
    './src/**/*.{ts,js}'
  ],
  theme: {
    extend: {
      colors: {
        brand: designTokens.colors.brand,
        accent: designTokens.colors.accent,
        surface: designTokens.colors.surface,
        neutral: designTokens.colors.neutral,
        intent: designTokens.colors.intent
      },
      borderRadius: designTokens.radii,
      boxShadow: {
        card: '0 12px 30px -18px rgba(15, 23, 42, 0.55)',
        focus: '0 0 0 3px rgba(92, 124, 250, 0.45)'
      },
      spacing: designTokens.spacing,
      fontSize: designTokens.fontSize,
      fontFamily: {
        sans: [
          '"Inter var"',
          'Inter',
          'system-ui',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'sans-serif'
        ]
      }
    }
  },
  plugins: []
};
