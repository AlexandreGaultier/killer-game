<template>
  <div class="admin-view">
    <h1>Administration</h1>
    <div class="card">
      <ResetButton />
    </div>
    <div class="card">
      <h2>Ajouter une mission</h2>
      <MissionInput />
    </div>
    <div class="card">
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
}

.card {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 8px;
  padding: 20px;
  margin-bottom: 20px;
}
</style>
