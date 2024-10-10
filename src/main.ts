import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { createRouter, createWebHistory, RouteLocationNormalized } from 'vue-router'
import App from './App.vue'
import SetupView from './views/SetupView.vue'
import GameView from './views/GameView.vue'
import AdminView from './views/AdminView.vue'
import PodiumView from './views/PodiumView.vue'
import RulesView from './views/RulesView.vue'
import { useGameStore } from './stores/gameStore'

const app = createApp(App)
const pinia = createPinia()

app.use(pinia)

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: RulesView },
    { path: '/setup', component: SetupView },
    { path: '/game', component: GameView },
    { path: '/admin', component: AdminView },
    { path: '/podium', component: PodiumView },
  ]
})

// Garde de navigation global
router.beforeEach((to: RouteLocationNormalized, _from: RouteLocationNormalized, next) => {
  const gameStore = useGameStore()

  if (to.path === '/setup' && gameStore.isGameStarted) {
    next('/game')
  } else if (to.path === '/game' && !gameStore.isGameStarted) {
    next('/setup')
  } else {
    next()
  }
})

app.use(router)
app.mount('#app')
