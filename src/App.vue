<template>
  <div id="container">
    <nav class="navbar">
      <router-link v-for="item in navItems" :key="item.path" :to="item.path" class="nav-item" :class="{ disabled: item.isDisabled }">
        <span class="nav-text">{{ item.text }}</span>
        <span class="nav-icon">{{ item.icon }}</span>
      </router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, computed } from 'vue'
import { useGameStore } from './stores/gameStore'

export default defineComponent({
  name: 'App',
  setup() {
    const gameStore = useGameStore()

    onMounted(() => {
      gameStore.loadFromLocalStorage()
    })

    const navItems = computed(() => [
      { path: '/', text: 'Règles', icon: '📖', isDisabled: gameStore.isGameStarted },
      { path: '/setup', text: 'Joueurs', icon: '👥', isDisabled: gameStore.isGameStarted },
      { path: '/game', text: 'Jeu', icon: '🎮', isDisabled: !gameStore.isGameStarted },
      { path: '/admin', text: 'Admin', icon: '⚙️', isDisabled: false },
      { path: '/podium', text: 'Podium', icon: '🏆', isDisabled: false },
    ])

    return { gameStore, navItems }
  }
})
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

:root {
  --primary-color: #71B280;
  --secondary-color: #134E5E;
  --text-color: #ffffff;
  --background-color: rgba(0, 0, 0, 0.5);
  --accent-red: #E57373;
  --accent-blue: #64B5F6;
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
  font-size: 1.2em;
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%);
  color: var(--text-color);
  min-height: 100vh;
}

h1 { font-size: 2.5em; margin: 0.5em 0; }
h2 { font-size: 2em; margin: 0.5em 0; }
h3 { font-size: 1.5em; margin: 0.5em 0; }

#container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  min-height: calc(100vh - 3rem);
}

.navbar {
  position: sticky;
  top: 0;
  z-index: 1000;
  display: flex;
  background-color: var(--secondary-color); /* Changé pour une couleur opaque */
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

.nav-item {
  color: var(--text-color);
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex: 1;
  text-align: center;
  padding: 15px 0;
  background-color: var(--secondary-color); /* Ajout d'une couleur de fond opaque */
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: var(--primary-color); /* Changé pour une couleur opaque */
  color: var(--text-color);
}

.nav-item.disabled {
  opacity: 0.5;
  pointer-events: none;
  cursor: not-allowed;
}

.nav-icon {
  display: none;
  font-size: 24px;
}

button {
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  padding: 12px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

button:hover {
  background-color: #5a8f66;
}

input, select {
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.3);
  color: var(--text-color);
  padding: 10px;
  border-radius: 4px;
  font-size: 1em;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}

@media (max-width: 768px) {
  #container {
    flex-direction: column-reverse;
    justify-content: space-between;
  }

  body { font-size: 1.2em; }
  h1 { font-size: 2em; }
  h2 { font-size: 1.7em; }
  h3 { font-size: 1.3em; }

  .navbar {
    position: sticky;
    bottom: 0;
    top: auto;
    margin-top: 2rem;
    margin-bottom: 0;
    border-radius: 8px;
    background-color: var(--secondary-color); /* Assurez-vous que c'est opaque en mobile aussi */
  }

  .nav-item {
    padding: 10px 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 50px;
    background-color: var(--secondary-color); /* Assurez-vous que c'est opaque en mobile aussi */
  }

  .nav-text { display: none; }
  .nav-icon { display: inline-block; }

  router-view {
    flex-grow: 1;
  }
}
</style>