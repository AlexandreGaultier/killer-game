<template>
  <div id="container">
    <nav class="navbar">
      <router-link to="/" class="nav-item">Joueurs</router-link>
      <router-link to="/game" class="nav-item">Jeu</router-link>
      <router-link to="/admin" class="nav-item">Admin</router-link>
      <router-link to="/podium" class="nav-item">Podium</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useGameStore } from './stores/gameStore'

export default defineComponent({
  name: 'container',
  setup() {
    const gameStore = useGameStore()

    onMounted(() => {
      gameStore.loadFromLocalStorage()
    })
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
}

body {
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  background: linear-gradient(135deg, var(--secondary-color) 0%, var(--primary-color) 100%);
  color: var(--text-color);
  min-height: 100vh;
}

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
  background-color: var(--background-color);
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
}

.nav-item:hover,
.nav-item.router-link-active {
  background-color: rgba(113, 178, 128, 0.2);
  color: var(--primary-color);
}

h1 { font-size: 2.5em; }
h2 { font-size: 2em; }
h3 { font-size: 1.5em; }

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

  .navbar {
    position: sticky;
    bottom: 0;
    top: auto;
    margin-top: 2rem;
    margin-bottom: 0;
    border-radius: 8px 8px 8px 8px;
  }

  router-view {
    flex-grow: 1;
  }
}
</style>
