import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SetupView from './views/SetupView.vue'
import GameView from './views/GameView.vue'
import AdminView from './views/AdminView.vue'

const app = createApp(App)
const pinia = createPinia()

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: SetupView },
    { path: '/game', component: GameView },
    { path: '/admin', component: AdminView },
  ]
})

app.use(pinia)
app.use(router)
app.mount('#app')
