import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: { container: { center: true },
    extend: {
      colors: {
        'neon-yellow': '#f8ffbb',
        'neon-green': '#a7ffe2',
        'neon-red': '#ffa5a5',
        'neon-orange': '#f8ceac',
        'neon-blue': '#91a5ff'
      },
      fontSize: {
        '4xl': '2.441rem',
        '5xl': '3.052rem',
      },
      rotate: {
        '330': '-30deg',
      }
    }
  }
};