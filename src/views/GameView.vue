<template>
  <div>
    <h1>Jeu en cours</h1>
    <PlayerList />
    <h2>Missions en cours</h2>
    <div class="mission-cards">
      <div v-for="assignment in pendingAssignments" :key="assignment.id" class="card mission-card">
        <h3>{{ truncateName(getPlayerName(assignment.playerId)) }}</h3>
        <details>
          <summary>Voir les détails</summary>
          <p><strong>Cible:</strong> {{ getPlayerName(assignment.targetId) }}</p>
          <p><strong>Mission:</strong> {{ getMissionDescription(assignment.missionId) }}</p>
        </details>
        <div class="button-group">
          <button @click="validateMission(assignment.id)" class="validate-button">Valider</button>
          <button @click="rejectMission(assignment.id)" class="reject-button">Refuser</button>
          <button @click="changeMission(assignment.id)" class="change-button">
            <i class="fas fa-random"></i>
          </button>
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

    const truncateName = (name: string) => {
      return name.length > 11 ? name.slice(0, 11) + '...' : name
    }

    const changeMission = (assignmentId: number) => {
      const currentAssignment = gameStore.assignments.find(a => a.id === assignmentId)
      if (!currentAssignment) return

      // Récupérer toutes les missions actuellement attribuées aux joueurs en vie
      const activeMissions = gameStore.assignments
        .filter(a => !a.completed && !a.rejected) // Seulement les missions actives
        .map(a => a.missionId)

      // Trouver une mission disponible qui n'est pas déjà attribuée
      const availableMissions = gameStore.missions
        .filter(m => !activeMissions.includes(m.id) || m.id === currentAssignment.missionId)
        .map(m => m.id)

      if (availableMissions.length > 1) {
        // Retirer la mission actuelle des possibilités
        const newMissions = availableMissions.filter(m => m !== currentAssignment.missionId)
        // Sélectionner une nouvelle mission au hasard
        const newMissionId = newMissions[Math.floor(Math.random() * newMissions.length)]
        
        // Mettre à jour l'assignment avec la nouvelle mission
        gameStore.updateAssignmentMission(assignmentId, newMissionId)
      }
    }

    return { 
      pendingAssignments, 
      getPlayerName, 
      getMissionDescription,
      validateMission,
      rejectMission,
      truncateName,
      changeMission,
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
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

details {
  margin-bottom: 15px;
}

summary {
  cursor: pointer;
  font-weight: bold;
}

.button-group {
  display: grid;
  grid-template-columns: 1fr 1fr 0.5fr;
  gap: 8px;
}

.validate-button {
  background-color: var(--accent-blue);
  color: #ffffff;
}

.validate-button:hover {
  background-color: rgba(var(--accent-blue-rgb), 0.6);
}

.reject-button {
  background-color: var(--accent-red);
  color: #ffffff;
}

.reject-button:hover {
  background-color: rgba(var(--accent-red-rgb), 0.6);
}

.change-button {
  background-color: var(--accent-yellow);
  color: #ffffff;
  padding: 8px 12px;
  border-radius: 4px;
  transition: background-color 0.3s ease;
}

.change-button:hover {
  background-color: rgba(var(--accent-yellow-rgb), 0.6);
}

/* Styles pour les appareils mobiles */
@media (max-width: 768px) {
  .mission-cards {
    grid-template-columns: 1fr; /* Une seule colonne sur mobile */
  }

  .mission-card {
    padding: 15px;
  }

  .button-group {
    grid-template-columns: 1fr;
  }

  .validate-button,
  .reject-button,
  .change-button {
    width: 100%;
    padding: 10px;
  }

  /* Styles pour le tableau récapitulatif des éliminations (KillList) */
  :deep(.kill-list) {
    overflow-x: auto;
    white-space: nowrap;
    padding-bottom: 10px;
  }

  :deep(.kill-list table) {
    width: 100%;
    min-width: 300px;
  }

  :deep(.kill-list th),
  :deep(.kill-list td) {
    padding: 8px;
    font-size: 0.9em;
  }
}
</style>
