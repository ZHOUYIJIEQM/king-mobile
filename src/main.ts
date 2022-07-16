import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import request from './request/index'
import './styles/global.scss'
import toast from './components/Toast/index'

createApp(App)
.use(router)
.use(request)
.use(toast)
.mount('#app')
