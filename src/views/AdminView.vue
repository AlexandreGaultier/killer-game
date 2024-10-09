<template>
  <div class="admin-view">
    <h1>Administration</h1>
    <div class="card">
      <h2>Réinitialiser le jeu</h2>
      <button @click="resetGame" class="reset-button">Réinitialiser</button>
    </div>
    <div class="card">
      <h2>Ajouter une mission</h2>
      <div class="mission-input">
        <input v-model="newMission" placeholder="Description de la mission" />
        <button @click="addMission">Ajouter</button>
      </div>
    </div>
    <div class="card">
      <h2>Liste des missions</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="mission in missions" :key="mission.id">
            <td>{{ mission.id }}</td>
            <td>{{ mission.description }}</td>
            <td>
              <button @click="deleteMission(mission.id)" class="delete-button">Supprimer</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { useRouter } from 'vue-router'

export default {
  setup() {
    const gameStore = useGameStore()
    const newMission = ref('')
    const missions = computed(() => gameStore.missions)
    const router = useRouter()

    const addMission = () => {
      if (newMission.value.trim()) {
        gameStore.addMission(newMission.value.trim())
        newMission.value = ''
      }
    }

    const deleteMission = (id: number) => {
      gameStore.deleteMission(id)
    }

    const resetGame = () => {
      if (confirm('Êtes-vous sûr de vouloir réinitialiser le jeu ? Toutes les données seront perdues.')) {
        gameStore.resetGame()
        router.push('/')
      }
    }

    return { newMission, missions, addMission, deleteMission, resetGame }
  }
}
</script>

<style scoped>
.admin-view {
  padding: 20px;
}

.card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.mission-input {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.mission-input input {
  flex-grow: 1;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  background-color: rgba(0, 0, 0, 0.2);
}

.delete-button {
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
}

.delete-button:hover {
  background-color: #d0342b;
}

.reset-button {
  background-color: #ff4136;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
}

.reset-button:hover {
  background-color: #d0342b;
}
</style>
