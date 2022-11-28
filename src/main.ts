import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './router'
import '@/styles/reset.scss'
import "@/styles/global.scss"
import toast from "@/components/Toast/index"
import amfeFlexible from '@/utils/amfeFlexible'
amfeFlexible(window, document)

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(toast)

app.mount('#app')
