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
  padding: 12px 24px;
  font-size: 1.2em;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.input-container button:hover {
  background-color: #5a8f66;
}

@media (max-width: 768px) {
  .input-container button {
    font-size: 1em;
    padding: 10px 20px;
  }
}
</style>