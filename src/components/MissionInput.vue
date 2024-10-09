<template>
  <div class="input-container">
    <input 
      v-model="missionDescription" 
      @keyup.enter="addMission"
      placeholder="Description de la mission" 
    />
    <button @click="addMission">Ajouter une mission</button>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default defineComponent({
  name: 'MissionInput',
  setup() {
    const gameStore = useGameStore()
    const missionDescription = ref('')

    const addMission = (): void => {
      const trimmedDescription = missionDescription.value.trim()
      if (trimmedDescription) {
        gameStore.addMission(trimmedDescription)
        missionDescription.value = ''
      }
    }

    return { missionDescription, addMission }
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