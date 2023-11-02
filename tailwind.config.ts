import daisyui from "daisyui";

export default {
  plugins: [daisyui],
  daisyui: { themes: [], logs: false },
  content: ["./**/*.tsx"],
  theme: { container: { center: true },
    extend: {
      colors: {
        'neon-yellow-text': '#f8ffbb',
        'neon-green-text': '#a7ffe2',
        'neon-red-text': '#ffa5a5',
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
