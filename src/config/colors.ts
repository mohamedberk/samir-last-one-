export const colors = {
  // Base colors
  primary: {
    background: '#0A0A0A',
    text: '#FFFFFF',
    accent: '#06B6D4', // cyan-500
  },
  
  // UI Elements
  navbar: {
    background: 'rgba(10, 10, 10, 0.8)', // #0A0A0A with 80% opacity
    border: 'rgba(31, 41, 55, 0.5)', // gray-800 with 50% opacity
  },
  
  // Cards & Sections
  card: {
    background: 'rgba(17, 24, 39, 0.5)', // gray-900 with 50% opacity
    border: 'rgba(31, 41, 55, 0.5)',
    hover: {
      shadow: 'rgba(6, 182, 212, 0.1)', // cyan-500 with 10% opacity
    }
  },
  
  // Text colors
  text: {
    primary: '#FFFFFF',
    secondary: '#D1D5DB', // gray-300
    muted: '#9CA3AF', // gray-400
    accent: '#06B6D4', // cyan-400
  },
  
  // Button colors
  button: {
    primary: {
      background: '#06B6D4',
      text: '#111827',
      hover: '#22D3EE',
    },
    secondary: {
      background: '#141414',
      text: '#FFFFFF',
      hover: '#1A1A1A',
    },
  },
  
  // Gradients
  gradients: {
    hero: {
      overlay: 'linear-gradient(to bottom, rgba(10, 10, 10, 0.7), rgba(10, 10, 10, 0.5), #0A0A0A)',
      sides: 'linear-gradient(to right, #0A0A0A, transparent, #0A0A0A)',
    },
    card: {
      overlay: 'linear-gradient(to top, rgba(17, 24, 39, 1), rgba(17, 24, 39, 0.2), transparent)',
    },
  }
} 