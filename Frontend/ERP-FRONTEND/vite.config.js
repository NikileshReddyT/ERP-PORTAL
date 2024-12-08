// tailwind.config.js
import plugin from 'tailwindcss/plugin';

export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  plugins: [
    plugin(({ addUtilities }) => {
      addUtilities({
        // Your custom utilities
      });
    }),
  ],
};
