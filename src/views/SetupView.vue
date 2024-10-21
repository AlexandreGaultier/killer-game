<template>
  <div class="setup-view">
    <h1>Killer Game</h1>
    <p>By Alexandre G.</p>
    <div class="card">
      <h2>Ajouter un joueur</h2>
      <PlayerInput />
    </div>
    <PlayerList />
    <div class="game-controls">
      <div class="start-controls">
        <button @click="startGame" class="start-button">Commencer le jeu</button>
        <div class="mode-selection">
          <input type="checkbox" id="hardMode" v-model="hardMode">
          <label for="hardMode" title="Mode difficile" :class="{ 'active': hardMode }">
            <i class="fas fa-skull"></i>
          </label>
        </div>
      </div>
    </div>
    <p>Mode difficile : {{ hardMode ? 'Activé' : 'Désactivé' }}</p>
    <!-- <div class="card content-card">
      <h2>Ajouter une mission</h2>
      <MissionInput />
    </div>
    <div class="card content-card">
      <h2>Liste des missions</h2>
      <div class="mission-list-container">
        <MissionList />
      </div>
    </div> -->
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import PlayerInput from '../components/PlayerInput.vue'
import PlayerList from '../components/PlayerList.vue'
import MissionInput from '../components/MissionInput.vue'
import MissionList from '../components/MissionList.vue'

export default defineComponent({
  name: 'SetupView',
  components: { PlayerInput, PlayerList, MissionInput, MissionList },
  setup() {
    const router = useRouter()
    const gameStore = useGameStore()
    const hardMode = ref(true)

    const startGame = () => {
      gameStore.setHardMode(hardMode.value)
      gameStore.startGame()
      router.push('/game')
    }

    return { startGame, hardMode }
  }
})
</script>

<style scoped>
.setup-view {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
}

.card {
  width: 100%;
  min-width: 600px;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
  box-sizing: border-box;
}

.content-card {
  margin-left: 10px;
  margin-right: 10px;
}

.game-controls {
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 3rem;
}

.start-controls {
  display: flex;
  width: 100%;
  margin-bottom: 10px;
}

.start-button {
  flex-grow: 1;
  font-size: 1.2em;
  padding: 12px 24px;
  background-color: var(--primary-color);
  color: var(--text-color);
  border: none;
  border-radius: 4px 0 0 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.start-button:hover {
  background-color: rgba(var(--primary-color-rgb), 0.6);
}

.mode-selection {
  display: flex;
  align-items: center;
  margin-left: 5px;
}

.mode-selection input[type="checkbox"] {
  display: none;
}

.mode-selection label {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: rgba(var(--primary-color-rgb), 0.4);
  color: var(--text-color);
  border-radius: 0 4px 4px 0;
  cursor: pointer;
  transition: background-color 0.3s ease, opacity 0.3s ease;
  font-size: 1.5em;
  opacity: 0.6;
}

.mode-selection input[type="checkbox"]:checked + label,
.mode-selection label.active {
  background-color: var(--primary-color);
  opacity: 1;
}

.mission-list-container {
  max-height: 300px;
  overflow-y: auto;
}

/* Styles personnalisés pour la barre de défilement de la liste des missions */
.mission-list-container::-webkit-scrollbar {
  width: 8px;
}

.mission-list-container::-webkit-scrollbar-track {
  background: rgba(255, 255, 255, 0.1);
  border-radius: 4px;
}

.mission-list-container::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 4px;
}

.mission-list-container::-webkit-scrollbar-thumb:hover {
  background: #5a8f66;
}

@media (min-width: 768px) {
  .game-controls {
    justify-content: center;
  }

  .start-controls {
    width: auto;
    margin-bottom: 0;
  }
}

@media (max-width: 768px) {
  .start-button,
  .mode-selection label {
    margin-top: 10px;
    font-size: 1em;
    padding: 10px 20px;
  }

  .mode-selection label {
    font-size: 1.4em;
  }
}
</style>
