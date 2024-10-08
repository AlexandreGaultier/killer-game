<template>
  <div id="app">
    <nav>
      <router-link to="/">Joueurs</router-link>
      <router-link to="/game">Jeu</router-link>
      <router-link to="/admin">Admin</router-link>
      <router-link to="/podium">Podium</router-link>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { onMounted } from 'vue'
import { useGameStore } from './stores/gameStore'

export default {
  setup() {
    const gameStore = useGameStore()

    onMounted(() => {
      gameStore.loadFromLocalStorage()
    })
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap');

body {
  margin: 0;
  padding: 0;
  font-family: 'Lato', sans-serif;
  font-size: 18px;
  background: linear-gradient(135deg, #134E5E 0%, #71B280 100%);
  color: #ffffff;
  min-height: 100vh;
}

#app {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

nav {
  display: flex;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 8px;
  margin-bottom: 20px;
  overflow: hidden;
}

nav a {
  color: #ffffff;
  text-decoration: none;
  font-weight: bold;
  transition: background-color 0.3s ease, color 0.3s ease;
  flex: 1;
  text-align: center;
  padding: 15px 0;
}

nav a:hover,
nav a.router-link-active {
  background-color: rgba(113, 178, 128, 0.2);
  color: #71B280;
}

h1 {
  font-size: 2.5em;
}

h2 {
  font-size: 2em;
}

h3 {
  font-size: 1.5em;
}

button {
  background-color: #71B280;
  color: #ffffff;
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
  color: #ffffff;
  padding: 10px;
  border-radius: 4px;
  font-size: 1em;
}

input::placeholder {
  color: rgba(255, 255, 255, 0.5);
}
</style>
