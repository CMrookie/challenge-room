import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import autoImport from 'unplugin-auto-import/vite'
import components from 'unplugin-vue-components/vite'
import { VarletUIResolver } from 'unplugin-vue-components/resolvers'
import vueJsx from '@vitejs/plugin-vue-jsx'
import basicSsl from '@vitejs/plugin-basic-ssl'

import { fileURLToPath, URL } from 'url'

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    basicSsl(),
    vue(),
    vueJsx(),
    autoImport({
      imports: ['vue', 'vue-router'],
      dts: './auto-imports.d.ts',
      resolvers: [VarletUIResolver({ autoImport: true })],
      eslintrc: {
        enabled: true, // Default false
        filepath: './.eslintrc-auto-import.json', // Default './.eslintrc-auto-import.json'
        globalsPropValue: true // Default `true`, (true | false | readonly | readable | writable | writable)
      }
    }),
    components({
      resolvers: VarletUIResolver()
    })
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  server: {
    host: '0.0.0.0',
    proxy: {
      '/api': {
        // target: 'https://jybm.941225.xyz/api',
        // target: 'https://dev.history.hkpec.hk',
        target: 'https://dev2.history.hkpec.hk',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    },
    https: true,
    open: true
  }
})
