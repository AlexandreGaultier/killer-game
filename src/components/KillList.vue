<template>
  <div class="kill-list card">
    <h2>Récapitulatif des éliminations</h2>
    <table>
      <thead>
        <tr>
          <th>Tueur</th>
          <th>Victime</th>
          <th>Mission</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kill in reversedFilteredKills" :key="getKillKey(kill)">
          <template v-if="kill.failureMessage">
            <td colspan="3" class="failure-message">{{ kill.failureMessage }}</td>
          </template>
          <template v-else>
            <td><PlayerChip :name="getPlayerName(kill.killerId)" /></td>
            <td><PlayerChip :name="getPlayerName(kill.victimId)" :isAlive="false" /></td>
            <td>{{ getMissionDescription(kill.missionId) }}</td>
          </template>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'
import PlayerChip from './PlayerChip.vue'
import type { Kill } from '../types'

export default {
  name: 'KillList',
  components: { PlayerChip },
  setup() {
    const gameStore = useGameStore()
    
    const filteredKills = computed(() => 
      gameStore.kills.filter(kill => gameStore.hardMode || kill.killerId !== kill.victimId)
    )

    const reversedFilteredKills = computed(() => [...filteredKills.value].reverse())

    const getPlayerName = (id: number): string => {
      const player = gameStore.players.find(p => p.id === id)
      return player?.name ?? 'Joueur inconnu'
    }

    const getMissionDescription = (id: number): string => {
      const mission = gameStore.missions.find(m => m.id === id)
      return mission?.description ?? 'Mission inconnue'
    }

    const getKillKey = (kill: Kill): string => 
      `${kill.killerId}-${kill.victimId}-${kill.missionId}`

    return { 
      reversedFilteredKills, 
      getPlayerName, 
      getMissionDescription,
      getKillKey
    }
  }
}
</script>

<style scoped>
.kill-list {
  margin-top: 20px;
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

.failure-message {
  font-style: italic;
  color: #ff6b6b;
}
</style>
