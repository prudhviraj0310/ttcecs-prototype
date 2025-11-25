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
        'gradient-rainbow': 'linear-gradient(90deg, #EA2E89 0%, #F6A623 25%, #76C043 50%, #27A9E1 75%, #663399 100%)',
        'gradient-primary': 'linear-gradient(90deg, #27A9E1 0%, #76C043 100%)',
        'gradient-accent': 'linear-gradient(90deg, #EA2E89 0%, #27A9E1 100%)'
      }
    }
  },
  plugins: []
}
