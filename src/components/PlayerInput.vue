<template>
  <div class="input-container">
    <input 
      v-model="playerName" 
      @keyup.enter="addPlayer"
      @input="validateInput"
      placeholder="Nom du joueur" 
      maxlength="15"
      pattern="[A-Za-z0-9\s]+"
      title="Lettres, chiffres et espaces uniquement"
    />
    <button @click="addPlayer">Ajouter un joueur</button>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
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
    const errorMessage = ref('')

    const validateInput = (): void => {
      const trimmedName = playerName.value.trim()
      if (!trimmedName) {
        errorMessage.value = 'Le nom du joueur ne peut pas être vide.'
      } else if (!/^[A-Za-z0-9\s]{1,15}$/.test(trimmedName)) {
        errorMessage.value = 'Le nom doit contenir uniquement des lettres, chiffres et espaces (15 caractères max).'
      } else {
        errorMessage.value = ''
      }
    }

    const addPlayer = (): void => {
      const trimmedName = playerName.value.trim()
      if (trimmedName && /^[A-Za-z0-9\s]{1,15}$/.test(trimmedName)) {
        gameStore.addPlayer(trimmedName)
        playerName.value = ''
        errorMessage.value = ''
      } else {
        validateInput()
      }
    }

    return { playerName, addPlayer, errorMessage, validateInput }
  }
})
</script>

<style scoped>
.input-container {
  display: flex;
  flex-direction: column;
  gap: 1rem;
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
  color: #ff4d4d;
  font-size: 0.9em;
  margin-top: 5px;
}
</style>
