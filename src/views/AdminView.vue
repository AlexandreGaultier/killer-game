<template>
  <div>
    <h1>Administration</h1>
    
    <section>
      <h2>Ajouter une nouvelle mission</h2>
      <MissionInput />
    </section>

    <section>
      <h2>Liste des missions</h2>
      <ul>
        <li v-for="mission in missions" :key="mission.id">
          {{ mission.description }}
          <button @click="deleteMission(mission.id)">Supprimer</button>
        </li>
      </ul>
    </section>

    <section>
      <h2>Missions en attente de validation</h2>
      <ul>
        <li v-for="assignment in pendingAssignments" :key="assignment.id">
          {{ getPlayerName(assignment.playerId) }} doit {{ getMissionDescription(assignment.missionId) }} 
          {{ getPlayerName(assignment.targetId) }}
          <button @click="validateKill(assignment)">Valider</button>
          <button @click="rejectKill(assignment)">Rejeter</button>
        </li>
      </ul>
    </section>

    <KillList />

    <section class="reset-section">
      <h2>Réinitialisation du jeu</h2>
      <button @click="confirmReset" class="reset-button">Réinitialiser le jeu</button>
    </section>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useGameStore } from '../stores/gameStore'
import MissionInput from '../components/MissionInput.vue'
import KillList from '../components/KillList.vue'
import { Assignment } from '../types/index' // Ajoutez cette ligne en haut du fichier

export default {
  components: { MissionInput, KillList },
  setup() {
    const gameStore = useGameStore()
    const router = useRouter()

    const missions = computed(() => gameStore.missions)
    const pendingAssignments = computed(() => 
      gameStore.assignments.filter(a => !a.completed)
    )

    const getPlayerName = (id: number) => {
      const player = gameStore.players.find(p => p.id === id)
      return player ? player.name : 'Joueur inconnu'
    }

    const getMissionDescription = (id: number) => {
      const mission = gameStore.missions.find(m => m.id === id)
      return mission ? mission.description : 'Mission inconnue'
    }

    const validateKill = (assignment: Assignment) => {
      gameStore.completeKill(assignment.id)
    }

    const rejectKill = (assignment : Assignment) => {
      gameStore.rejectMission(assignment.id)
    }

    const deleteMission = (missionId: number) => {
      if (confirm('Êtes-vous sûr de vouloir supprimer cette mission ?')) {
        gameStore.deleteMission(missionId)
      }
    }

    const confirmReset = () => {
      if (confirm('Êtes-vous sûr de vouloir réinitialiser le jeu ? Toutes les données seront perdues.')) {
        gameStore.resetGame()
        router.push('/')
      }
    }

    return { 
      missions,
      pendingAssignments, 
      getPlayerName, 
      getMissionDescription, 
      validateKill, 
      rejectKill,
      deleteMission,
      confirmReset 
    }
  }
}
</script>

<style scoped>
section {
  margin-bottom: 2rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  margin-bottom: 0.5rem;
}

button {
  margin-left: 0.5rem;
  padding: 0.25rem 0.5rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.reset-section {
  margin-top: 2rem;
  padding: 1rem;
  border-top: 1px solid #ccc;
}

.reset-button {
  background-color: #ff4136;
  color: white;
  padding: 0.5rem 1rem;
  font-size: 1rem;
}

.reset-button:hover {
  background-color: #ff1a1a;
}
</style>
