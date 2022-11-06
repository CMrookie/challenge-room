import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from './router'

import './assets/style.css'
import '@varlet/ui/es/snackbar/style'
import '@varlet/ui/es/dialog/style'

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
app.use(router)
app.mount('#app')
