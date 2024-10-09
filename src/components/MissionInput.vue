<template>
  <div class="mission-input">
    <input v-model="missionDescription" placeholder="Description de la mission" />
    <button @click="addMission">Ajouter une mission</button>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  setup() {
    const gameStore = useGameStore()
    const missionDescription = ref('')

    const addMission = () => {
      if (missionDescription.value.trim()) {
        gameStore.addMission(missionDescription.value.trim())
        missionDescription.value = ''
      }
    }

    return { missionDescription, addMission }
  }
}
</script>
<style scoped>
.mission-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.mission-input input {
  flex-grow: 1;
}
</style>