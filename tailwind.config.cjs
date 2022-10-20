/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-bg': '#faeedc',
        question: {
          DEFAULT: '	#f4f4f4',
          select: '#aabbca',
          correct: '#bddc95',
          wran: '#d5b5b6'
        },
        btn: {
          DEFAULT: '#ff8c21',
          active: '#d9771c',
          light: '#ffffff'
        },
        'border-black': '#aabbca'
      },
      backgroundImage: {
        logo: "url('./src/assets/images/WechatIMG376.png')",
        scan: "url('./src/assets/images/2222.png')",
        'login-bg': "url('./src/assets/images/bg.png')",
        select: {
          off: "url('./src/assets/images/icon-01.png')",
          on: "url('./src/assets/images/icon-02.png')"
        },
        quit: "url('./src/assets/images/icon-03.png')",
        tick: "url('./src/assets/images/icon-04.png')",
        cross: "url('./src/assets/images/icon-05.png')",
        star: "url('./src/assets/images/part-08.png')",
        answer: {
          right: "url('./src/assets/images/part-09.png')",
          wrong: "url('./src/assets/images/part-10.png')"
        },
        test: {
          white: "url('./src/assets/images/zy_icon01a.png')",
          black: "url('./src/assets/images/zy_icon01b.png')"
        },
        paper: {
          white: "url('./src/assets/images/zy_icon02a.png')",
          black: "url('./src/assets/images/zy_icon02b.png')"
        }
      }
    }
  },
  plugins: []
}