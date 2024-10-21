<template>
    <button @click="resetGame" class="reset-button">Réinitialiser le jeu</button>
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
background-color: var(--primary-color);
color: white;
border: none;
padding: 12px 24px;
border-radius: 4px;
cursor: pointer;
font-size: 1.2em;
transition: background-color 0.3s ease;
}

.reset-button:hover {
background-color: rgba(var(--primary-color-rgb), 0.6);
}

@media (max-width: 768px) {
  .reset-button {
    width: 100%;
    padding: 15px 24px;
  }
}
</style>