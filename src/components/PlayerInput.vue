<template>
    <div class="player-input">
      <input 
        v-model="playerName" 
        @keyup.enter="addPlayer"
        placeholder="Nom du joueur" 
      />
      <button @click="addPlayer">Ajouter un joueur</button>
    </div>
  </template>
  
  <script lang="ts">
  import { ref } from 'vue'
  import { useGameStore } from '../stores/gameStore'
  
  export default {
    setup() {
      const gameStore = useGameStore()
      const playerName = ref('')
  
      const addPlayer = () => {
        if (playerName.value.trim()) {
          gameStore.addPlayer(playerName.value.trim())
          playerName.value = ''
        }
      }
  
      return { playerName, addPlayer }
    }
  }
  </script>
  <style scoped>
  .player-input {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }
  
  .player-input input {
    flex-grow: 1;
  }
  </style>