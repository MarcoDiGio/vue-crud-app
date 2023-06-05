import './global.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ToastPlugin from 'vue-toast-notification'
import 'vue-toast-notification/dist/theme-sugar.css'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import {
  faArrowLeft,
  faTrash,
  faPlus,
  faEraser,
  faCheck,
  faPenToSquare
} from '@fortawesome/free-solid-svg-icons'

const app = createApp(App)

app.use(router)

app.use(ToastPlugin)

app.component('font-awesome-icon', FontAwesomeIcon)

library.add(faTrash)
library.add(faPlus)
library.add(faArrowLeft)
library.add(faEraser)
library.add(faCheck)
library.add(faPenToSquare)

app.mount('#app')
