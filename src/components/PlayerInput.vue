<template>
  <div class="input-container">
    <input 
      v-model="playerName" 
      @keyup.enter="addPlayer"
      placeholder="Nom du joueur" 
    />
    <button @click="addPlayer">Ajouter un joueur</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default defineComponent({
  name: 'PlayerInput',
  setup() {
    const gameStore = useGameStore()
    const playerName = ref('')

    const addPlayer = (): void => {
      const trimmedName = playerName.value.trim()
      if (trimmedName) {
        gameStore.addPlayer(trimmedName)
        playerName.value = ''
      }
    }

    return { playerName, addPlayer }
  }
})
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}

.input-container input {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.input-container button {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.input-container button:hover {
  background-color: #45a049;
}

@media (min-width: 768px) {
  .input-container {
    flex-direction: row;
  }

  .input-container input {
    flex-grow: 1;
  }
}
</style>