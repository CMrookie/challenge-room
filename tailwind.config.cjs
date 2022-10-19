/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-bg': '#faeedc',
        question: {
          default: '	#f4f4f4',
          select: '#aabbca',
          correct: '#bddc95',
          wran: '#d5b5b6'
        },
        btn: {
          default: '#db824d',
          light: '#ffffff'
        },
        'border-black': '#aabbca'
      }
    }
  },
  plugins: []
}
