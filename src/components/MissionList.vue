<template>
    <div class="mission-list">
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
  </template>
  
  <script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useGameStore } from '../stores/gameStore'
  
  export default defineComponent({
    name: 'MissionList',
    setup() {
      const gameStore = useGameStore()
  
      const missions = computed(() => gameStore.missions)
  
      const deleteMission = (id: number): void => {
        gameStore.deleteMission(id)
      }
  
      return { missions, deleteMission }
    }
  })
  </script>
  
  <style scoped>
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
  </style>