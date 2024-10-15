<template>
  <div class="input-container">
    <input 
      v-model="missionDescription" 
      @keyup.enter="addMission"
      @input="validateInput"
      placeholder="Description de la mission" 
      maxlength="90"
      pattern="[A-Za-z0-9\s.,!?]+"
      title="Lettres, chiffres, espaces et ponctuation basique uniquement"
    />
    <button @click="addMission">Ajouter une mission</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
    const errorMessage = ref('')

    const validateInput = (): void => {
      const trimmedDescription = missionDescription.value.trim()
      if (!trimmedDescription) {
        errorMessage.value = 'La description de la mission ne peut pas être vide.'
      } else if (!/^[A-Za-z0-9\s.,!?]{1,90}$/.test(trimmedDescription)) {
        errorMessage.value = 'La description doit contenir uniquement des lettres, chiffres, espaces et ponctuation basique (90 caractères max).'
      } else {
        errorMessage.value = ''
      }
    }

    const addMission = (): void => {
      const trimmedDescription = missionDescription.value.trim()
      if (trimmedDescription && /^[A-Za-z0-9\s.,!?]{1,90}$/.test(trimmedDescription)) {
        gameStore.addMission(trimmedDescription)
        missionDescription.value = ''
        errorMessage.value = ''
      } else {
        validateInput()
      }
    }

    return { missionDescription, addMission, errorMessage, validateInput }
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
  background-color: rgba(var(--primary-color-rgb), 0.6);
}

@media (max-width: 768px) {
  .input-container button {
    font-size: 1em;
    padding: 10px 20px;
  }
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}
</style>