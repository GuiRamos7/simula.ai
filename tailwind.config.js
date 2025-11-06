/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}', 
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['Lexend', 'sans-serif'], 
        sans: ['Lexend', 'sans-serif'],
        // Exemplo: se quisesse substituir a sans padrão:
        // sans: ['Lexend, sans-serif', 'sans-serif'],
        // Exemplo: se quisesse substituir a sans padrão:
     
      },
    },
  },
  plugins: [],
}