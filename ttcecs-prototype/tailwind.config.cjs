module.exports = {
  content: [
    "./pages/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}"
  ],
  darkMode: ['class', '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Dark theme colors (legacy)
        'navy-900': '#071428',
        'navy-800': '#0c2034',
        'electric': '#00d9ff',
        'muted': '#9fb0c8',

        // THECOS Light theme brand colors
        brand: {
          teal: '#00303D',
          navy: '#0A1929', // New deep navy
          gold: '#D4AF37', // New premium gold
          pink: '#EA2E89',
          orange: '#F6A623',
          green: '#76C043',
          blue: '#27A9E1',
          purple: '#663399',
          gray: '#5F6E73',
          'gray-light': '#E5EAF0'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial']
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #00303D 0%, #27A9E1 100%)',
        'gradient-gold': 'linear-gradient(135deg, #D4AF37 0%, #F6A623 100%)',
        'gradient-accent': 'linear-gradient(90deg, #EA2E89 0%, #27A9E1 100%)',
        // Rainbow Gradients
        'rainbow-1': 'linear-gradient(135deg, #FF512F 0%, #DD2476 100%)',   // Red-Pink
        'rainbow-2': 'linear-gradient(135deg, #00F260 0%, #0575E6 100%)',   // Green-Blue
        'rainbow-3': 'linear-gradient(135deg, #8E2DE2 0%, #4A00E0 100%)',   // Purple
        'rainbow-4': 'linear-gradient(135deg, #FFD200 0%, #F7971E 100%)',   // Yellow-Orange
        'rainbow-text': 'linear-gradient(90deg, #FF512F, #DD2476, #00F260, #0575E6, #8E2DE2)', // Full spectrum
      }
    }
  },
  plugins: []
}
