import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './containers/App.vue'
import './style.css'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)
app.mount('#app')
