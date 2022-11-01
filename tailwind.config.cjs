/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'main-bg': '#faeedc',
        question: {
          DEFAULT: '	#f4f4f4',
          select: '#c8e6f9',
          correct: '#afdd92',
          wrong: '#f3c8c8'
        },
        btn: {
          DEFAULT: '#ff8c21',
          active: '#d9771c',
          light: '#ffffff'
        },
        'border-black': '#aabbca'
      },
      backgroundImage: {
        logo: "url('/images/logo.png')",
        scan: "url('/images/2222.png')",
        'login-bg': "url('/images/bg.png')",
        'select-off': "url('/images/icon-01.png')",
        'select-on': "url('/images/icon-02.png')",
        quit: "url('/images/icon-03.png')",
        tick: "url('/images/icon-04.png')",
        cross: "url('/images/icon-05.png')",
        over: "url('/images/WechatIMG419.png')",
        time: "url('/images/part-01.png')",
        progress: "url('/images/part-02.png')",
        title: "url('/images/part-03.png')",
        'card-title': "url('/images/part-04.png')",
        'score-wrap': "url('/images/part-05.png')",
        star: "url('/images/part-08.png')",
        'answer-right': "url('/images/part-09.png')",
        'answer-wrong': "url('/images/part-10.png')",
        'test-white': "url('/images/zy_icon01a.png')",
        'test-black': "url('/images/zy_icon01b.png')",
        'paper-white': "url('/images/zy_icon02a.png')",
        'paper-black': "url('/images/zy_icon02b.png')",
        back: "url('/images/back.png')"
      }
    }
  },
  plugins: []
}
