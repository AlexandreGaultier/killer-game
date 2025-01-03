import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory } from 'vue-router'
import App from './App.vue'
import SetupView from './views/SetupView.vue'
import GameView from './views/GameView.vue'
import AdminView from './views/AdminView.vue'
import PodiumView from './views/PodiumView.vue'
import RulesView from './views/RulesView.vue'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/rules', component: RulesView },
    { path: '/', component: SetupView },
    { path: '/game', component: GameView },
    { path: '/admin', component: AdminView },
    { path: '/podium', component: PodiumView },
  ]
})

app.use(router)
app.mount('#app')
