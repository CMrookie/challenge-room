module.exports = {
  plugins: {
    'postcss-import': {},
    'postcss-url': {
      from: 'src/**/*',
      to: 'dist/**/*'
    },
    'tailwindcss/nesting': {},
    tailwindcss: {},
    autoprefixer: {}
  }
}
