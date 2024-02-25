/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html",
  "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    
    extend: {
      fontFamily:{
        'code':['Source Code Pro', 'monospace']
      }
    },
  },darkMode:'class',
  plugins: [  require('tailwindcss-animated')],
}