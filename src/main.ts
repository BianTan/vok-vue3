import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import VueLightbox from '@/libs/VueLightbox'

import './assets/css/iconfont.css'
import './assets/css/index.css'
import './router/permission'

createApp(App).use(store).use(router).use(VueLightbox).mount('#app')
