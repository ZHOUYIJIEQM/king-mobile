import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import request from './request/index'
import './styles/global.scss'

createApp(App)
.use(router)
.use(request)
.mount('#app')
