<template>
  <div>
    <h1>Jeu en cours</h1>
    <PlayerList />
    <h2>Missions en cours</h2>
    <div class="mission-cards">
      <div v-for="assignment in pendingAssignments" :key="assignment.id" class="card mission-card">
        <h3>{{ getPlayerName(assignment.playerId) }}</h3>
        <details>
          <summary>Voir les détails</summary>
          <p><strong>Cible:</strong> {{ getPlayerName(assignment.targetId) }}</p>
          <p><strong>Mission:</strong> {{ getMissionDescription(assignment.missionId) }}</p>
        </details>
        <div class="button-group">
          <button @click="validateMission(assignment.id)" class="validate-button">Valider</button>
          <button @click="rejectMission(assignment.id)" class="reject-button">Refuser</button>
        </div>
      </div>
    </div>
    <KillList />
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import PlayerList from '../components/PlayerList.vue'
import KillList from '../components/KillList.vue'

export default {
  components: { PlayerList, KillList },
  setup() {
    const gameStore = useGameStore()

    const pendingAssignments = computed(() => {
      // Forcer la réactivité en accédant à une propriété réactive du store
      gameStore.players
      gameStore.assignments
      return gameStore.pendingAssignments
    })

    const getPlayerName = (id: number) => {
      const player = gameStore.players.find(p => p.id === id)
      return player ? player.name : 'Joueur inconnu'
    }

    const getMissionDescription = (id: number) => {
      const mission = gameStore.missions.find(m => m.id === id)
      return mission ? mission.description : 'Mission inconnue'
    }

    const validateMission = (assignmentId: number) => {
      gameStore.validateMission(assignmentId)
    }

    const rejectMission = (assignmentId: number) => {
      gameStore.rejectMission(assignmentId)
    }

    return { 
      pendingAssignments, 
      getPlayerName, 
      getMissionDescription,
      validateMission,
      rejectMission
    }
  }
}
</script>

<style scoped>
.mission-cards {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.mission-card {
  display: flex;
  flex-direction: column;
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.mission-card h3 {
  margin-top: 0;
  margin-bottom: 15px;
}

details {
  margin-bottom: 15px;
}

summary {
  cursor: pointer;
  font-weight: bold;
}

.button-group {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
}

.validate-button, .reject-button {
  padding: 10px 15px;
  font-size: 0.8em;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.validate-button {
  background-color: #71B280;
  color: #ffffff;
}

.validate-button:hover {
  background-color: #5a8f66;
}

.reject-button {
  background-color: #ff4136;
  color: #ffffff;
}

.reject-button:hover {
  background-color: #e63b31;
}
</style>
