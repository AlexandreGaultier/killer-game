<template>
  <div class="admin-view">
    <h1>Administration</h1>
    <div class="card">
      <h2>Réinitialiser le jeu</h2>
      <ResetButton />
    </div>
    <div class="card">
      <h2>Ajouter une mission</h2>
      <MissionInput />
    </div>
    <div class="card mission-list-card">
      <MissionList />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import MissionInput from '../components/MissionInput.vue'
import MissionList from '../components/MissionList.vue'
import ResetButton from '../components/ResetButton.vue'

export default defineComponent({
  name: 'AdminView',
  components: { MissionInput, MissionList, ResetButton }
})
</script>

<style scoped>
.admin-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}

.mission-list-card {
  overflow: hidden;
}

@media (max-width: 768px) {
  .admin-view {
    padding: 10px;
  }

  .card {
    padding: 15px;
  }
}
</style>
