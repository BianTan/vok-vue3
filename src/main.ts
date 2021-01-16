import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/css/iconfont.css'
import './assets/css/index.css'

createApp(App).use(store).use(router).mount('#app')
