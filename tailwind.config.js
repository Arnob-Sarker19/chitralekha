/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        ribeye: ['Ribeye Marrow', 'cursive'],
        zilla: ['Zilla Slab', 'serif'],
        mina: ['Mina', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
