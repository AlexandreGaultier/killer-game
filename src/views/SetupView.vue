<template>
    <div class="setup-view">
      <h1>Gestion des joueurs</h1>
      <div class="card">
        <PlayerInput />
      </div>
      <PlayerList />
      <button @click="startGame" class="start-button">Commencer le jeu</button>
    </div>
</template>

<script lang="ts">
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import PlayerInput from '../components/PlayerInput.vue'
import PlayerList from '../components/PlayerList.vue'

export default {
  components: { PlayerInput, PlayerList },
  setup() {
    const router = useRouter()
    const gameStore = useGameStore()

    const startGame = () => {
      gameStore.assignMissions()
      router.push('/game')
    }

    return { startGame }
  }
}
</script>

<style scoped>
.setup-view {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.card {
  width: 100%;
  max-width: 400px;
  margin-bottom: 20px;
}

.start-button {
  margin-top: 20px;
  font-size: 1.2em;
  padding: 12px 24px;
}
</style>