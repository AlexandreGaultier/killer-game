<template>
    <div class="reset-container">
      <h2>Réinitialiser le jeu</h2>
      <button @click="resetGame" class="reset-button">Réinitialiser</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  import { useGameStore } from '../stores/gameStore'
  import { useRouter } from 'vue-router'
  
  export default defineComponent({
    name: 'ResetButton',
    setup() {
      const gameStore = useGameStore()
      const router = useRouter()
  
      const resetGame = (): void => {
        if (confirm('Êtes-vous sûr de vouloir réinitialiser le jeu ? Toutes les données seront perdues.')) {
          gameStore.resetGame()
          router.push('/')
        }
      }
  
      return { resetGame }
    }
  })
  </script>
  
  <style scoped>
  .reset-button {
    background-color: #ff4136;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
  }
  
  .reset-button:hover {
    background-color: #d0342b;
  }
  </style>