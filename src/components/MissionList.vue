<template>
    <div class="mission-list">
      <h2>Liste des missions</h2>
      <div class="mission-grid">
        <div v-for="mission in missions" :key="mission.id" class="mission-item">
          <p v-if="!editingMission || editingMission.id !== mission.id">{{ mission.description }}</p>
          <input
            v-else
            v-model="editingMission.description"
            @keyup.enter="saveMission"
            @keyup.esc="cancelEdit"
          >
          <div class="button-group">
            <button v-if="!editingMission || editingMission.id !== mission.id" @click="editMission(mission)" class="edit-button">Modifier</button>
            <button v-else @click="saveMission" class="save-button">Enregistrer</button>
            <button v-if="editingMission && editingMission.id === mission.id" @click="cancelEdit" class="cancel-button">Annuler</button>
            <button @click="deleteMission(mission.id)" class="delete-button">Supprimer</button>
          </div>
        </div>
      </div>
    </div>
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useGameStore } from '../stores/gameStore'
import { Mission } from '../types'

export default defineComponent({
  name: 'MissionList',
  setup() {
    const gameStore = useGameStore()
    const missions = computed(() => gameStore.missions)
    const editingMission = ref<Mission | null>(null)

    const deleteMission = (id: number) => {
      gameStore.deleteMission(id)
    }

    const editMission = (mission: Mission) => {
      editingMission.value = { ...mission }
    }

    const saveMission = () => {
      if (editingMission.value) {
        gameStore.updateMission(editingMission.value.id, editingMission.value.description)
        editingMission.value = null
      }
    }

    const cancelEdit = () => {
      editingMission.value = null
    }

    return { missions, deleteMission, editMission, saveMission, cancelEdit, editingMission }
  }
})
</script>

<style scoped>
.mission-list {
  width: 100%;
}

.mission-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr); /* 3 colonnes pour les écrans de bureau */
  gap: 20px;
}

.mission-item {
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  padding: 15px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.mission-item p {
  margin: 0 0 10px 0;
  word-wrap: break-word;
}

.mission-item input {
  margin-bottom: 10px;
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.button-group {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.edit-button, .save-button, .cancel-button, .delete-button {
  flex: 1;
  padding: 5px 10px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.edit-button {
  background-color: var(--accent-blue);
  color: white;
}

.save-button {
  background-color: var(--accent-blue);
  color: white;
}

.delete-button {
  background-color: var(--accent-red);
  color: white;
}

.edit-button:hover, .save-button:hover { background-color: #5a9bd5; }
.delete-button:hover { background-color: #d16666; }

@media (max-width: 1200px) {
  .mission-grid {
    grid-template-columns: repeat(2, 1fr); /* 2 colonnes pour les écrans moyens */
  }
}

@media (max-width: 768px) {
  .mission-grid {
    grid-template-columns: 1fr; /* 1 colonne pour les écrans mobiles */
  }
}
</style>