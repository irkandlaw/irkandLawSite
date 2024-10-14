/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        'custom-black': '#000000', // добавляем пользовательский черный цвет
      },
      colors: {
        platinum: '#E5E4E2', // Платиновый цвет
      },
      fontFamily: {
        sans: ['SofiaSans-ExtraBoldItalic', 'ui-sans-serif', 'system-ui'],
      },
       corePlugins: {
    fontFamily: false, // Отключить базовую настройку шрифтов Tailwind
  },
    },
  },
  plugins: [],
}

